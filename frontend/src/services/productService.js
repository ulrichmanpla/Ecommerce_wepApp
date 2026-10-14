
import api from './api'
export const getProducts = async ()=>{
    const response = await api.get("/products")
    console.log(response.data)
    return response.data
}


export const createProduct = async (formData) => {
  const response = await api.post("/products", formData);
  return response.data;
};

export const updateProduct = async (id, formData) => {
  const response = await api.put(`/products/${id}`, formData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};