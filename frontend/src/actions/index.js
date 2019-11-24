import {
    ROOT_URL,
    AUTH_HEADERS,
    guid
} from './constants';

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_ALL_CATEGORIES = "FETCH_ALL_CATEGORIES";
export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";

function fetchCategoriesSuccess(data) {
    return {
        type: FETCH_ALL_CATEGORIES,
        payload: data
    };
}

export function fetchCategories(){
    return dispatch => {
        fetch('http://localhost:5000/categories', {headers : {'Authorization': 'Anything you want'}})
            .then(response => response.json())
            .then(json => dispatch(fetchCategoriesSuccess(json)))
            .catch(err => console.log(err));
    }
}

function fetchPostsSuccess(data){
    return {
        type: FETCH_ALL_POSTS,
        payload: data
    }
}

export function fetchPosts(){
    return dispatch => {
        fetch('http://localhost:5000/posts', {headers: { 'Authorization': 'Anything you want'}})
            .then(response => response.json())
            .then(json => dispatch(fetchPostsSuccess(json)))
            .catch(err => console.log(err));
    }
}