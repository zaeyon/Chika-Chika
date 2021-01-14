const setNearDentalList = (nearDentalList) => {
    return {
        type: "SET_NEAR_DENTAL_LIST",
        payload: nearDentalList,
    }
}

const setMapLocation = (mapLocation) => {
    return {
        type: "SET_MAP_LOCATION",
        payload: mapLocation,
    }
}

const setSearchedKeyword = (searchedKeyword) => {
    return {
        type: "SET_SEARCHED_KEYWORD",
        payload: searchedKeyword,
    }
}

const setSearchedDentalArr = (searchedDentalArr) => {
    return {
        type: "SET_SEARCHED_DENTAL_ARR",
        payload: searchedDentalArr,
    }
}

const setAutoCompletedKeywordArr = (autoCompletedKeywordArr) => {
    return {
        type: "SET_AUTO_COMPLETED_KEYWORD_ARR",
        payload: autoCompletedKeywordArr,
    }
}

const setLoadingGetDental = (loadingGetDental) => {
    return {
        type: "SET_LOADING_GET_DENTAL",
        payload: loadingGetDental,
    }
}

export default {
    setNearDentalList,
    setMapLocation,
    setSearchedKeyword,
    setSearchedDentalArr,
    setAutoCompletedKeywordArr,
    setLoadingGetDental,
}