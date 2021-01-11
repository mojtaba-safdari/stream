import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import flvjs from 'flv.js'
import actions from '../../store/actions'

export const Show = ({ stream, fetchStream }) => {

    let { id } = useParams()
    const videoPlayer = useRef(null)

    useEffect(() => {

        fetchStream(id)

        if (flvjs.isSupported()) {
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${id}.flv`
            });
            flvPlayer.attachMediaElement(videoPlayer.current);
            flvPlayer.load();
        }
        return () => {
            flvPlayer.destroy()
        }
    }, [fetchStream, id])


    return (
        <div>
            <video src="" controls ref={videoPlayer} style={{ width: '100%' }} ></video>
        </div>
    )
}

const mapStateToProps = (state) => ({
    stream: state.current.stream,
})

const mapDispatchToProps = dispatch => {
    return {
        fetchStream: (streamId) => {
            dispatch({
                type: actions.FETCH_STREAM,
                payload: streamId
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Show)
