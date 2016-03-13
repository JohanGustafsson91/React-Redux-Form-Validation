import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import {
  handleForm
} from './reducers/forms';

// Combine your reducers here
export default combineReducers({
  handleForm,
  router
});
