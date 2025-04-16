import axios, { AxiosError } from 'axios';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

const API_URL = 'http://localhost:3000/api';

export const UserService = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_URL}/user`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.message || 'Failed to fetch users'
        );
      }
      throw new Error('Network error while fetching users');
    }
  },

  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.message ||
            `Failed to fetch user with ID ${id}`
        );
      }
      throw new Error(`Network error while fetching user with ID ${id}`);
    }
  },

  createUser: async (userData: CreateUserDto): Promise<User> => {
    try {
      const response = await axios.post(`${API_URL}/user`, userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.message || 'Failed to create user'
        );
      }
      throw new Error('Network error while creating user');
    }
  },

  updateUser: async (id: number, userData: UpdateUserDto): Promise<User> => {
    try {
      const response = await axios.patch(`${API_URL}/user/${id}`, userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.message ||
            `Failed to update user with ID ${id}`
        );
      }
      throw new Error(`Network error while updating user with ID ${id}`);
    }
  },

  deleteUser: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/user/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(
          axiosError.response.data.message ||
            `Failed to delete user with ID ${id}`
        );
      }
      throw new Error(`Network error while deleting user with ID ${id}`);
    }
  },
};
