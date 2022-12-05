import api from "../services/api";

export const saveSale = async (sale) => {
    try {
      const response = await api.post("/sales", sale);
      return response;
    } catch (error) {
      console.error(error);
    }
  };