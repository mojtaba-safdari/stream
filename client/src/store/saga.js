import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions from "./actions";
import stream from "../apis/stream";

// create stream
function* createStreamWorker(action) {
    try {
        const response = yield call(() => stream.post("/streams", { ...action.payload }))
        yield put({ type: actions.CREATE_STREAM_SUCCESS, payload: response.data })

    }
    catch (error) {
        console.log(error)
    }
}

function* createStreamWatcher() {
    yield takeEvery(actions.CREATE_STREAM, createStreamWorker)
}

// fetch streams
function* fetchStreamsWorker() {
    try {
        const response = yield call(() => stream.get("/streams"))
        yield put({ type: actions.FETCH_STREAMS_SUCCESS, payload: response.data })

    }
    catch (error) {
        console.log(error)
    }
}

function* fetchStreamsWatcher() {
    yield takeEvery(actions.FETCH_STREAMS, fetchStreamsWorker)
}

// fetch one stream
function* fetchStreamWorker(action) {
    try {
        const response = yield call(() => stream.get(`/streams/${action.payload}`))
        yield put({ type: actions.FETCH_STREAM_SUCCESS, payload: response.data })

    }
    catch (error) {
        console.log(error)
    }
}

function* fetchStreamWatcher() {
    yield takeEvery(actions.FETCH_STREAM, fetchStreamWorker)
}

// update stream
function* updateStreamWorker(action) {
    try {
        const response = yield call(() => stream.patch(`/streams/${action.payload.id}`, action.payload.formData))
        yield put({ type: actions.UPDATE_STREAM_SUCCESS, payload: response.data })

    }
    catch (error) {
        console.log(error)
    }
}

function* updateStreamWatcher() {
    yield takeEvery(actions.UPDATE_STREAM, updateStreamWorker)
}

// delete stream
function* deleteStreamWorker(action) {
    try {
        yield call(() => stream.delete(`/streams/${action.payload}`))

    }
    catch (error) {
        console.log(error)
    }
}

function* deleteStreamWatcher() {
    yield takeEvery(actions.DELETE_STREAM, deleteStreamWorker)
}

export default function* sagaApi() {
    yield all([
        createStreamWatcher(),
        fetchStreamsWatcher(),
        fetchStreamWatcher(),
        updateStreamWatcher(),
        deleteStreamWatcher()
    ])
}