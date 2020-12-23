const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const setFcmToken = (fcmToken) => {
    return {
        type: "SET_FCMTOKEN",
        payload: fcmToken,
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    setUser,
    logOut,
    setFcmToken,
}