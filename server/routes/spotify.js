const spotifyRouter = require("express").Router()
const spotifyApi = require("../spotifySetup")

const refreshTokens = async refreshToken => {
    try {
        await spotifyApi.setRefreshToken(refreshToken)
        const refreshedToken = await spotifyApi.refreshAccessToken()
        await spotifyApi.setAccessToken(refreshedToken.body.access_token)
        console.log("tokens refreshed and set")
        return refreshedToken.body.access_token
    } catch (e) {
        console.log(e)
    }
}

const getPlaylists = async (accessToken, refreshToken) => {
    try {
        if (accessToken) await spotifyApi.setAccessToken(accessToken)
        let limit = 50
        let offset = 0
        const currentUser = await spotifyApi.getMe()
        let playlists = await spotifyApi.getUserPlaylists(
            currentUser.body.display_name,
            { limit }
        )

        while (offset < playlists.body.total) {
            offset += 50
            const next = await spotifyApi.getUserPlaylists(
                currentUser.body.display_name,
                { limit, offset }
            )
            for (playlist of next.body.items) {
                playlists.body.items.push(playlist)
            }
        }
        return playlists.body
    } catch (e) {
        if (e.statusCode === 401 || e.statusCode === 400) {
            let refreshedToken = await refreshTokens(refreshToken)
            return {refreshedToken}
        } else {
            console.log(e)
        }
    }
}

const getTracks = async (id, accessToken, refreshToken) => {
    try {
        if (accessToken) await spotifyApi.setAccessToken(accessToken)
        let offset = 100
        let tracks = await spotifyApi.getPlaylistTracks(id)

        while (offset < tracks.body.total) {
            offset += 100
            const next = await spotifyApi.getPlaylist(id, { offset })
            for (track of next.body.tracks.items) {
                tracks.body.items.push(track)
            }
        }

        return tracks.body
    } catch (e) {
        if (e.statusCode === 401 || e.statusCode === 400) {
            let refreshedToken = await refreshTokens(refreshToken)
            return {refreshedToken}
        } else {
            console.log(e)
        }
    }
}

spotifyRouter.post("/playlists", async (req, res) => {
    try {
        const playlists = await getPlaylists(req.body.accessToken, req.body.refreshToken)
        if (playlists.refreshedToken) {
            await playlists.push(getPlaylists())
        }
        res.send(playlists)
    } catch (e) {
        console.log(e)
    }
})

spotifyRouter.post("/tracks", async (req, res) => {
    try {
        obj = {
            refreshedToken: null,
            tracks: {}
        }
        let tracks = await getTracks(req.body.id, req.body.accessToken, req.body.refreshToken)
        if (tracks.refreshedToken) {
            let retry = await getTracks(req.body.id)
            obj = {
                ...tracks,
                tracks: retry
            }
        } else {
            obj = {
                ...obj,
                tracks
            }
        }
        res.send(obj)
    } catch (e) {
        console.log(e)
    }
})

module.exports = spotifyRouter
