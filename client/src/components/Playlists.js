import React, { useState, useEffect, useCallback } from "react"
import spotify from "../services/spotify"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"

import PlaylistList from "./Playlists/PlaylistList"

import debug from "../helpers/debug"


    /*
    TODO:
        Browser back button
    */


const Playlists = ({ accessToken, refreshToken, history, cachedPlaylist }) => {
    const [playlist, setPlaylist] = useState(null)
    const [newAccessToken, setNewAccessToken] = useState(accessToken)

    const tokens = {
        accessToken: newAccessToken,
        refreshToken
    }

    const currentElement = useCallback(
        node => {
            if (node !== null) {
                if (node.className === history) {
                    node.scrollIntoView()
                }
            }
        },
        [history]
    )

    useEffect(() => {
        const fetchPlaylists = async () => {
            let response = await spotify.getPlaylists(tokens)
            setPlaylist(response.items)
            //setPlaylist(debug.items)
            //console.log("get playlists")
            if (response.refreshedToken) setNewAccessToken(response.refreshedToken)
        }
        if (cachedPlaylist) {
            setPlaylist(cachedPlaylist)
        } else {
            fetchPlaylists()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container>
            {playlist ? playlist.map(list => (
                <PlaylistList currentElement={currentElement} playlist={playlist} tokens={tokens} list={list} key={list.id}/>
            )) : 
            <Grid container item justify="center">
                <CircularProgress/>
            </Grid>
            }
            
        </Grid>
    )
}

export default Playlists
