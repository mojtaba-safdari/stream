import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import actions from '../../store/actions'

export const List = ({ streams, userId, isSignedIn, fetchStreams }) => {

    useEffect(() => {
        fetchStreams()
    }, [fetchStreams])

    const renderStreamsList = (streams) => {
        return streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {
                        (isSignedIn && userId === stream.userId) && <div className="right floated content">
                            <Link to={`/stream/edit/${stream.id}`} className="ui button primary">Edit</Link>
                            <Link to={`/stream/delete/${stream.id}`} className="ui button negative">Delete</Link>
                        </div>
                    }
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/stream/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            List of streams :

            <div className="ui celled list">
                {renderStreamsList(streams)}
            </div>

            {
                isSignedIn && <div style={{ textAlign: 'right' }}>
                    <Link to="/stream/create" className="ui button green">
                        Create Stream
                </Link>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    isSignedIn: state.current.isSignedIn,
    streams: state.current.streams,
    userId: state.current.userId
})

const mapDispatchToProps = dispatch => {
    return {
        fetchStreams: () => {
            dispatch({
                type: actions.FETCH_STREAMS,
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
