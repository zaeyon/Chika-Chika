const setUser = (userObj) => {
  return {
    type: 'SET_USER',
    payload: userObj,
  };
};

const setFcmToken = (fcmToken) => {
  return {
    type: 'SET_FCMTOKEN',
    payload: fcmToken,
  };
};

const logOut = () => {
  return {
    type: 'LOG_OUT',
  };
};

const putProfileImage = (profileImage) => {
  return {
    type: 'PUT_PROFILE_IMG',
    payload: profileImage,
  };
};

const putProfileNickname = (nickname) => {
  return {
    type: 'PUT_PROFILE_NICKNAME',
    payload: nickname,
  };
};

const putProfileGender = (gender) => {
  return {
    type: 'PUT_PROFILE_GENDER',
    payload: gender,
  };
};

const putProfileBirthdate = (birthdate) => {
  return {
    type: 'PUT_PROFILE_BIRTHDATE',
    payload: birthdate,
  };
};

const setCurrentUserLocation = (currentUserLocation) => {
  return {
    type: 'SET_CURRENT_USER_LOCATION',
    payload: currentUserLocation,
  };
};

const setHometown = (hometown) => {
  return {
    type: 'SET_HOMETOWN',
    payload: hometown,
  };
};

const changeMainHometown = (index) => {
  return {
    type: 'CHANGE_MAIN_HOMETOWN',
    payload: index,
  };
};

const addHometown = (hometownItem) => {
  return {
    type: 'ADD_HOMETOWN',
    payload: hometownItem,
  };
};

const deleteHometown = (hometownId) => {
  return {
    type: 'DELETE_HOMETOWN',
    payload: hometownId,
  };
};

const setSearchRecord = (searchRecordArray) => {
  return {
    type: 'SET_SEARCH_RECORD',
    payload: searchRecordArray,
  };
};

const deleteSearchRecord = (searchRecordId) => {
  return {
    type: 'DELETE_SEARCH_RECORD',
    payload: searchRecordId,
  };
};

const setDentalSearchRecord = (dentalSearchRecordArray) => {
  return {
    type: 'SET_DENTAL_SEARCH_RECORD',
    payload: dentalSearchRecordArray,
  };
};

const deleteDentalSearchRecord = (dentalSearchRecordId) => {
  return {
    type: 'DELETE_DENTAL_SEARCH_RECORD',
    payload: dentalSearchRecordId,
  };
};

const setNotification = (notificationConfig) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: notificationConfig,
  };
};

const setNotificationArray = (notificationArray) => {
  return {
    type: 'SET_NOTIFICATION_ARRAY',
    payload: notificationArray,
  }
}


const setReservations = (reservations) => {
  return {
    type: 'SET_RESERVATIONS',
    payload: reservations,
  };
};

const deleteReservation = (id) => {
  return {
    type: 'DELETE_RESERVATION',
    payload: id,
  };
};

const setSavedHospitals = (hospitals) => {
  return {
    type: 'SET_SAVED_HOSPITALS',
    payload: hospitals,
  };
};

const deleteSavedHospital = (id) => {
  return {
    type: 'DELETE_SAVED_HOSPITAL',
    payload: id,
  };
};
export default {
  setUser,
  logOut,
  setFcmToken,
  putProfileImage,
  putProfileNickname,
  putProfileGender,
  putProfileBirthdate,
  setCurrentUserLocation,
  setHometown,
  addHometown,
  deleteHometown,
  changeMainHometown,
  setSearchRecord,
  deleteSearchRecord,
  setNotification,
  setDentalSearchRecord,
  deleteDentalSearchRecord,
  setNotificationArray,
  setReservations,
  deleteReservation,
  setSavedHospitals,
  deleteSavedHospital,
};
