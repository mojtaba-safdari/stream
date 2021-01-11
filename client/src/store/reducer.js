import actions from "./actions";

const initState = {
    isSignedIn: null,
    userId: null,
    streams: [],
    stream: null
}

const reducer = (state = initState, action) => {
    let newState = state
    switch (action.type) {
        // sign in / out
        case actions.SIGN_IN:
            newState = { ...state, isSignedIn: true, userId: action.payload };
            break;
        case actions.SIGN_OUT:
            newState = { ...state, isSignedIn: false };
            break;
        // stream
        case actions.CREATE_STREAM_SUCCESS:
            newState = { ...state, streams: [...state.streams, action.payload] };
            break;
        case actions.FETCH_STREAMS_SUCCESS:
            newState = { ...state, streams: action.payload };
            break;
        case actions.FETCH_STREAM_SUCCESS:
            newState = { ...state, stream: action.payload };
            break;
        case actions.UPDATE_STREAM_SUCCESS:
            newState = { ...state, stream: action.payload };
            break;
        default:
            newState = state
            break;
    }
    return newState
}

export default reducer