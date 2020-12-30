const setMainReviewList = (reviewList) => {
    return {
        type: "SET_MAIN_REVIEW_LIST",
        payload: reviewList,
    }
} 

const toggleReviewLike = (reviewId) => {
    return {
        type: "TOGGLE_REVIEW_LIKE",
        payload: reviewId,
    }
}

const toggleReviewScrap = (reviewId) => {
    return {
        type: "TOGGLE_REVIEW_SCRAP",
        payload: reviewId,
    }
}

export default {
    setMainReviewList,
    toggleReviewLike,
    toggleReviewScrap,
}