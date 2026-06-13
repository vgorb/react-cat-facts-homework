import axios from 'axios';

const API_URL = 'https://catfact.ninja/facts';

export async function getCatFacts() {
    const response = await axios.get(API_URL);

    return response.data;
}