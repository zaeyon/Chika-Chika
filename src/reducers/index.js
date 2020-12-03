import {combineReducers} from 'redux'
import currentUser from './currentUser'

const rootReducers = combineReducers({
    currentUser,
})

export default rootReducers