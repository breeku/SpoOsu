import React from 'react'
import Grid from "@material-ui/core/Grid"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import LazyLoad from "react-lazyload"

const useStyles = makeStyles(theme => ({
    imageContainer: {
        position: "relative",
        textAlign: "center",
        transition: "transform .2s",
        "&:hover": {
            transform: "scale(1.03)"
        }
    },
    textCentered: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "calc(96%)",
        transform: "translate(-50%, -50%)",
        color: "white",
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    image: {
        borderRadius: "5px",
        margin: "0.5em",
        maxWidth: 500,
        maxHeight: 500,
        backgroundColor: "rgba(0,0,0,0)",
    },
    placeholder: {
        minWidth: 500,
        minHeight: 500,
    },
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

const PlaylistList = ({playlist, tokens, list ,currentElement}) => {
    const classes = useStyles()
    return (
        <Grid
        container
        item
        xs={12}
        md={6}
        xl={4}
        justify="center"
        key={list.id}
    >
        <div className={`${list.id}`} ref={currentElement}>
            <HtmlTooltip
                title={
                    <div>
                        <Typography variant="h6">
                            {list.name}
                        </Typography>
                        <Typography>
                            Tracks: {list.tracks.total}
                            <br />
                            Made by: {list.owner.display_name}
                        </Typography>
                    </div>
                }
            >
                <Link
                    to={{
                        pathname: `/main/tracks/`,
                        state: { list, playlist, tokens}
                    }}
                >
                    <div className={classes.imageContainer}>
                        <LazyLoad
                            placeholder={
                                <div
                                    className={classes.placeholder}
                                />
                            }
                            once
                        >
                            <img
                                className={classes.image}
                                src={list.images[0].url}
                                alt={list.name}
                            />
                        </LazyLoad>
                        <Typography
                            variant="h6"
                            className={classes.textCentered}
                        >
                            {list.name}
                        </Typography>
                    </div>
                </Link>
            </HtmlTooltip>
        </div>
    </Grid>
    )
}

export default PlaylistList