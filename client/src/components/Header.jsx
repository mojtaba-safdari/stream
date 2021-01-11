import React from 'react'
import { Link, BrowserRouter as Router } from "react-router-dom";
import GoogleAuth from './GoogleAuth'

export default function Header() {

    return (
        <div className="ui secondary pointing menu" style={{marginTop:'20px'}}>
            <Router>
                <Link className="item" to="/">
                    All Streams
            </Link>
                <div className="right menu">
                    <GoogleAuth />
                </div>
            </Router>
        </div>
    )
}
