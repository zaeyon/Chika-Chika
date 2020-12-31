const communityPostList = (
  state = {
    MyPosts: [],
    QuestionPosts: [],
    FreeTalkPosts: [],
    LikedCommunityPosts: [],
    LikedReviews: [],
  },
  action,
) => {
  const newMyPosts = state.MyPosts.concat();
  const newQuestionPosts = state.QuestionPosts.concat();
  const newFreeTalkPosts = state.FreeTalkPosts.concat();
  const newLikedCommunityPosts = state.LikedCommunityPosts.concat();

  switch (action.type) {
    case 'CREATE_POST':
      switch (action.payload.type) {
        case 'Question':
          return {
            ...state,
            MyPosts: [action.payload.data, ...newMyPosts],
            QuestionPosts: [action.payload.data, ...newQuestionPosts],
          };
        case 'FreeTalk':
          return {
            ...state,
            MyPosts: [action.payload.data, ...newMyPosts],
            FreeTalkPosts: [action.payload.data, ...newFreeTalkPosts],
          };
      }
    case 'EDIT_POST':
      const editTargetMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetQuestionPostIndex = state.QuestionPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetFreeTalkPostIndex = state.FreeTalkPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      console.log(action.payload.data);
      if (editTargetMyPostIndex >= 0) {
        newMyPosts.splice(editTargetMyPostIndex, 1, action.payload.data);
      }
      if (editTargetQuestionPostIndex >= 0) {
        newQuestionPosts.splice(
          editTargetQuestionPostIndex,
          1,
          action.payload.data,
        );
      }
      if (editTargetFreeTalkPostIndex >= 0) {
        newFreeTalkPosts.splice(
          editTargetFreeTalkPostIndex,
          1,
          action.payload.data,
        );
      }
      return {
        ...state,
        MyPosts: newMyPosts,
        QuestionPosts: newQuestionPosts,
        FreeTalkPosts: newFreeTalkPosts,
      };
    case 'DELETE_POST':
      const deleteTargetMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetQuestionPostIndex = state.QuestionPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetFreeTalkPostIndex = state.FreeTalkPosts.findIndex(
        (item) => item.id === action.payload,
      );
      console.log('delete', deleteTargetMyPostIndex);
      if (deleteTargetMyPostIndex >= 0) {
        newMyPosts.splice(deleteTargetMyPostIndex, 1);
      }
      if (deleteTargetQuestionPostIndex >= 0) {
        newQuestionPosts.splice(deleteTargetQuestionPostIndex, 1);
      }
      if (deleteTargetFreeTalkPostIndex >= 0) {
        newFreeTalkPosts.splice(deleteTargetFreeTalkPostIndex, 1);
      }

      return {
        ...state,
        MyPosts: newMyPosts,
        QuestionPosts: newQuestionPosts,
        FreeTalkPosts: newFreeTalkPosts,
      };

    case 'SET_POSTS':
      switch (action.payload.type) {
        case 'All':
          return {
            ...state,
            MyPosts: action.payload.posts,
          };
        case 'Question':
          return {
            ...state,
            QuestionPosts: action.payload.posts,
          };
        case 'FreeTalk':
          return {
            ...state,
            FreeTalkPosts: action.payload.posts,
          };
        case 'Community':
          return {
            ...state,
            LikedCommunityPosts: action.payload.posts,
          };
      }

    case 'TOGGLE_LIKE':
      const toggleLikeMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleLikeLikedCommunityPostIndex = state.LikedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (toggleLikeMyPostIndex >= 0) {
        newMyPosts.splice(toggleLikeMyPostIndex, 1, {
          ...state.MyPosts[toggleLikeMyPostIndex],
          viewerLikeCommunityPost: !state.MyPosts[toggleLikeMyPostIndex]
            .viewerLikeCommunityPost,
          postLikeNum:
            state.MyPosts[toggleLikeMyPostIndex].postLikeNum +
            (state.MyPosts[toggleLikeMyPostIndex].viewerLikeCommunityPost
              ? -1
              : 1),
        });
      }
      if (toggleLikeLikedCommunityPostIndex >= 0) {
        newLikedCommunityPosts.splice(toggleLikeLikedCommunityPostIndex, 1, {
          ...state.LikedCommunityPosts[toggleLikeLikedCommunityPostIndex],
          viewerLikeCommunityPost: !state.LikedCommunityPosts[
            toggleLikeLikedCommunityPostIndex
          ].viewerLikeCommunityPost,
          postLikeNum:
            state.LikedCommunityPosts[toggleLikeLikedCommunityPostIndex]
              .postLikeNum +
            (state.LikedCommunityPosts[toggleLikeLikedCommunityPostIndex]
              .viewerLikeCommunityPost
              ? -1
              : 1),
        });
      }
      switch (action.payload.type) {
        case 'Question':
          console.log(action.payload.id);
          const toggleLikeQuestionIndex = state.QuestionPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (toggleLikeQuestionIndex >= 0) {
            newQuestionPosts.splice(toggleLikeQuestionIndex, 1, {
              ...state.QuestionPosts[toggleLikeQuestionIndex],
              viewerLikeCommunityPost: !state.QuestionPosts[
                toggleLikeQuestionIndex
              ].viewerLikeCommunityPost,
              postLikeNum:
                state.QuestionPosts[toggleLikeQuestionIndex].postLikeNum +
                (state.QuestionPosts[toggleLikeQuestionIndex]
                  .viewerLikeCommunityPost
                  ? -1
                  : 1),
            });
          }
          return {
            ...state,
            LikedCommunityPosts: newLikedCommunityPosts,
            MyPosts: newMyPosts,
            QuestionPosts: newQuestionPosts,
          };
        case 'FreeTalk':
          console.log(action.payload.id);
          const toggleLikeFreeTalkIndex = state.FreeTalkPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (toggleLikeFreeTalkIndex >= 0) {
            newFreeTalkPosts.splice(toggleLikeFreeTalkIndex, 1, {
              ...state.FreeTalkPosts[toggleLikeFreeTalkIndex],
              viewerLikeCommunityPost: !state.FreeTalkPosts[
                toggleLikeFreeTalkIndex
              ].viewerLikeCommunityPost,
              postLikeNum:
                state.FreeTalkPosts[toggleLikeFreeTalkIndex].postLikeNum +
                (state.FreeTalkPosts[toggleLikeFreeTalkIndex]
                  .viewerLikeCommunityPost
                  ? -1
                  : 1),
            });
          }
          return {
            ...state,
            LikedCommunityPosts: newLikedCommunityPosts,
            MyPosts: newMyPosts,
            FreeTalkPosts: newFreeTalkPosts,
          };
      }
    case 'CREATE_COMMENT':
      switch (action.payload.type) {
        case 'Question':
          const createCommentQuestionIndex = state.QuestionPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
          newQuestionPosts.splice(createCommentQuestionIndex, 1, {
            ...state.QuestionPosts[createCommentQuestionIndex],
            postCommentsNum:
              state.QuestionPosts[createCommentQuestionIndex].postCommentsNum +
              1,
          });
          return {
            ...state,
            QuestionPosts: newQuestionPosts,
          };
        case 'FreeTalk':
          const createCommentFreeTalkIndex = state.FreeTalkPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
          newFreeTalkPosts.splice(createCommentFreeTalkIndex, 1, {
            ...state.FreeTalkPosts[createCommentFreeTalkIndex],
            postCommentsNum:
              state.FreeTalkPosts[createCommentFreeTalkIndex].postCommentsNum +
              1,
          });
          return {
            ...state,
            FreeTalkPosts: newFreeTalkPosts,
          };
      }
    case 'REFRESH_DETAIL':
      switch (action.payload.type) {
        case 'Question':

        case 'FreeTalk':
      }
    default:
      return state;
  }
};

export default communityPostList;
