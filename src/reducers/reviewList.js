const reviewList = (
  state = {
    mainReviewList: [],
    MyReviews: [],
    LikedReviews: [],
    ScrapedReviews: [],
    CommentedReviews: [],
  },
  action,
) => {
  switch (action.type) {
    case 'SET_MAIN_REVIEW_LIST':
      return {
        ...state,
        mainReviewList: action.payload,
      };
    case 'TOGGLE_REVIEW_LIKE': {
      let tmpReviewList = state.mainReviewList;
      const tmpMyReviews = state.MyReviews.concat();
      const tmpLikedReviews = state.LikedReviews.concat();
      const tmpScrapedReviews = state.ScrapedReviews.concat();
      const tmpCommentedReviews = state.CommentedReviews.concat();

      const targetReviewIndex = tmpReviewList.findIndex((item, index) => {
        return item.id == action.payload;
      });

      const targetMyReviewIndex = tmpMyReviews.findIndex((item, index) => {
        return item.id === action.payload;
      });

      const targetLikedReviewIndex = tmpLikedReviews.findIndex(
        (item, index) => {
          return item.id === action.payload;
        },
      );

      const targetScrapedReviewIndex = tmpScrapedReviews.findIndex(
        (item, index) => {
          return item.id === action.payload;
        },
      );

      const targetCommentedReviewIndex = tmpCommentedReviews.findIndex(
        (item, index) => {
          return item.id === action.payload;
        },
      );

      if (targetReviewIndex !== -1) {
        const liked =
          tmpReviewList[targetReviewIndex].viewerLikedReview == 1
            ? true
            : false;
        tmpReviewList[targetReviewIndex].viewerLikedReview = liked ? 0 : 1;
        tmpReviewList[targetReviewIndex].reviewLikeNum = liked
          ? tmpReviewList[targetReviewIndex].reviewLikeNum - 1
          : tmpReviewList[targetReviewIndex].reviewLikeNum + 1;
      }

      if (targetMyReviewIndex !== -1) {
        const liked =
          tmpMyReviews[targetMyReviewIndex].viewerLikedReview == 1
            ? true
            : false;
        tmpMyReviews[targetMyReviewIndex].viewerLikedReview = liked ? 0 : 1;
        tmpMyReviews[targetMyReviewIndex].reviewLikeNum = liked
          ? tmpMyReviews[targetMyReviewIndex].reviewLikeNum - 1
          : tmpMyReviews[targetMyReviewIndex].reviewLikeNum + 1;
      }

      if (targetLikedReviewIndex >= 0) {
        tmpLikedReviews.splice(targetLikedReviewIndex, 1, {
          ...state.LikedReviews[targetLikedReviewIndex],
          viewerLikedReview: !state.LikedReviews[targetLikedReviewIndex]
            .viewerLikedReview,
          reviewLikeNum:
            state.LikedReviews[targetLikedReviewIndex].reviewLikeNum +
            (state.LikedReviews[targetLikedReviewIndex].viewerLikedReview
              ? -1
              : 1),
        });
      }
      if (targetScrapedReviewIndex >= 0) {
        tmpScrapedReviews.splice(targetScrapedReviewIndex, 1, {
          ...state.ScrapedReviews[targetScrapedReviewIndex],
          viewerLikedReview: !state.ScrapedReviews[targetScrapedReviewIndex]
            .viewerLikedReview,
          reviewLikeNum:
            state.ScrapedReviews[targetScrapedReviewIndex].reviewLikeNum +
            (state.ScrapedReviews[targetScrapedReviewIndex].viewerLikedReview
              ? -1
              : 1),
        });
      }
      if (targetCommentedReviewIndex >= 0) {
        tmpCommentedReviews.splice(targetCommentedReviewIndex, 1, {
          ...state.CommentedReviews[targetCommentedReviewIndex],
          viewerLikedReview: !state.CommentedReviews[targetCommentedReviewIndex]
            .viewerLikedReview,
          reviewLikeNum:
            state.CommentedReviews[targetCommentedReviewIndex].reviewLikeNum +
            (state.CommentedReviews[targetCommentedReviewIndex]
              .viewerLikedReview
              ? -1
              : 1),
        });
      }

      return {
        ...state,
        mainReviewList: tmpReviewList,
        MyReviews: tmpMyReviews,
        LikedReviews: tmpLikedReviews,
        ScrapedReviews: tmpScrapedReviews,
        CommentedReviews: tmpCommentedReviews,
      };
    }
    case 'TOGGLE_REVIEW_SCRAP': {
      let tmpReviewList = state.mainReviewList;
      const tmpMyReviews = state.MyReviews.concat();
      const tmpLikedReviews = state.LikedReviews.concat();
      const tmpScrapedReviews = state.ScrapedReviews.concat();
      const tmpCommentedReviews = state.CommentedReviews.concat();

      const targetIndex = tmpReviewList.findIndex((item, index) => {
        return item.id == action.payload;
      });

      const targetMyReviewIndex = tmpMyReviews.findIndex((item, index) => {
        return item.id === action.payload;
      });

      const targetLikedReviewIndex = tmpLikedReviews.findIndex(
        (item, index) => {
          return item.id === action.payload;
        },
      );

      const targetScrapedReviewIndex = tmpScrapedReviews.findIndex(
        (item, index) => {
          return item.id === action.payload;
        },
      );

      const targetCommentedReviewIndex = tmpCommentedReviews.findIndex(
        (item, index) => {
          return item.id === action.payload;
        },
      );

      if (targetIndex !== -1) {
        const scraped =
          tmpReviewList[targetIndex].viewerScrapedReview == 1 ? true : false;
        tmpReviewList[targetIndex].viewerScrapedReview = scraped ? 0 : 1;
      }

      if (targetMyReviewIndex >= 0) {
        tmpMyReviews.splice(targetMyReviewIndex, 1, {
          ...state.MyReviews[targetMyReviewIndex],
          viewerScrapedReview: !state.MyReviews[targetMyReviewIndex]
            .viewerScrapedReview,
        });
      }
      if (targetLikedReviewIndex >= 0) {
        tmpLikedReviews.splice(targetLikedReviewIndex, 1, {
          ...state.LikedReviews[targetLikedReviewIndex],
          viewerScrapedReview: !state.LikedReviews[targetLikedReviewIndex]
            .viewerScrapedReview,
        });
      }
      if (targetScrapedReviewIndex >= 0) {
        tmpScrapedReviews.splice(targetScrapedReviewIndex, 1, {
          ...state.ScrapedReviews[targetScrapedReviewIndex],
          viewerScrapedReview: !state.ScrapedReviews[targetScrapedReviewIndex]
            .viewerScrapedReview,
        });
      }
      if (targetCommentedReviewIndex >= 0) {
        tmpCommentedReviews.splice(targetCommentedReviewIndex, 1, {
          ...state.CommentedReviews[targetCommentedReviewIndex],
          viewerScrapedReview: !state.CommentedReviews[
            targetCommentedReviewIndex
          ].viewerScrapedReview,
        });
      }

      return {
        ...state,
        mainReviewList: tmpReviewList,

        MyReviews: tmpMyReviews,
        LikedReviews: tmpLikedReviews,
        ScrapedReviews: tmpScrapedReviews,
        CommentedReviews: tmpCommentedReviews,
      };
    }
    case 'SET_MY_REVIEWS':
      return {
        ...state,
        MyReviews: action.payload,
      };
    case 'SET_LIKED_REVIEWS':
      return {
        ...state,
        LikedReviews: action.payload,
      };
    case 'SET_SCRAPED_REVIEWS':
      return {
        ...state,
        ScrapedReviews: action.payload,
      };
    case 'SET_COMMENTED_REVIEWS':
      return {
        ...state,
        CommentedReviews: action.payload,
      };
    default:
      return state;
  }
};

export default reviewList;
