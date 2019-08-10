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
                    <p>{props.location.state.accessToken}</p>
                    <p>{props.location.state.refreshToken}</p>
                    <p>Playlists</p>
                    <Playlists
                        accessToken={props.location.state.accessToken}
                        refreshToken={props.location.state.refreshToken}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    )
}

export default Main
