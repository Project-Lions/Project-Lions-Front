import axios from 'axios';

export const login = async (email, password) => {
    const response = await axios.post('https://your-api-url.com/login', { email, password });
    return response.data;
};
