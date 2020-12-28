import {combineReducers} from 'redux';
import currentUser from './currentUser';
import reviewList from './reviewList'; 
import communityPostList from './communityPostList';

const rootReducers = combineReducers({
  currentUser,
  communityPostList,
  reviewList,
});

export default rootReducers;
