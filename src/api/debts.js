import api from './client';

// Получить список долгов продавца
export const getSellerDebts = () => api.get('/debts');

// Добавить новый долг
export const addDebt = (debtData) => api.post('/debts', debtData);

// Погасить долг (отметить оплаченным)
export const payDebt = (debtId) => api.put(`/debts/${debtId}/pay`);