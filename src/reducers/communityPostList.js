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
    default:
      return state;
  }
};

export default communityPostList;
