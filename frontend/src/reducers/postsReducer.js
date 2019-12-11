import {
    FETCH_ALL_POSTS, 
    CREATE_POST
} from '../actions';

const INITIAL_STATE = {
    kassidi: {
        name: 'Kassidi Henry',
        age: 24,
        favoriteMovie: 'Remember the Titans'
      },
      tyler: {
        name: 'Tyler McGinnis',
        age: 25,
        favoriteMovie: 'Fatigue: A JavaScript Story'
      },
      jake: {
        name: 'Jake Lingwall',
        age: 26,
        favoriteMovie: 'Casablanca'
      },
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ALL_POSTS:
            return action.payload;
        case CREATE_POST:
            return action.payload
        default:
            return state;
    }
}