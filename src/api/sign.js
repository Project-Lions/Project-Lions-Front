import axios from 'axios';

export const sign = async (userData) => {
    const response = await axios.post('/api/members', userData);
    return response.data;
};
