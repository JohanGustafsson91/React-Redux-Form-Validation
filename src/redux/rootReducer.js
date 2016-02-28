import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import { auth } from './reducers/authentication';
import {
  handleForm
} from './reducers/forms';

// Combine your reducers here
export default combineReducers({
  auth,
  handleForm,
  router
});
