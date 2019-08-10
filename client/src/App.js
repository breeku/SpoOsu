import React, { useState, useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

import Main from "./components/Main"
import Callback from "./components/Callback"
import Login from "./components/Login"

const App = props => {
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)

    useEffect(() => {
        const tokenJSON = window.localStorage.getItem("SpoOsuToken")
        if (tokenJSON) {
            const token = JSON.parse(tokenJSON)
            setAccessToken(token.accessToken)
            setRefreshToken(token.refreshToken)
        } else {
            setAccessToken(false)
            setRefreshToken(false)
        }
    }, [])
    return (
        <Router>
            <div className="App">
                {accessToken === null ? (
                    <div>Loading...</div>
                ) : (
                    <Route
                        exact
                        path="/"
                        render={() =>
                            accessToken === false ? (
                                <Redirect to="/login/" />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/main/",
                                        state: { accessToken, refreshToken }
                                    }}
                                />
                            )
                        }
                    />
                )}

                <Route exact path="/main/" component={Main} />
                <Route exact path="/login/" component={Login} />
                <Route path="/callback/" component={Callback} />
            </div>
        </Router>
    )
}

export default App
