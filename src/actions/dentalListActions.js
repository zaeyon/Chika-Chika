const setNearDentalList = (nearDentalList) => {
    return {
        type: "SET_NEAR_DENTAL_LIST",
        payload: nearDentalList,
    }
}

export default {
    setNearDentalList,
}