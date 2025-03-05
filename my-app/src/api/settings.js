import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const getRosterByDate = async (year, month) => {
    try {
        const response = await axios.get(`${API_URL}/api/settings/getRoster?year=${year}&month=${month}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching roster by date:", error);
        throw error;
    }
};

export const updateRoster = async (year, month, sheetLink) => {
    try {
        const response = await axios.post(`${API_URL}/api/settings/updateRoster`, {
            year,
            month,
            sheetLink,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating roster:', error);
        return false;
    }
};
