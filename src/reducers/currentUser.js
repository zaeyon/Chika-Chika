const currentUser = (
  state = {
    currentLocation: {
      latitude: 37.566515657875435,
      longitude: 126.9781164904998,
    },
    searchRecordArray: [],
  },
  action,
) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        jwtToken: action.payload.jwtToken || state.jwtToken,
        profile: action.payload.profile,
        loggedIn: true,
      };
    case 'LOG_OUT':
      return {
        ...state,
        profile: {},
        loggedIn: false,
      };
    case 'SET_CURRENT_LOCATION':
      return {
        ...state,
        currentLocation: action.payload,
      };
    case 'SET_HOMETOWN':
      return {
        ...state,
        hometown: action.payload,
      };

    case 'CHANGE_MAIN_HOMETOWN': {
      let tmpHometownArray = state.hometown;
      const updatedHometownArray = tmpHometownArray.map((item, index) => {
        if (index === action.payload) {
          item.UsersCities.now = true;

          return item;
        } else {
          item.UsersCities.now = false;

          return item;
        }
      });

      return {
        ...state,
        hometown: updatedHometownArray,
      };
    }
    case 'ADD_HOMETOWN': {
      let tmpHometownArray = state.hometown;
      console.log('ADD_HOMETOWN action.payload', action.payload);
      tmpHometownArray.push(action.payload);

      return {
        ...state,
        hometown: tmpHometownArray,
      };
    }
    case 'DELETE_HOMETOWN': {
      let tmpHometownArray = state.hometown;
      const deleteIndex = tmpHometownArray.findIndex((item) => {
        return item.id === action.payload;
      });

      tmpHometownArray.splice(deleteIndex, 1);
      tmpHometownArray[0].UsersCities.now = true;

      return {
        ...state,
        hometown: tmpHometownArray,
      };
    }
    case 'SET_SEARCH_RECORD': {
      return {
        ...state,
        searchRecordArray: action.payload,
      };
    }
    case 'SET_NOTIFICATION': {
      return {
        ...state,
        profile: {
          ...state.profile,
          notificationConfig: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default currentUser;
