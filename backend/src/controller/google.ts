import axios from 'axios';

export const getGoogleProfile = async (access_token) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`, {
      headers: {
        authorization: `Bearer ${access_token}`,
        accept: 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return error;
  }
};