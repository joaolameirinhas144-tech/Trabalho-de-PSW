"use client";

import { useHeroesContext } from '../../context/HeroesContext';
import HeroForm from '../../components/HeroForm';
import {notFound, useParams} from 'next/navigation';

export default function EditHeroPage() {
    const { heroes } = useHeroesContext();
    const { id } = useParams(); // id ou "add"

    const heroToEdit = heroes.find(hero => hero.id === Number(id));

    return (
        <div style={{ padding: '40px' }}>
            <HeroForm initialHero={heroToEdit} />
        </div>
    );
}