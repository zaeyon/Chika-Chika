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

export default {
    setDayList,
    setSelectedDayList,
    setDayFilter,
    selectDayItem,
    setTimeFilter,
    setHolidayFilter,
    setParkingFilter,
}