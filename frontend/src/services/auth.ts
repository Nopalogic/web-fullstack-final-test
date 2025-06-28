import api, { handleApiError } from "./api";

export const loginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get("/verify-token");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
