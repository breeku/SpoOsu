import React, { useState } from "react"
import Modal from "@material-ui/core/Modal"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"

import Beatmaps from "./Beatmaps"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "1.5em",
        minWidth: 500
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

const TrackList = ({ handleSingular, loading, track }) => {
    const [open, setOpen] = useState(false)

    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Grid container item xs={12} justify="center" key={track.track.id}>
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
                    {/*<Grid item>
                                                <img src={track.track.album.images[1].url} className={classes.image}/>
                                            </Grid>*/}
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs className={classes.textCentered}>
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
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpen}
                                >
                                    Maps
                                </Button>
                                <Modal
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <Beatmaps beatmaps={track.beatmaps} />
                                </Modal>
                            </div>
                        ) : loading !== track.track.id ? (
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
