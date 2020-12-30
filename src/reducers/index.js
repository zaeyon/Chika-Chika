import {combineReducers} from 'redux';
import currentUser from './currentUser';
import reviewList from './reviewList'; 
import communityPostList from './communityPostList';
import dentalList from './dentalList';
import dentalFilter from './dentalFilter';

const rootReducers = combineReducers({
  currentUser,
  communityPostList,
  reviewList,
  dentalList,
  dentalFilter,
});

export default rootReducers;
