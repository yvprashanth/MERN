import CategoriesReducer from './categoriesReducer';
import { combineReducers } from 'redux'

export default combineReducers({
    categories: CategoriesReducer
})
