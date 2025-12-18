"use client";

import React from 'react';
import { useHeroesContext } from '../context/HeroesContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PUBLIC_ID } from '../services/api';

export default function DashboardComponent() {

    const {
        heroes,
        favorites,
        deleteHero,
        toggleFavorite,
        isLoading,
        users,
        selectedUserId,
        isViewingOwnHeroes,
        selectUser
    } = useHeroesContext();

    const router = useRouter();


    if (isLoading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>A Carregar Super-Heróis do Servidor...</h2>
                <div className="loader" style={{
                    border: '4px solid #f3f3f3',
                    borderRadius: '50%',
                    borderTop: '4px solid #007bff',
                    width: '30px',
                    height: '30px',
                    animation: 'spin 2s linear infinite',
                    margin: '20px auto'
                }}></div>
            </div>
        );
    }

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectUser(event.target.value);
    };


    const tableRows = heroes.map((hero) => {
        const isFavorite = favorites.has(hero.id);
        const superpowerDisplay = hero.superpower || "N/D";
        const favoriteButtonText = isFavorite ? "★ Remover" : "☆ Adicionar";


        const isActionDisabled = !isViewingOwnHeroes;

        return (
            <tr key={hero.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{hero.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <img src={hero.image} alt={hero.name} style={{ width: '50px', height: 'auto', objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{hero.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{superpowerDisplay}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{isFavorite ? '⭐️ Sim' : 'Não'}</td>
                <td className="actions-column" style={{ display: 'flex', gap: '8px', padding: '10px', border: '1px solid #ddd' }}>


                    <Link
                        href={`/dashboard/${hero.id}`}
                        style={{ textDecoration: 'none' }}
                        onClick={(e) => {
                            if (isActionDisabled) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <button
                            disabled={isActionDisabled}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: isActionDisabled ? '#ccc' : 'purple',
                                color: 'white',
                                border: 'none',
                                cursor: isActionDisabled ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Editar
                        </button>
                    </Link>


                    <button
                        onClick={() => deleteHero(hero.id)}
                        disabled={isActionDisabled}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: isActionDisabled ? '#ccc' : 'red',
                            color: 'white',
                            border: 'none',
                            cursor: isActionDisabled ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Eliminar
                    </button>


                    <button
                        onClick={() => toggleFavorite(hero.id)}
                        disabled={isActionDisabled}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: isActionDisabled ? '#ccc' : 'darkorange',
                            color: 'white',
                            border: 'none',
                            cursor: isActionDisabled ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {favoriteButtonText}
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <div style={{ padding: '20px' }}>


            <Link href="/" style={{
                display: 'inline-block',
                marginBottom: '20px',
                padding: '10px 15px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px'
            }}>
                ⬅ Voltar para a Página Inicial
            </Link>


            <div style={{
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9'
            }}>
                <label htmlFor="user-select" style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Utilizador Selecionado:
                </label>
                <select
                    id="user-select"
                    onChange={handleUserChange}
                    value={selectedUserId}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >

                    {users.map((user) => (
                        <option key={user.publicId} value={user.publicId}>
                            {user.publicId === PUBLIC_ID ? `Eu (${user.userName})` : user.userName}
                        </option>
                    ))}
                </select>
                <span style={{
                    marginLeft: '20px',
                    color: isViewingOwnHeroes ? 'green' : 'red',
                    fontWeight: 'bold'
                }}>
                    {isViewingOwnHeroes ? 'A ver a sua lista' : 'A ver a lista de um colega'}
                </span>
            </div>


            <div style={{ marginBottom: '20px' }}>
                <Link href="/dashboard/add" style={{ textDecoration: 'none' }}>
                    <button
                        disabled={!isViewingOwnHeroes}
                        style={{
                            display: 'inline-block',
                            padding: '10px 15px',
                            backgroundColor: !isViewingOwnHeroes ? '#ccc' : 'green',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: !isViewingOwnHeroes ? 'not-allowed' : 'pointer'
                        }}
                    >
                        + Adicionar Super-Herói
                    </button>
                </Link>
            </div>


            <h2>Dashboard de Gestão de Super-Heróis ({heroes.length} Heróis)</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Imagem</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nome</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Superpoder</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Favorito</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Ações</th>
                </tr>
                </thead>
                <tbody>
                {heroes.length > 0 ? tableRows : (
                    <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff' }}>
                            Nenhum super-herói encontrado para este utilizador.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}