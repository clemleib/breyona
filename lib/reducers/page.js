import jsCookie from 'js-cookie';
import { SET_CURRENT_PAGE, SET_CURRENT_SUBPAGE } from '../constants/actionType';

const initialState = {
  currentPage: jsCookie.get('currentPage') || 'poker',
  subPage: ''
};


export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      jsCookie.set('currentPage', action.currentPage);
      return {
        ...state,
        currentPage: jsCookie.get('currentPage')
      };
    case SET_CURRENT_SUBPAGE:
      return {
        ...state,
        subPage: action.subPage
      };
    default:
      return state;
  }
};
