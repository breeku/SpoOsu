const axios = require("axios")
const osuRouter = require("express").Router()

const getTracks = async (tracks) => {
    for (track of tracks) {
        console.log(track)
    }
}

const getTrack = async (artist, track) => {
    let response = await axios.get('https://osusearch.com/query/?title=' + track + '&artist=' + artist)
    return response.data
}

osuRouter.post("/tracks/singular", async (req, res) => {
    try {
        const osuTracks = await getTrack(req.body.track.artists[0].name, req.body.track.name)
        res.send({osuTracks, id: req.body.id})
    } catch (e) {
        console.log(e.response.status)
    }
})

module.exports = osuRouter