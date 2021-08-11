import { AuthApiData } from '../../interface/AuthApiData';
import axios from 'axios';

const register = async (username: string, email: string, password: string, file: string): Promise<AuthApiData> => {
  console.log('line 5---', file);
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('image', file);

  return await axios
    .post('/auth/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default register;
