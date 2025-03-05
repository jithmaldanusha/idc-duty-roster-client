import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const updateUserProfile = async (username, firstname, lastname, email) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/updateProfile`, {
        username,
        firstname,
        lastname,
        email,
      });
  
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      console.error('Error creating super user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Server error',
      };
    }
  };