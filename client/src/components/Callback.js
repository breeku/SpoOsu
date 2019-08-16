import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import auth from '../services/auth'
import CircularProgress from '@material-ui/core/CircularProgress';

const Callback = props => {
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const code = props.location.search.slice(6)

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await auth.login(code)
                let accToken = response.accessToken
                let refToken = response.refreshToken
                setAccessToken(accToken)
                setRefreshToken(refToken)

                window.localStorage.setItem(
                    "SpoOsuToken",
                    JSON.stringify({
                        accessToken: accToken,
                        refreshToken: refToken
                    })
                )
            } catch (e) {
                console.log(e)
            }
        }
        getToken()
    }, [code])

        return (
            <div>
            {accessToken && refreshToken ? <Redirect
                push
                to={{
                    pathname: "/main/",
                    state: { accessToken, refreshToken }
                }}
            /> : <CircularProgress/>}

            </div>
        )


}

export default Callback
