import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Form from './Form'
import actions from '../../store/actions'

export const Create = ({ userId, createStream }) => {

    let history = useHistory();

    const submit = values => {
        createStream({ ...values, userId })
        history.push(`/`)
    }
    return (
        <div>
            <h2>Create stream</h2>
            <Form onSubmit={submit} />
        </div>
    )
}

const mapStateToProps = (state) => ({ userId: state.current.userId })

const mapDispatchToProps = dispatch => {
    return {
        createStream: (formData) => {
            dispatch({
                type: actions.CREATE_STREAM,
                payload: formData
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)
