import React, { useState, useEffect } from "react"
import spotifyPlaylists from "../services/spotifyPlaylists"

const Playlists = ({ accessToken, refreshToken }) => {
    const [playlist, setPlaylist] = useState([])

    const tokens = {
        accessToken,
        refreshToken
    }
    useEffect(() => {
        const fetchPlaylists = async () => {
            let response = await spotifyPlaylists.getPlaylists(tokens)
            setPlaylist(response.items)
        }
        fetchPlaylists()
    }, [])

    return (
    <div>
        {playlist.map((list) => 
            <li key={list.id}>
                {list.name}
            </li>
            )}
    </div>
    )
}

export default Playlists
