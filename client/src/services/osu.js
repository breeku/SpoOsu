import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/osu/'

const getTrack = async (track, id) => {
    const response = await axios.post(baseUrl + 'tracks/singular', {track, id})
    return response.data
}

export default {
    getTrack
}