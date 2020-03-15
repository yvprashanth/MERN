import {
    AUTH_HEADERS
} from './constants';

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_ALL_CATEGORIES = "FETCH_ALL_CATEGORIES";
export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS";
export const CREATE_POST = "CREATE_POST";

export const FETCH_BEGIN = "FETCH_CATEGORIES_BEGIN";
export const FETCH_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_FAILURE = "FETCH_CATEGORIES_FAILURE";

export const EDIT_POST = "EDIT_POST";

const api = 'http://localhost:5000'

function fetchCategoriesSuccess(data) {
    return {
        type: FETCH_ALL_CATEGORIES,
        payload: data
    };
}

export function editPost(post){
    return {
        type: EDIT_POST,
        post
    }
}

export function fetchCategories(){
    return dispatch => {
        fetch(api + '/categories', {headers : AUTH_HEADERS})
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
        fetch(api + '/posts', {headers : AUTH_HEADERS})
            .then(response => response.json())
            .then(json => dispatch(fetchPostsSuccess(json)))
            .catch(err => console.log(err));
    }
}             

export function fetchPostDetail(id){
    const url = api + '/posts' + id; 
    return dispatch => {
        fetch(url + '/id', { headers : AUTH_HEADERS })
            .then(response => response.json())
            .then(json => dispatch(editPost(json)))
            .catch(err => console.log(err))
    }
}
         
export function createPost(data){
    return dispatch => {
        fetch(api + '/posts', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Basic '+btoa('username:password'), 
                "Content-Type": "application/json"
            }), 
            body: JSON.stringify(data)}
            )
            .then(response => response.json())
            .then(json => dispatch(fetchPostsSuccess(json)))
            .catch(err => console.log(err));
    }
}