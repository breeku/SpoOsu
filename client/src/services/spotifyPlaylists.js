import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/spotify'

const getPlaylists = async tokens => {
    const response = await axios.post(baseUrl, tokens)
    return response.data
}

export default {
    getPlaylists
}