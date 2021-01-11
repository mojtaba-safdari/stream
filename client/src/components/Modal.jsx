import React from 'react'

export default function Modal(props) {
    return (
            <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <div className="header">{props.title}</div>
                    <div className="content">{props.content}</div>
                    <div className="actions">{props.actions}</div>
                </div>
            </div>
    )
}
