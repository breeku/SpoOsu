import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { CircularProgress } from "@material-ui/core" 
import { Redirect } from "react-router"
import { makeStyles } from "@material-ui/core/styles"

import TrackList from "./Tracks/TrackList"

import spotify from "../services/spotify"

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: "0.5em"
    },
    buttonCenter: {
        margin: "auto",
        paddingLeft: "1em"
    }
}))

const Tracks = props => {
    const [tracks, setTracks] = useState(null)
    const [newAccessToken, setNewAccessToken] = useState(
        props.location.state.tokens.accessToken
    )

    const classes = useStyles()

    useEffect(() => {
        const fetchTracks = async () => {
            let response = await spotify.getTracks({
                id: props.location.state.list.id,
                accessToken: newAccessToken,
                refreshToken: props.location.state.tokens.refreshToken
            })
            setTracks(response.tracks.items)
            if (response.refreshedToken)
                setNewAccessToken(response.refreshedToken)
        }
        fetchTracks()
    }, [
        newAccessToken,
        props.location.state.list.id,
        props.location.state.tokens.refreshToken
    ])

    return (
        <div>
            {props.location.state ? (
                <div>
                    <Typography variant="h6">
                        {props.location.state.list.name}
                    </Typography>

                    <Link
                        to={{
                            pathname: "/main/",
                            state: {
                                history: props.location.state.list.id,
                                cachedPlaylist: props.location.state.playlist,
                                refreshToken:
                                    props.location.state.tokens.refreshToken,
                                accessToken: newAccessToken
                            }
                        }}
                    >
                        <Button variant="contained" color="secondary">
                            Go back
                        </Button>
                    </Link>

                    <Grid container spacing={2} className={classes.header}>
                        {tracks ? (
                            tracks.map(track => (
                                <TrackList
                                    oneTrack={track}
                                    key={track.track.id}
                                />
                            ))
                        ) : (
                            <CircularProgress />
                        )}
                    </Grid>
                </div>
            ) : (
                <Redirect to="/main/" />
            )}
        </div>
    )
}

export default Tracks
