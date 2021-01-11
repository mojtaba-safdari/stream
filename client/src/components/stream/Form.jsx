import React from 'react'
import { Field, reduxForm } from 'redux-form'



const renderInput = ({ input, meta, label }) => {
    return (
        <div className="field">
            <div>
                <label>{label}</label>
                <input {...input} />
            </div>
            <div>
                {
                    (meta.touched && meta.error)
                        ?
                        <>
                            <i className="info circle icon red"></i>
                            <span style={{ color: 'red' }}>{meta.error}</span>
                        </>
                        :
                        ''
                }
            </div>
        </div>
    )
}

let Form = ({ handleSubmit }) => {
    return (
        <form className="ui form error" onSubmit={handleSubmit}>
            <Field name="title" component={renderInput} type="text" label="Title" />
            <Field name="description" component={renderInput} type="text" label="Description" />
            <button className="button ui primary">Submit</button>
        </form>
    )
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title.';
    }

    if (!formValues.description) {
        errors.description = 'You must enter description.';
    }

    return errors;
};

Form = reduxForm({ form: 'streamForm', validate })(Form)


export default Form