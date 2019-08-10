import React, { useState, useEffect } from "react"
import { Redirect } from "react-router"
import auth from '../services/auth'

const Callback = props => {
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const code = props.location.search.slice(6)

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await auth.login(code)
                console.log(response)
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
            /> : <div>Loading...</div>}

            </div>
        )


}

export default Callback
