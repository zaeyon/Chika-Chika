import {combineReducers} from 'redux';
import currentUser from './currentUser';
import communityPostList from './communityPostList';

const rootReducers = combineReducers({
  currentUser,
  communityPostList,
});

export default rootReducers;
