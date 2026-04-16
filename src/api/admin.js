import api from './client';

// ========== USERS ==========
export const getUsers = () => api.get('/admin/users');
export const createUser = (data) => api.post('/admin/users', data);
export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);
export const blockUser = (userId, is_blocked) => api.put(`/admin/users/${userId}/block`, { is_blocked });

// ========== DEBTS ==========
export const getAllDebts = () => api.get('/admin/debts');
export const deleteDebt = (debtId) => api.delete(`/admin/debts/${debtId}`);

// ========== CUSTOMERS ==========
export const getCustomers = () => api.get('/admin/customers');
export const deleteCustomer = (customerId) => api.delete(`/admin/customers/${customerId}`);

// ========== STATS ==========
export const getStats = () => api.get('/admin/stats');