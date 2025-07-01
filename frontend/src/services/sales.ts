import api, { handleApiError } from "./api";

export const createTransaction = async (
  items: {
    product_id: string | number;
    quantity: number;
  }[]
) => {
  try {
    const response = await api.post("/api/sales", { items });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get("/api/sales");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getTransaction = async (id: string) => {
  try {
    const response = await api.get(`/api/sales/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
