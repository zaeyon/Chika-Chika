import {combineReducers} from 'redux';
import currentUser from './currentUser';
import reviewList from './reviewList'; 
import communityPostList from './communityPostList';
import dentalMap from './dentalMap';
import dentalFilter from './dentalFilter';
import commentList from './commentList';

const rootReducers = combineReducers({
  currentUser,
  communityPostList,
  reviewList,
  dentalMap,
  dentalFilter,
  commentList,
});

export default rootReducers;
