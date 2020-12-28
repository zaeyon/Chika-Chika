import {combineReducers} from 'redux';
import currentUser from './currentUser';
import reviewList from './reviewList'; 

const rootReducers = combineReducers({
    currentUser,
    reviewList,
})

export default rootReducers