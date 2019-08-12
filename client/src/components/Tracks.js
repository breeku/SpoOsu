import React from 'react'
import { Link } from 'react-router-dom'

const Tracks = props => {
    return (
        <div>
            Tracks!
            Linked here by {props.location.state.list.name}
            <Link to={{
                pathname: "/main/",
                state: {history: props.location.state.list.id}
            }}> Go back </Link>
        </div>
    )
}

export default Tracks