import api from "../services/api";

export const findByBarcode = async (barcode) => {
  try {
    const response = await api.get(`/products/barcode?barcode=${barcode}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const findByNameRegex = async (name) => {
  try {
    const response = await api.get(`/products/regex?name=${name}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

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
};

export const verifyIsAvailableByQuantity = async (name, order) => {
  try {
    const response = await api.get(
      `/products/verifyIsAvailable?name=${name}&requestedQuantity=${order}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
