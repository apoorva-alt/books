import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001', headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
}});

export const getNotes = () => API.get('/notes');
export const getNote = (id) => API.get(`/notes/${id}`);
export const createNote = (formData) => API.post('/notes', formData);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const updateNote = (id, formData) => API.post(`/notes/${id}`, formData);