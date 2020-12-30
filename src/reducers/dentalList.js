const TEST_NEAR_DENTAL_DATA = [
    {
        index: 1,
        name: "연세웃는아이치과의원",
        rating: 3.1,
        reviewCount: 3,
        isOpen: true,
        isLauchTime: true,
        address: "경기 안양시 동안구 경수대로 428",
        lunchTime: "12:30~13:20",
        openTime: "12:30~12:30",
        geographLat: 37.29440,
        geographLong: 127.04547,
    },
    {
        index: 2,
        name: "오케이치과의원",
        rating: 3.5,
        reviewCount: 12,
        isOpen: false,
        isLauchTime: true,
        address: "경기도 의왕시 오전동 206",
        lunchTime: "12:30~13:20",
        openTime: "12:30~12:30",
        geographLat: 37.29404,
        geographLong: 127.04458,
    },
    {
        index: 3,
        name: "굿모닝치과의원",
        rating: 4,
        reviewCount: 20,
        isOpen: false,
        isLauchTime: false,
        address: "경기도 의왕시 모락로 16",
        lunchTime: "12:30~13:20",
        openTime: "12:30~12:30",
        geographLat: 37.29370,
        geographLong: 127.04638,
    },
]

const dentalList = (state = { nearDentalList: TEST_NEAR_DENTAL_DATA }, action) => {
    switch(action.type) {
        case "SET_NEAR_DENTAL_LIST":
            return {
                ...state,
                nearDentalList: action.payload,
            }
        default:
            return state
    }
}

export default dentalList;