import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
