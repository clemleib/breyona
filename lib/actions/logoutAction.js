import axios from 'axios';
import jsCookie from 'js-cookie';
import saveCurrentUser from './saveCurrentUser';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import apiUrl from "../config"
const logoutAction = () => dispatch =>
  axios.post(`${apiUrl}/api/auth/logout`).then(() => {
    setAuthorizationToken(false);
    window.location.href = "/home";
    dispatch(saveCurrentUser({}));

  });

export default logoutAction;
