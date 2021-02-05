const dentalFilter = (state = {
    dayList: DAY_LIST,
    selectedDayList: [],
    dayFilter: [],
    timeFilter: "",
    holidayFilter: false,
    parkingFilter: "n",
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