import {
    FETCH_ALL_CATEGORIES
} from '../actions';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES:
            return action.payload.categories;
        default:
            return state;
    }
}