import { api } from './api';

export interface User {
  _id: string; 
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface PaginatedUsers {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: User[];
}

export const getUsers = async (page = 1, limit = 5, search = "") => {
  const response = await api.get<PaginatedUsers>('/users', {
    params: {
      page,
      limit,
      search: search || undefined 
    }
  });
  
  return response.data;
};

export const createUser = async (userData: Omit<User, '_id' | 'createdAt'>) => {
  const response = await api.post<User>('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const response = await api.put<User>(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
