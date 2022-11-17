import api from "../services/api";

export const findAllProducts = async () => {
    try {
      const response = await api.get("/products/findAll");
      return response;
    } catch (error) {
      console.error(error);
    }
};