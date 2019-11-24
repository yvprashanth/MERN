import CategoriesReducer from './categoriesReducer';
import PostsReducer from './postsReducer';
import { combineReducers } from 'redux'

export default combineReducers({
    categories: CategoriesReducer,
    posts: PostsReducer
})
