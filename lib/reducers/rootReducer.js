import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import theme from './theme';
import page from './page';
import admin from './admin';

export default combineReducers({
  auth,
  user,
  theme,
  pageInfo: page,
  admin
});
