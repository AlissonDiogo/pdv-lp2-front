import api from "../services/api";

export const findAllPaymentWays = async () => {
    try {
      const response = await api.get("/paymentWays/findAll");
      return response;
    } catch (error) {
      console.error(error);
    }
  };