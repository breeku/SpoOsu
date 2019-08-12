import React, { useState, useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CircularProgress from '@material-ui/core/CircularProgress';
import "./css/animations.css";

import Main from "./components/Main"
import Callback from "./components/Callback"
import Login from "./components/Login"
import Tracks from "./components/Tracks"

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
             <Route
                render={({ location }) => (
                    <div className="App">
                        {accessToken === null ? (
                        <CircularProgress/>
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
                <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={300}
                >
                    <Switch location={location}>
                        <Route exact path="/main/" component={Main} />
                        <Route exact path="/main/tracks/" component={Tracks} />
                        <Route exact path="/login/" component={Login} />
                        <Route path="/callback/" component={Callback} />
                    </Switch>
                </CSSTransition>
                </TransitionGroup>
            </div>
            )}/>
        </Router>
    )
}

export default App
