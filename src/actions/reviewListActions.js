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

export default {
  setMainReviewList,
  toggleReviewLike,
  toggleReviewScrap,
  setMyReviews,
};
