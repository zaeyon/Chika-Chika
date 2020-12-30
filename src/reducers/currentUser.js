const currentUser = (state = {
    currentLocation : {
        latitude: 37.566515657875435,
        longitude: 126.9781164904998
    }
}, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        case "SET_CURRENT_LOCATION":
            return {
                ...state,
                currentLocation: action.payload,
            }
        default:
            return state
    }
}

export default currentUser;