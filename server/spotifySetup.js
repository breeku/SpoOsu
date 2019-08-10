require("dotenv").config()
const SpotifyWebApi = require("spotify-web-api-node")

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/callback/'
}

const spotifyApi = new SpotifyWebApi(credentials)

module.exports = spotifyApi