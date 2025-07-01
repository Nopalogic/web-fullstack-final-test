import api, { handleApiError } from "./api";

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/api/login", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get("/api/verify-token");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/api/logout");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
