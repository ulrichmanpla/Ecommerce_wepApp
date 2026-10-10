

import api from './api'

export const getuser=async () =>{
    const response = await api.get('/auth/')
    return response.data
}