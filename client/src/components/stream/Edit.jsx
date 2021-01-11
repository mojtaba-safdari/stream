import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Form from './Form'
import actions from '../../store/actions'

export const Edit = ({ fetchStream, stream, updateStream }) => {

    let history = useHistory();
    let { id } = useParams()

    useEffect(() => {
        fetchStream(id)
    }, [fetchStream, id])


    const submit = values => {
        updateStream(id, { ...values })
        history.push(`/`)
    }

    return (
        <div>
            <h3>Edit a Stream</h3>
            {stream && <Form onSubmit={submit} initialValues={{ title: stream.title, description: stream.description }} />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    stream: state.current.stream,
})

const mapDispatchToProps = dispatch => {
    return {
        fetchStream: (streamID) => {
            dispatch({
                type: actions.FETCH_STREAM,
                payload: streamID
            });
        },
        updateStream: (id, formData) => {
            dispatch({
                type: actions.UPDATE_STREAM,
                payload: { id, formData }
            });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
