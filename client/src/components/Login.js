import React from "react"
import Button from '@material-ui/core/Button';

const Login = () => {
    const redirectUrl = "http://localhost:3000/callback/"
    const authUrl =
        "https://accounts.spotify.com/authorize?client_id=aef42b48cc74441299b7b1ac9b42a779&response_type=code&redirect_uri=" +
        redirectUrl
    return (
        <div>
            <div>
                <h1>Login</h1>
                <a href={authUrl}>
                    <Button variant="contained" color="primary">Login via Spotify</Button>
                </a>
            </div>
        </div>
    )
}

export default Login
