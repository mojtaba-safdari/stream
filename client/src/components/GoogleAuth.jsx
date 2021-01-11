import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions'
require('dotenv').config()

export const GoogleAuth = ({ isSignedIn, singIn, singOut }) => {

    let [auth, setAuth] = useState(null)

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: 'email'
            }).then(() => setAuth(window.gapi.auth2.getAuthInstance()))
        })
    }, [])

    useEffect(() => {
        if (auth !== null) {
            const onAuthChange = isSingedIn => isSingedIn ? singIn(auth.currentUser.get().getId()) : singOut()
            onAuthChange(auth.isSignedIn.get())
            auth.isSignedIn.listen(onAuthChange)
        }
    }, [auth]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            {
                isSignedIn && <button className="ui red google button" onClick={() => auth.signOut()}>
                    <i className="google icon" />
                    Sign Out
                </button>
            }
            {
                !isSignedIn && <button className="ui red google button" onClick={() => auth.signIn()}>
                    <i className="google icon" />
                    Sign In
                </button>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({ isSignedIn: state.current.isSignedIn })

const mapDispatchToProps = dispatch => {
    return {
        singIn: (userId) => {
            dispatch({
                type: actions.SIGN_IN,
                payload: userId
            });
        },
        singOut: () => {
            dispatch({
                type: actions.SIGN_OUT,
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth)
