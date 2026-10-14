
import api from "./api"

export const createOrder = async () => {
    const response = await  api.post("/order")
    return response.data
}

export const getOrders = async () =>{
    const response = await api.get("/order")
    return response.data
}

export const getAllOrders = async () =>{
    const response = await api.get("/order/allorders")
    return response.data
}