import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

export const createSuper = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/createSuper`, {
      username,
      password,
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

// Function to check if any users exist
export const checkUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/checkUsers`);
    return response.data.exists; // Should return true if users exist, false otherwise
  } catch (error) {
    console.error('Error checking users:', error);
    return false; // Default to false if there's an error
  }
};

// Login function to call the backend
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
    });

    if (response.data.user.sessiontoken) {
      localStorage.setItem('token', response.data.user.sessiontoken)
      localStorage.setItem('userid', response.data.user.userid)
      localStorage.setItem('user', response.data.user.username)
      localStorage.setItem('userrole', response.data.user.role)
      //console.log(response.data.user.sessiontoken)
      return {
        success: true,
        message: 'Login successful',
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Login failed',
      };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Server error',
    };
  }
};

export const ValidateToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/validate-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Token validation error:", error);
    throw error;
  }
};