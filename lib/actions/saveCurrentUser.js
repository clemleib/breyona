import { SET_CURRENT_USER } from '../constants/actionType';

const saveCurrentUser = user => (
  {
    type: SET_CURRENT_USER,
    user
  }
);

export default saveCurrentUser;
