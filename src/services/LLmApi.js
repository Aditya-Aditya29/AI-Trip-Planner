import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:5000';

export async function askAllLLMs(prompt){
    try {
        const response = await axios.post(`${BASE_URL}/api/trips/search`, {prompt});
        console.log('Backend response data:', response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
       }
}