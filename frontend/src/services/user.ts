import { User } from "@/types/user";

import api, { handleApiError } from "./api";

export const createUser = async (data: User) => {
  try {
    const response = await api.post("/users", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUser = async (id: number | string) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateUser = async (id: number | string, data: User) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeUser = async (id: number) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
