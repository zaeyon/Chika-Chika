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

const setCurrentLocation = (currentLocation) => {
  return {
    type: 'SET_CURRENT_LOCATION',
    payload: currentLocation,
  };
};

const setHometown = (hometown) => {
  return {
    type: "SET_HOMETOWN",
    payload: hometown,
  }
}

const changeMainHometown = (index) => {
  return {
    type: "CHANGE_MAIN_HOMETOWN",
    payload: index,
  }
}

const addHometown = (hometownItem) => {
  return {
    type: "ADD_HOMETOWN",
    payload: hometownItem,
  }
}

const deleteHometown = (hometownId) => {
  return {
    type: "DELETE_HOMETOWN",
    payload: hometownId,
  }
}

const setSearchRecord = (searchRecordArray) => {
  return {
    type: "SET_SEARCH_RECORD",
    payload: searchRecordArray,
  }
}

export default {
  setUser,
  logOut,
  setFcmToken,
  putProfileImage,
  putProfileNickname,
  putProfileGender,
  putProfileBirthdate,
  setCurrentLocation,
  setHometown,
  addHometown,
  deleteHometown,
  changeMainHometown,
  setSearchRecord,
};
