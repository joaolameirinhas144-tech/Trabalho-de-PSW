"use client";

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useCallback,
    useEffect,
    useMemo
} from 'react';

import {
    getHeroes,
    postHeroes,
    getUsers,
    PUBLIC_ID,
    postTopHeroes,
    getTopHeroes
} from '../services/api';

export type User = {
    publicId: string;
    userName: string;
};

export type Hero = {
    id: number;
    name: string;
    image: string;
    superpower: string;
    isFavorite?: boolean;
};

type FavoriteIds = Set<number>;

type HeroesContextType = {
    heroes: Hero[];
    favorites: FavoriteIds;
    isLoading: boolean;
    users: User[];
    selectedUserId: string;
    isViewingOwnHeroes: boolean;
    selectUser: (publicId: string) => void;
    deleteHero: (id: number) => void;
    toggleFavorite: (id: number) => void;
    editHero: (updatedHero: Hero) => void;
    addHero: (newHeroData: Omit<Hero, 'id'>) => void;
};


const HeroesContext = createContext<HeroesContextType | undefined>(undefined);


const getNextId = (heroes: Hero[]): number =>
    heroes.length > 0 ? Math.max(...heroes.map(h => h.id)) + 1 : 1;

const saveHeroesToServer = (heroes: Hero[]) => {
    const cleanHeroes = heroes.map(h => ({
        id: h.id,
        name: h.name,
        image: h.image,
        superpower: h.superpower,
        isFavorite: !!h.isFavorite,
    }));

    postHeroes(cleanHeroes);
};

export const HeroesProvider = ({ children }: { children: ReactNode }) => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [favorites, setFavorites] = useState<FavoriteIds>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState(PUBLIC_ID);

    const isViewingOwnHeroes = selectedUserId === PUBLIC_ID;

    const selectUser = useCallback((publicId: string) => {
        setSelectedUserId(publicId);
    }, []);



    const fetchAllData = useCallback(async (targetId: string) => {
        setIsLoading(true);
        try {
            if (users.length === 0) {
                setUsers(await getUsers());
            }

            const fetchedHeroes = await getHeroes(targetId);
            const fetchedTopHeroes = await getTopHeroes(targetId);

            setHeroes(fetchedHeroes);
            setFavorites(new Set(fetchedTopHeroes));

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            setHeroes([]);
            setFavorites(new Set());
        } finally {
            setIsLoading(false);
        }
    }, [users.length]);

    useEffect(() => {
        fetchAllData(selectedUserId);
    }, [selectedUserId, fetchAllData]);



    const addHero = useCallback((newHero: Omit<Hero, 'id'>) => {
        if (!isViewingOwnHeroes) return;

        setHeroes(prev => {
            const hero = { ...newHero, id: getNextId(prev), isFavorite: false };
            const updated = [...prev, hero];
            saveHeroesToServer(updated);
            return updated;
        });
    }, [isViewingOwnHeroes]);

    const deleteHero = useCallback((id: number) => {
        if (!isViewingOwnHeroes) return;

        setHeroes(prev => {
            const updated = prev.filter(h => h.id !== id);
            saveHeroesToServer(updated);
            return updated;
        });

        setFavorites(prev => {
            const updated = new Set(prev);
            updated.delete(id);
            postTopHeroes(Array.from(updated));
            return updated;
        });
    }, [isViewingOwnHeroes]);

    const editHero = useCallback((hero: Hero) => {
        if (!isViewingOwnHeroes) return;

        setHeroes(prev => {
            const updated = prev.map(h => h.id === hero.id ? hero : h);
            saveHeroesToServer(updated);
            return updated;
        });
    }, [isViewingOwnHeroes]);

    const toggleFavorite = useCallback((id: number) => {
        setFavorites(prev => {
            const updated = new Set(prev);
            updated.has(id) ? updated.delete(id) : updated.add(id);
            postTopHeroes(Array.from(updated));
            return updated;
        });
    }, []);

    const value = useMemo(() => ({
        heroes,
        favorites,
        isLoading,
        users,
        selectedUserId,
        isViewingOwnHeroes,
        selectUser,
        deleteHero,
        toggleFavorite,
        editHero,
        addHero,
    }), [heroes, favorites, isLoading, users, selectedUserId, isViewingOwnHeroes]);

    return (
        <HeroesContext.Provider value={value}>
            {children}
        </HeroesContext.Provider>
    );
};


export const useHeroesContext = () => {
    const context = useContext(HeroesContext);
    if (!context) {
        throw new Error('useHeroesContext must be used within HeroesProvider');
    }
    return context;
};
