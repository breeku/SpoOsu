import React, { useState, useEffect, useCallback } from "react"
import spotifyPlaylists from "../services/spotifyPlaylists"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { Link } from "react-router-dom"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"

import debug from "../helpers/debug"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        margin: "0.5em",
        minWidth: 500,
        maxWidth: 500,
        minHeight: 500,
        maxHeight: 500,
        backgroundColor: "rgba(0,0,0,0)",
        transition: "transform .2s",
        "&:hover": {
            transform: "scale(1.03)"
        }
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    }
}))

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 320,
        fontSize: theme.typography.pxToRem(14),
        border: "1px solid #dadde9"
    }
}))(Tooltip)

const Playlists = ({ accessToken, refreshToken, history }) => {
    const [playlist, setPlaylist] = useState([])

    const classes = useStyles()

    const tokens = {
        accessToken,
        refreshToken
    }

    const currentElement = useCallback(
        node => {
            if (node !== null) {
                if (node.className === history) {
                    node.scrollIntoView({ block: "center", behavior: "smooth" })
                    console.log("scrolling to " + node.className)
                }
            }
        },
        [history]
    )

    useEffect(() => {
        const fetchPlaylists = async () => {
            //let response = await spotifyPlaylists.getPlaylists(tokens)
            //console.log(response)
            //setPlaylist(response.items)
            setPlaylist(debug.items)
        }
        fetchPlaylists()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container style={{paddingLeft: "7%", paddingRight: "7%"}}>
            {playlist.map(list => (
                <Grid container item xs={12} md={6} xl={4} justify="center">
                <HtmlTooltip
                    title={
                        <div>
                            <Typography variant="h6">{list.name}</Typography>
                            <Typography variant="p">
                                Tracks: {list.tracks.total}
                                <br />
                                Made by: {list.owner.display_name}
                            </Typography>
                        </div>
                    }
                >
                    <div className={`${list.id}`} ref={currentElement}>
                        <Link
                            to={{
                                pathname: `/main/tracks/`,
                                state: { list }
                            }}
                        >
                            <Paper
                                className={classes.paper}
                                style={{
                                    backgroundImage: `url(${
                                        list.images[0].url
                                    })`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    opacity: "1"
                                }}
                            >
                                <Grid container direction="row">
                                    <Grid item xs={6}>
                                        {/*
                                        <img
                                        src={list.images[0].url}
                                        alt={list.name}
                                        className={classes.img}
                                        />
                                        */}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={6}
                                        container
                                        direction="column"
                                    >
                                        {/* 
                                        <p>{list.name}</p>
                                        <p>Songs: {list.tracks.total}</p>
                                        */}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Link>
                    </div>
                </HtmlTooltip>
                </Grid>
            ))}
        </Grid>
    )
}

export default Playlists
