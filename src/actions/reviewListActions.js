const setMainReviewList = (reviewList) => {
  return {
    type: 'SET_MAIN_REVIEW_LIST',
    payload: reviewList,
  };
};

const toggleReviewLike = (reviewId) => {
  return {
    type: 'TOGGLE_REVIEW_LIKE',
    payload: reviewId,
  };
};

const toggleReviewScrap = (reviewId) => {
  return {
    type: 'TOGGLE_REVIEW_SCRAP',
    payload: reviewId,
  };
};

const setMyReviews = (reviewList) => {
  return {
    type: 'SET_MY_REVIEWS',
    payload: reviewList,
  };
};

const setOpponentReviews = (reviewList) => {
  return {
    type: 'SET_OPPONENT_REVIEWS',
    payload: reviewList,
  };
};

const setLikedReviews = (reviewList) => {
  return {
    type: 'SET_LIKED_REVIEWS',
    payload: reviewList,
  };
};

const setScrapedReviews = (reviewList) => {
  return {
    type: 'SET_SCRAPED_REVIEWS',
    payload: reviewList,
  };
};

const setCommentedReviews = (reviewList) => {
  return {
    type: 'SET_COMMENTED_REVIEWS',
    payload: reviewList,
  };
};

const setSearchResultReviews = (reviewList) => {
  return {
    type: 'SET_SEARCHRESULT_REVIEWS',
    payload: reviewList,
  };
};

const deleteReview = (reviewId) => {
  return {
    type: 'DELETE_REVIEW',
    payload: reviewId,
  }
}

const setDentalReviewArray = (reviewArray) => {
  return {
    type: 'SET_DENTAL_REVIEW_ARRAY',
    payload: reviewArray,
  }
}

export default {
  setMainReviewList,
  setOpponentReviews,
  toggleReviewLike,
  toggleReviewScrap,
  setMyReviews,
  setLikedReviews,
  setScrapedReviews,
  setCommentedReviews,
  setSearchResultReviews,
  deleteReview,
  setDentalReviewArray,
};
