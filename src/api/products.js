import api from "../services/api";

export const findAllProducts = async () => {
    try {
      const response = await api.get("/products/findAll");
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const saveProduct = async (product) => {
  try {
    const response = await api.post("/products", product);
    return response;
  } catch (error) {
    console.error(error);
  }
}