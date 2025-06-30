/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { handleApiError } from "./api";

export const createProduct = async (data: any) => {
  try {
    const response = await api.post("/api/products", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getProduct = async (id: number | string) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProduct = async (id: number | string, data: any) => {
  try {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const removeProduct = async (id: number) => {
  try {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
