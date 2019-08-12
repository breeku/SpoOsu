import React from "react"
import { Redirect } from "react-router"
import Button from "@material-ui/core/Button"
import Playlists from "./Playlists"

const Main = props => {
    const handleLogout = () => {
        window.localStorage.removeItem("SpoOsuToken")
        window.location.href = "/"
    }

    return (
        <div>
            {props.location.state ? (
                <div>
                    <h1>Spo!Osu</h1>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <Playlists
                        accessToken={props.location.state.accessToken}
                        refreshToken={props.location.state.refreshToken}
                        history={props.location.state.history}
                    />
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    )
}

export default Main
