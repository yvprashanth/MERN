import { combineReducers } from 'redux'


const initial_state = {
    sunday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    monday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    thursday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    friday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
    saturday: {
      breakfast: null,
      lunch: null,
      dinner: null,
    },
  }


const user = (state = initial_state, action) => {
    switch (action.type) {
      case 'FETCH_ALL_USERS':
        return {
            ...state,
            categories: action.json
        };
      default:
        return state;
    }
};

export default combineReducers({
    user
})
