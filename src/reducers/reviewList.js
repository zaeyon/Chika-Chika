const reviewList = (state = { mainReviewList: [] }, action) => {
    switch(action.type) {
        case "SET_MAIN_REVIEW_LIST":
            return {
                ...state,
                mainReviewList: action.payload,
            }
        case "TOGGLE_REVIEW_LIKE":
            {
                let tmpReviewList = state.mainReviewList

                const targetIndex = tmpReviewList.findIndex((item, index) => {
                    return (item.id == action.payload)
                })

                if(targetIndex !== -1) {
                    const liked = (tmpReviewList[targetIndex].viewerLikedReview == 1) ? true : false
                    tmpReviewList[targetIndex].viewerLikedReview = liked ? 0 : 1
                    tmpReviewList[targetIndex].reviewLikeNum = liked ? (tmpReviewList[targetIndex].reviewLikeNum - 1) : (tmpReviewList[targetIndex].reviewLikeNum + 1);
                }

                return {
                    ...state,
                    mainReviewList: tmpReviewList,
                }
            }
        case "TOGGLE_REVIEW_SCRAP":
            {
                let tmpReviewList = state.mainReviewList

                const targetIndex = tmpReviewList.findIndex((item, index) => {
                    return (item.id == action.payload)
                })

                if(targetIndex !== -1) {
                    const scraped = (tmpReviewList[targetIndex].viewerScrapedReview == 1) ? true : false
                    tmpReviewList[targetIndex].viewerScrapedReview = scraped ? 0 : 1
                }

                return {
                    ...state,
                    mainReviewList: tmpReviewList,
                }

            }
        default:
            return state
    }
}

export default reviewList;