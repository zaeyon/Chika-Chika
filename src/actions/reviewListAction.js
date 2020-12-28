const setMainReviewList = (reviewList) => {
    return {
        type: "SET_MAIN_REVIEW_LIST",
        payload: reviewList,
    }
} 

export default {
    setMainReviewList,
}