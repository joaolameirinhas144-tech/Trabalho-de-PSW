export const BASE_URL = 'https://dwdm-psw-heroes-api.onrender.com/api';
export const PUBLIC_ID = 'JmV2TJ77';      // leitura GET
export const PRIVATE_ID = 'SX4SXhJ08Sijkifa'; // gravação POST

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};


export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users/`, {
            method: 'GET',
            headers: HEADERS,
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar utilizadores');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro em getUsers:', error);
        return [];
    }
};


export const getHeroes = async (targetPublicId = PUBLIC_ID) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${targetPublicId}`, {
            method: 'GET',
            headers: HEADERS,
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar heróis');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro em getHeroes:', error);
        return [];
    }
};

export const postHeroes = async (heroesArray) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${PRIVATE_ID}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(heroesArray),
        });

        if (!response.ok) {
            console.error('Falha ao gravar heróis:', response.status, await response.text());
            throw new Error('Falha na gravação da lista de heróis.');
        }

        return true;
    } catch (error) {
        console.error('Erro em postHeroes:', error);
        return false;
    }
};


export const getTopHeroes = async (targetPublicId = PUBLIC_ID) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${targetPublicId}/top`, {
            method: 'GET',
            headers: HEADERS,
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar Top-3 heróis');
        }

        return await response.json(); // array de IDs
    } catch (error) {
        console.error('Erro em getTopHeroes:', error);
        return [];
    }
};

export const postTopHeroes = async (topHeroesArray) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${PRIVATE_ID}/top`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(topHeroesArray), // ARRAY ✔
        });

        if (!response.ok) {
            console.error('Falha ao gravar Top-3 heróis:', response.status, await response.text());
            throw new Error('Falha na gravação do Top-3.');
        }

        return true;
    } catch (error) {
        console.error('Erro em postTopHeroes:', error);
        return false;
    }
};
