import {
    ROOT_URL,
    AUTH_HEADERS,
    guid
} from './constants';

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_ALL_CATEGORIES = "FETCH_ALL_CATEGORIES";

function fetchCategoriesSuccess(data) {
    return {
        type: FETCH_ALL_CATEGORIES,
        payload: data
    };
}

export function fetchCategories(){
    debugger
    return dispatch => {
        fetch('http://localhost:5000/categories', {headers : {'Authorization': 'Anything you want'}})
            .then(response => response.json())
            .then(json => dispatch(fetchCategoriesSuccess(json)))
            .catch(err => console.log(err));
    }
}