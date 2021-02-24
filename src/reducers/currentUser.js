const currentUser = (
  state = {
    currentUserLocation: {
      latitude: 37.566515657875435,
      longitude: 126.9781164904998,
    },
    searchRecordArray: [],
    dentalSearchRecordArray: [],
    notificationArray: TEST_NOTIFICATION_ARRAY_DATA,
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
    case 'SET_CURRENT_USER_LOCATION':
      return {
        ...state,
        currentUserLocation: action.payload,
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

    case 'DELETE_SEARCH_RECORD': {
      let tmpSearchRecordArray = state.searchRecordArray.slice();
      console.log("DELETE_SEARCH_RECORD tmpSearchRecordArray", tmpSearchRecordArray);
      console.log("DELETE_SEARCH_RECORD action.payload", action.payload);
      const deleteIndex = tmpSearchRecordArray.findIndex((item, index) => {
        return item.id === action.payload
      })

      tmpSearchRecordArray.splice(deleteIndex, 1);

      return {
        ...state,
        searchRecordArray: tmpSearchRecordArray,
      }
    }

    case 'SET_DENTAL_SEARCH_RECORD': {
      return {
        ...state,
        dentalSearchRecordArray: action.payload,
      }
    }

    case 'DELETE_DENTAL_SEARCH_RECORD': {
      let tmpDentalSearchRecordArray = state.dentalSearchRecordArray.slice();
      console.log("DELETE_DENTAL_SEARCH_RECORD tmpDentalSearchRecordArray", tmpDentalSearchRecordArray);
      console.log("DELETE_DENTAL_SEARCH_RECORD action.payload", action.payload);
      const deleteIndex = tmpDentalSearchRecordArray.findIndex((item, index) => {
        return item.id === action.payload
      })

      tmpDentalSearchRecordArray.splice(deleteIndex, 1);

      return {
        ...state,
        dentalSearchRecordArray: tmpDentalSearchRecordArray,
      }
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

    case 'SET_NOTIFICATION_ARRAY': {
      return {
        ...state,
        notificationArray: action.payload,
      }
    }
    default:
      return state;
  }
};

export default currentUser;

const TEST_NOTIFICATION_ARRAY_DATA = [
    {
        "id": 325,
        "type": "Comment",
        "message": "리뷰글에 작성한 댓글에 새로운 답글이 달렸습니다.",
        "createdAt": "2021-01-26 19:49:34",
        "updatedAt": "2021-01-26 19:49:34",
        "deletedAt": null,
        "notificatedUserId": "4a547c10-5a01-11eb-81c9-db493a825d51",
        "senderId": "85a04d20-5179-11eb-8d8b-b5b574d0e39e",
        "reviewId": 94,
        "communityId": null,
        "reviewCommentId": 277,
        "communityCommentId": null,
        "senders": {
            "id": "85a04d20-5179-11eb-8d8b-b5b574d0e39e",
            "nickname": "jiwon1121",
            "profileImg": ""
        }
    },
]
