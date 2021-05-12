import { GET_ADMIN } from '../constants/actionType';

const initialState = {
  sites: [],
  payouts: [],
  apayouts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
