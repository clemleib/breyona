import jwt from 'jsonwebtoken';
import jsCookie from 'js-cookie';
import setAuthorizationToken from './setAuthorizationToken';
import saveCurrentUser from '../actions/saveCurrentUser';

const processLogin = async (token, dispatch) => {
  jsCookie.set('jwtTokenBTCGrinders', token); //
  jwt.verify(token, "idontgiveadamn", async (err, decoded) => {
    if (decoded) {
      setAuthorizationToken(token);
      await dispatch(saveCurrentUser(decoded));
    } else {
      setAuthorizationToken(null);
    }
  });
};

export default processLogin;
