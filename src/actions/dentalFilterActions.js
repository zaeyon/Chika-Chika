const setDayList = (dayList) => {
    return {
        type: 'SET_DAY_LIST',
        payload: dayList,
    }
}

const setSelectedDayList = (selectedDayList) => {
    return {
        type: 'SET_SELECTED_DAY_LIST',
        payload: selectedDayList,
    }
}

const setDayFilter = (dayFilter) => {
    return {
        type: 'SET_DAY_FILTER',
        payload: dayFilter
    }
}

const selectDayItem = (index) => {
    return {
        type: 'SELECT_DAY_ITEM',
        payload: index,
    }
}

const initializeDayList = () => {
    return {
        type: 'INITIALIZE_DAY_LIST',
    }
}

const setTimeFilter = (timeFilter) => {
    return {
        type: 'SET_TIME_FILTER',
        payload: timeFilter,
    }
}

const setHolidayFilter = (holidayFilter) => {
    return {
        type: 'SET_HOLIDAY_FILTER',
        payload: holidayFilter,
    }
}

const setParkingFilter = (parkingFilter) => {
    return {
        type: 'SET_PARKING_FILTER',
        payload: parkingFilter,
    }
}

const setNightCareFilter = (nightCareFilter) => {
    return {
        type: "SET_NIGHT_CARE_FILTER",
        payload: nightCareFilter,
    }
}

const setSpecialistFilter = (specialistFilter) => {
    return {
        type: "SET_SPECIALIST_FILTER",
        payload: specialistFilter,
    }
}

const setGoodDentalFilter = (goodDentalFilter) => {
    return {
        type: "SET_GOOD_DENTAL_FILTER",
        payload: goodDentalFilter,
    }
}

const setHomeDentalFilter = (homeDentalFilter) => {
    return {
        type: "SET_HOME_DENTAL_FILTER", 
        payload: homeDentalFilter,
    }
}

export default {
    setDayList,
    setSelectedDayList,
    setDayFilter,
    selectDayItem,
    setTimeFilter,
    setHolidayFilter,
    setParkingFilter,
    initializeDayList,
    setNightCareFilter,
    setSpecialistFilter,
    setGoodDentalFilter,
    setHomeDentalFilter,
}