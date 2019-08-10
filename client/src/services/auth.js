import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/auth'

const login = async code => {
    const response = await axios.post(baseUrl, {code})
    return response.data
}

export default {
    login
}