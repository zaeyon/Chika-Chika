const reviewList = (state = { mainReviewList: [] }, action) => {
    switch(action.type) {
        case "SET_MAIN_REVIEW_LIST":
            return {
                ...state,
                mainReviewList: action.payload,
            }
        default:
            return state
    }
}

export default reviewList;