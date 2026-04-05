import api from './client';

// Получить долги покупателя по телефону (без токена)
export const getCustomerDebts = (phone) => api.get(`/my-debts/${phone}`);