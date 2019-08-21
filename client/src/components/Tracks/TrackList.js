import React, { useState, Fragment } from "react"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"

import Beatmaps from "./Beatmaps"

import osu from "../../services/osu"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "1.5em",
        minWidth: 500
    },
    textPaper: {
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    buttonCenter: {
        margin: "auto",
        paddingLeft: "1em"
    }
}))

const TrackList = ({ oneTrack }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [track, setTrack] = useState(oneTrack)

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSingular = async (track, id) => {
        setLoading(true)
        let response = await osu.getTrack(track, id)
        let updatedTrack = {
            ...oneTrack,
            beatmaps: response.osuTracks
        }
        setTrack(updatedTrack)
        setLoading(false)
    }

    return (
        <Grid container item xs={4} justify="center" key={track.track.id}>
            <Paper
                className={classes.paper}
                style={{
                    backgroundImage: `url(${track.track.album.images[0].url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs className={classes.textPaper}>
                            <Typography gutterBottom variant="h6">
                                {track.track.artists[0].name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                {track.track.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ID: {track.track.id}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.buttonCenter}>
                        {track.beatmaps ? (
                            <Fragment>
                                {track.beatmaps.result_count === 0 ? (
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        className={classes.textPaper}
                                    >
                                        No beatmaps :(
                                    </Typography>
                                ) : (
                                    <div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpen}
                                        >
                                            Maps
                                        </Button>
                                        <Dialog
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            <Beatmaps
                                                beatmaps={track.beatmaps}
                                            />
                                        </Dialog>
                                    </div>
                                )}
                            </Fragment>
                        ) : !loading ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    handleSingular(track.track, track.track.id)
                                }
                            >
                                Get
                            </Button>
                        ) : (
                            <CircularProgress />
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default TrackList
