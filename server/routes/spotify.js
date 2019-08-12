const spotifyRouter = require("express").Router()
const spotifyApi = require("../spotifySetup")

const refreshTokens = async refreshToken => {
    try {
        await spotifyApi.setRefreshToken(refreshToken)
        const refreshedToken = await spotifyApi.refreshAccessToken()
        await spotifyApi.setAccessToken(refreshedToken.body.access_token)
        console.log("tokens refreshed and set")
    } catch (e) {
        console.log(e)
    }
}

const getPlaylists = async () => {
    try {
        const currentUser = await spotifyApi.getMe()
        const playlists = await spotifyApi.getUserPlaylists(
            currentUser.body.display_name
        )
        return playlists.body
    } catch (e) {
        console.log(e)
    }
}

spotifyRouter.post("/", async (req, res) => {
    try {
        await refreshTokens(req.body.refreshToken) // should probs wait for access to expire
        const playlists = await getPlaylists()
        res.send(playlists)
    } catch (e) {
        console.log(e)
    }
})

module.exports = spotifyRouter
