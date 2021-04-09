const dentalFilter = (state = {
    dayList: DAY_LIST,
    selectedDayList: [],
    dayFilter: [],
    timeFilter: "",
    holidayFilter: false,
    parkingFilter: "n",
    nightCareFilter: 'f',
    specialistFilter: "f",
    goodDentalFilter: "f",
    homeDentalFilterType: "",
}, action) => {
    switch(action.type) {
        case "SET_DAY_LIST":
            return {
                ...state,
                dayList: action.payload,
            }
        case "SELECT_DAY_ITEM":
            {
                let tmpDayList = state.dayList;
                tmpDayList[action.payload].selected = !tmpDayList[action.payload].selected;

                return {
                    ...state,
                    dayList: tmpDayList
                }

            }
        case "INITIALIZE_DAY_LIST":
            {
                let tmpDayList = state.dayList;
                const initializedDayList = tmpDayList.map((item, index) => {
                    item.selected = false

                    return item
                })

                return {
                    ...state,
                    dayList: initializedDayList,
                }
            }
        case "SET_SELECTED_DAY_LIST":
            return {
                ...state,
                selectedDayList: action.payload,
            }
        case "SET_DAY_FILTER":
            return {
                ...state,
                dayFilter: action.payload,
            }
        case "SET_TIME_FILTER":
            return {
                ...state,
                timeFilter: action.payload,
            }
        case "SET_HOLIDAY_FILTER":
            return {
                ...state,
                holidayFilter: action.payload,
            }
        case "SET_PARKING_FILTER":
            return {
                ...state,
                parkingFilter: action.payload,
            }
        case "SET_NIGHT_CARE_FILTER":
            return {
                ...state,
                nightCareFilter: action.payload,
            }
        case "SET_SPECIALIST_FILTER":
            return {
                ...state,
                specialistFilter: action.payload,
            }
        case "SET_GOOD_DENTAL_FILTER":
            return {
                ...state,
                goodDentalFilter: action.payload,
            }
        case "SET_HOME_DENTAL_FILTER": 
            {
                if(action.payload === "specialist") {
                    return {
                        ...state,
                        dayFilter: [],
                        timeFilter: "",
                        holidayFilter: false,
                        parkingFilter: "n",
                        nightCareFilter: 'f',
                        specialistFilter: "t",
                        goodDentalFilter: "f",
                        homeDentalFilterType: "specialist",
                    }
                } else if(action.payload === "goodDental") {
                    return {
                        ...state,
                        dayFilter: [],
                        timeFilter: "",
                        holidayFilter: false,
                        parkingFilter: "n",
                        nightCareFilter: 'f',
                        specialistFilter: "f",
                        goodDentalFilter: "t",
                        homeDentalFilterType: "goodDental",
                    }
                } else if(action.payload === "nightCare") {
                    return {
                        ...state,
                        dayFilter: [],
                        timeFilter: "",
                        holidayFilter: false,
                        parkingFilter: "n",
                        nightCareFilter: 't',
                        specialistFilter: "f",
                        goodDentalFilter: "f",
                        homeDentalFilterType: "nightCare",
                    }
                } else if(action.payload === 'open') {
                    const currentDate = new Date(Date.now());
                    const dayArray = ['sun', 'mon', 'tus', 'wed', 'thu', 'fri', 'sat'];
                    
                    const currentHour = currentDate.getHours();
                    if(currentHour < 10) currentHour = '0' + currentHour;
                    const currentMinute = currentDate.getMinutes();
                    if(currentMinute < 10) currentMinute = '0' + currentMinute;
                    
                    return {
                        ...state,
                        dayFilter: [dayArray[currentDate.getDay()]],
                        timeFilter: `${currentHour}:${currentMinute}`,
                        holidayFilter: false,
                        parkingFilter: "n",
                        nightCareFilter: "f",
                        specialistFilter: "f",
                        goodDentalFilter: "f",
                        homeDentalFilterType: "open",
                    }
                } else if(action.payload === " ") {
                    return {
                        ...state,
                        homeDentalFilterType: ""
                    }
                }
            }
        default:
            return state
    }
}

export default dentalFilter;


const DAY_LIST = [
    {
        day: "월",
        value: "mon", 
        selected: false
    },
    {
        day: "화",
        value: "tus",
        selected: false
    },
    {
        day: "수",
        value: "wed",
        selected: false
    },
    {
        day: "목",
        value: "thu",
        selected: false
    },
    {
        day: "금",
        value: "fri",
        selected: false
    },
    {
        day: "토",
        value: "sat",
        selected: false
    },
    {
        day: "일",
        value: "sun",
        selected: false
    },
    {
        day: "월요일",
        value: "null",
        selected: false
    },
    {
        day: "월요일",
        value: "null",
        selected: false
    },
    {
        day: "월요일",
        value: "null",
        selected: false
    }
]