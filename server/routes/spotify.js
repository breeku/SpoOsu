const spotifyRouter = require("express").Router()
const spotifyApi = require("../spotifySetup")

spotifyRouter.post("/", async (req, res) => {
    try {
        await spotifyApi.setRefreshToken(req.body.refreshToken)
        const refreshedToken = await spotifyApi.refreshAccessToken()
        await spotifyApi.setAccessToken(refreshedToken.body.access_token)

        const currentUser = await spotifyApi.getMe()
        //console.log(currentUser)

        const playlists = await spotifyApi.getUserPlaylists(currentUser.body.display_name)
        //console.log(playlists.body)

        res.send(playlists.body)
    } catch (e) {
        console.log(e)
    }
})

module.exports = spotifyRouter
