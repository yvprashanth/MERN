import {
    FETCH_ALL_POSTS
} from '../actions';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return action.payload;
        default:
            return state;
    }
}