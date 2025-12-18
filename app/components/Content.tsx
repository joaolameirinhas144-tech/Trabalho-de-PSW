"use client";

import { useState, useEffect } from "react";
import HeroInfo from "./HeroInfo";
import { useHeroesContext } from '../context/HeroesContext';
import "./Content.css";
import Loader from "./Loader";

export default function Content() {

    // APENAS heroes e favorites são necessários
    const { heroes, favorites } = useHeroesContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main>
            <div className="content">

                {/* ---- LOADER ---- */}
                {loading && <Loader />}

                <h2>Heróis Favoritos</h2>

                {/* O BOTÃO FOI REMOVIDO PARA CUMPRIR O REQUISITO 11 */}

                <div className="heroes-container">
                    {heroes.map((hero) => {
                        if (favorites.has(hero.id)) {
                            return (
                                <HeroInfo
                                    key={hero.id}
                                    nome={hero.name}
                                    image={hero.image}
                                    superpower={hero.superpower}
                                />
                            );
                        }
                        return null;
                    })}
                </div>

                {favorites.size === 0 && !loading && (
                    <p>Não há heróis favoritos definidos.</p>
                )}
            </div>
        </main>
    );
}