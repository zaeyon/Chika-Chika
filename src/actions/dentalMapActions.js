const setNearDentalArray = (nearDentalArray) => {
    return {
        type: "SET_NEAR_DENTAL_ARRAY",
        payload: nearDentalArray,
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

const setSearchedDentalArray = (searchedDentalArray) => {
    return {
        type: "SET_SEARCHED_DENTAL_ARRAY",
        payload: searchedDentalArray,
    }
}

const addSearchedDentalArray = (newSearchedDentalArray) => {
    return {
        type: 'ADD_SEARCHED_DENTAL_ARRAY',
        payload: newSearchedDentalArray,
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
    setNearDentalArray,
    setMapLocation,
    setSearchedKeyword,
    setSearchedDentalArray,
    setAutoCompletedKeywordArr,
    setLoadingGetDental,
    addSearchedDentalArray,
}