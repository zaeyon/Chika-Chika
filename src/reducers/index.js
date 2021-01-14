import {combineReducers} from 'redux';
import currentUser from './currentUser';
import reviewList from './reviewList'; 
import communityPostList from './communityPostList';
import dentalMap from './dentalMap';
import dentalFilter from './dentalFilter';

const rootReducers = combineReducers({
  currentUser,
  communityPostList,
  reviewList,
  dentalMap,
  dentalFilter,
});

export default rootReducers;
