import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
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
}))

const Beatmaps = ({beatmaps}) => {
    const classes = useStyles()
    return (
            <div className={classes.modal}>
                <h2 id="simple-modal-title">Beatmaps</h2>
                <div id="simple-modal-description">
                    {beatmaps.beatmaps.map(beatmap => (
                        <div key={beatmap.beatmap_id}>
                            <Typography>
                                {beatmap.title}, by
                                {beatmap.mapper}
                                AR
                                {beatmap.difficulty_ar}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                target="_blank"
                                href={
                                    "https://osu.ppy.sh/beatmapsets/" +
                                    beatmap.beatmapset_id
                                }
                            >
                                Download
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        
    )
}

export default Beatmaps