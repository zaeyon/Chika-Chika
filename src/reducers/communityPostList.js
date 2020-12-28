const communityPostList = (
  state = {
    HomePosts: [],
    QuestionPosts: [],
    FreeTalkPosts: [],
  },
  action,
) => {
  const newHomePosts = state.HomePosts.concat();
  const newQuestionPosts = state.QuestionPosts.concat();
  const newFreeTalkPosts = state.FreeTalkPosts.concat();
  switch (action.type) {
    case 'CREATE_POST':
      switch (action.payload.type) {
        case 'Question':
          return {
            ...state,
            HomePosts: [action.payload.data, ...newHomePosts],
            QuestionPosts: [action.payload.data, ...newQuestionPosts],
          };
        case 'FreeTalk':
          return {
            ...state,
            HomePosts: [action.payload.data, ...newHomePosts],
            FreeTalkPosts: [action.payload.data, ...newFreeTalkPosts],
          };
      }
    case 'EDIT_POST':
      const editTargetHomePostIndex = state.HomePosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetQuestionPostIndex = state.QuestionPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetFreeTalkPostIndex = state.FreeTalkPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      console.log(editTargetHomePostIndex);
      console.log(editTargetQuestionPostIndex);
      console.log(editTargetFreeTalkPostIndex);
      console.log(action.payload.data);
      if (editTargetHomePostIndex >= 0) {
        newHomePosts.splice(editTargetHomePostIndex, 1, action.payload.data);
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
        HomePosts: newHomePosts,
        QuestionPosts: newQuestionPosts,
        FreeTalkPosts: newFreeTalkPosts,
      };
    case 'DELETE_POST':
      const deleteTargetHomePostIndex = state.HomePosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetQuestionPostIndex = state.QuestionPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetFreeTalkPostIndex = state.FreeTalkPosts.findIndex(
        (item) => item.id === action.payload,
      );
      console.log('delete', deleteTargetHomePostIndex);
      if (deleteTargetHomePostIndex >= 0) {
        newHomePosts.splice(deleteTargetHomePostIndex, 1);
      }
      if (deleteTargetQuestionPostIndex >= 0) {
        newQuestionPosts.splice(deleteTargetQuestionPostIndex, 1);
      }
      if (deleteTargetFreeTalkPostIndex >= 0) {
        newFreeTalkPosts.splice(deleteTargetFreeTalkPostIndex, 1);
      }

      return {
        HomePosts: newHomePosts,
        QuestionPosts: newQuestionPosts,
        FreeTalkPosts: newFreeTalkPosts,
      };

    case 'SET_POSTS':
      switch (action.payload.type) {
        case 'All':
          return {
            ...state,
            HomePosts: action.payload.posts,
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
      }

    case 'TOGGLE_LIKE':
      switch (action.payload.type) {
        case 'Question':
          console.log(action.payload.id);
          const toggleLikeQuestionIndex = state.QuestionPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
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
          console.log(newQuestionPosts);
          return {
            ...state,
            QuestionPosts: newQuestionPosts,
          };
        case 'FreeTalk':
          console.log(action.payload.id);
          const toggleLikeFreeTalkIndex = state.FreeTalkPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
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
          return {
            ...state,
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
