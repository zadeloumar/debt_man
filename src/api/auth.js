import api from './client';

export const loginSeller = (phone, password) => {
  return api.post('/login', { phone, password });
};