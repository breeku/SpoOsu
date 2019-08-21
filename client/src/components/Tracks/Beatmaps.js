import React from "react"
import Button from "@material-ui/core/Button"
import DialogContent from "@material-ui/core/DialogContent"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "1.5em",
        minWidth: 500
    },
    textPaper: {
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)"
    }
}))

const Beatmaps = ({ beatmaps }) => {
    const classes = useStyles()
    return (
        <div>
            <DialogContent dividers={true}>
                <Grid container spacing={2}>
                    {beatmaps.beatmaps.map(beatmap => (
                        <React.Fragment>
                            <Grid
                                container
                                item
                                justify="center"
                                key={beatmap.beatmap_id}
                            >
                                <Paper className={classes.paper}>
                                    <Grid item xs={12} sm container>
                                        <Grid
                                            item
                                            xs
                                            container
                                            direction="column"
                                            spacing={2}
                                        >
                                            <Grid
                                                item
                                                xs
                                                className={classes.textPaper}
                                            >
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                >
                                                    {beatmap.difficulty_name}
                                                </Typography>
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                >
                                                    By {beatmap.mapper}
                                                    <br/>
                                                    Stars {beatmap.difficulty.toFixed(2)}
                                                    <br/>
                                                    AR {beatmap.difficulty_ar}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </DialogContent>
        </div>
    )
}

export default Beatmaps
