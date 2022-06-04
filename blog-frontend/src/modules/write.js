import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
    createRequestActionTypes,
} from "../lib/createRequestSaga";
import *as postAPI from '../lib/api/posts';
import { takeLatest } from "redux-saga/effects";

const INITIALIZE ='write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [
    WRITE_POST,
    WRITE_POST_SUCCESS,
    WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value,
}));
export const writePost = createAction(WRITE_POST, ({ title, body, level }) => ({
    title,
    body,
    level
}));

const writePostSaga = createRequestSaga(WRITE_POST, postAPI.writePost);
export function* writeSaga() {
    yield takeLatest(WRITE_POST, writePostSaga);
}

const initialState = {
    title: '',
    body: '',
    level: '',
    post: null,
    postError: null,
};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value } })=> ({
            ...state,
            [key]: value,
        }),
        [WRITE_POST]: state => ({
            ...state,
            post: null,
            postError: null,
        }),
        //포스트 작성 성공
        [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
            ...state,
            post,
        }),
        //포스트 작성 실패
        [WRITE_POST_FAILURE]: (state, { payload:postError }) => ({
            ...state,
            postError,
        }),
    },
    initialState,
);

export default write;