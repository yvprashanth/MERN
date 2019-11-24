import CategoriesReducer from './categoriesReducer';
import PostsReducer from './PostsReducer';
import { combineReducers } from 'redux'

export default combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer
})
