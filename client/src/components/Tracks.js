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
import osu from "../services/osu"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "1.5em",
        minWidth: 500,
    },
    header: {
        marginTop: "0.5em",
    },
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%"
    },
    image: {
        maxWidth: 180,
        maxHeight: 180
    },
    textCentered: {
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)"
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
    const [loading, setLoading] = useState(null)

    const classes = useStyles()

    const handleSingular = async (track, id) => {
        setLoading(id)
        let copy = [...tracks]
        let response = await osu.getTrack(track, id)
        for (track of copy) {
            if (track.track.id === response.id) {
                let index = copy.findIndex(
                    track => track.track.id === response.id
                )
                let updatedTrack = {
                    ...track,
                    beatmaps: response.osuTracks
                }
                copy[index] = updatedTrack
                setTracks(copy)
                setLoading(null)
            }
        }
    }

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

    console.log(tracks)
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
                                <TrackList handleSingular={handleSingular} loading={loading} track={track}/>
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
