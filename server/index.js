require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const authRouter = require('./routes/auth')
const spotifyRouter = require('./routes/spotify')
const osuRouter = require('./routes/osu')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/spotify', spotifyRouter)
app.use('/api/osu', osuRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})