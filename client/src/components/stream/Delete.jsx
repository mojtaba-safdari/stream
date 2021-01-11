import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';
import actions from '../../store/actions'
import Modal from '../Modal'

export const Delete = ({ fetchStream, stream, deleteStream }) => {

    let history = useHistory();
    let { id } = useParams()

    useEffect(() => {
        fetchStream(id)
    }, [fetchStream, id])

    const renderActions = () => {
        return (
            <React.Fragment>
                <button
                    onClick={() => { deleteStream(id); history.push('/') }}
                    className="ui negative button">
                    Delete
                </button>
                <Link to="/" className="ui cancel button">Cancel</Link>
            </React.Fragment >
        );
    }

    const renderContent = () => {
        if (!stream) {
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete this stream with title ${stream.title}?`
    }

    return (
        <div>
            <Modal
                title="Delete Stream"
                content={renderContent()}
                actions={renderActions()}
                onDismiss={() => history.push('/')}
            />
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
        deleteStream: (id) => {
            dispatch({
                type: actions.DELETE_STREAM,
                payload: id
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Delete)
