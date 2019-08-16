import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/spotify/'

const getPlaylists = async tokens => {
    const response = await axios.post(baseUrl + 'playlists', tokens)
    return response.data
}

const getTracks = async obj => {
    const response = await axios.post(baseUrl + 'tracks', obj)
    return response.data
}

export default {
    getPlaylists,
    getTracks
}