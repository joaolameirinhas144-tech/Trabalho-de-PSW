"use client";

import React, { useState, useEffect } from 'react';
import { Hero, useHeroesContext } from '../context/HeroesContext';
import { useRouter } from 'next/navigation';


type FormData = Partial<Hero>;

type HeroFormProps = {
    initialHero?: Hero;
};


const emptyHero: FormData = {
    name: '',
    image: '',
    superpower: '',
};

export default function HeroForm({ initialHero }: HeroFormProps) {
    const { editHero, addHero } = useHeroesContext();
    const router = useRouter();


    const isEditMode = !!initialHero?.id;


    const [heroData, setHeroData] = useState<FormData>(initialHero || emptyHero);


    const title = isEditMode ? `Editar Herói: ${initialHero?.name}` : 'Adicionar Novo Herói';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setHeroData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        if (isEditMode) {

            editHero(heroData as Hero);
        } else {

            const { id, ...newHeroData } = heroData;
            addHero(newHeroData as Omit<Hero, 'id'>);
        }


        router.push('/dashboard');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>{title}</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                {}
                {isEditMode && (
                    <div>
                        <label htmlFor="id">ID:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={heroData.id || ''}
                            readOnly
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', backgroundColor: '#eee' }}
                        />
                    </div>
                )}

                {}
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={heroData.name || ''}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label htmlFor="superpower">Superpoder:</label>
                    <input
                        type="text"
                        id="superpower"
                        name="superpower"
                        value={heroData.superpower || ''}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label htmlFor="image">URL da Imagem:</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={heroData.image || ''}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
                    />
                </div>

                {}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                        {isEditMode ? 'Guardar Alterações' : 'Adicionar Herói'}
                    </button>
                    <button type="button" onClick={() => router.push('/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                        Voltar / Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}