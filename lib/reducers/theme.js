
import { GET_USER_THEME, SET_USER_THEME } from '../constants/actionType';


export default (state = {}, action) => {
    switch (action.type) {
        case GET_USER_THEME:
            return action.data;
        case SET_USER_THEME:
            return action.data;
        default:
            return state;
    }
};
