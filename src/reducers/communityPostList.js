const communityPostList = (
  state = {
    MyPosts: [],
    OpponentPosts: [],
    QuestionPosts: [],
    FreeTalkPosts: [],
    LikedCommunityPosts: [],
    ScrapedCommunityPosts: [],
    CommentedCommunityPosts: [],
  },
  action,
) => {
  const newMyPosts = state.MyPosts.concat();
  const newOpponentPosts = state.OpponentPosts.concat();
  const newQuestionPosts = state.QuestionPosts.concat();
  const newFreeTalkPosts = state.FreeTalkPosts.concat();
  const newLikedCommunityPosts = state.LikedCommunityPosts.concat();
  const newScrapedCommunityPosts = state.ScrapedCommunityPosts.concat();
  const newCommentedCommunityPosts = state.CommentedCommunityPosts.concat();

  switch (action.type) {
    case 'EDIT_POST':
      const editTargetMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetOpponentPostIndex = state.OpponentPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetLikedCommunityPostIndex = state.LikedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetScrapedCommunityPostIndex = state.ScrapedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const editTargetCommentedCommunityPostIndex = state.CommentedCommunityPosts.findIndex(
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
      if (editTargetOpponentPostIndex >= 0) {
        newOpponentPosts.splice(
          editTargetOpponentPostIndex,
          1,
          action.payload.data,
        );
      }
      if (editTargetLikedCommunityPostIndex >= 0) {
        newLikedCommunityPosts.splice(
          editTargetLikedCommunityPostIndex,
          1,
          action.payload.data,
        );
      }
      if (editTargetScrapedCommunityPostIndex >= 0) {
        newScrapedCommunityPosts.splice(
          editTargetScrapedCommunityPostIndex,
          1,
          action.payload.data,
        );
      }
      if (editTargetCommentedCommunityPostIndex >= 0) {
        newCommentedCommunityPosts.splice(
          editTargetCommentedCommunityPostIndex,
          1,
          action.payload.data,
        );
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
        OpponentPosts: newOpponentPosts,
        LikedCommunityPosts: newLikedCommunityPosts,
        ScrapedCommunityPosts: newScrapedCommunityPosts,
        CommentedCommunityPosts: newCommentedCommunityPosts,
        QuestionPosts: newQuestionPosts,
        FreeTalkPosts: newFreeTalkPosts,
      };
    case 'DELETE_POST':
      const deleteTargetMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetOpponentPostIndex = state.OpponentPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetLikedCommunityPostIndex = state.LikedCommunityPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetScrapedCommunityPostIndex = state.ScrapedCommunityPosts.findIndex(
        (item) => item.id === action.payload,
      );
      const deleteTargetCommentedCommunityPostIndex = state.CommentedCommunityPosts.findIndex(
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
      if (deleteTargetOpponentPostIndex >= 0) {
        newOpponentPosts.splice(deleteTargetOpponentPostIndex, 1);
      }
      if (deleteTargetLikedCommunityPostIndex >= 0) {
        newLikedCommunityPosts.splice(deleteTargetLikedCommunityPostIndex, 1);
      }
      if (deleteTargetScrapedCommunityPostIndex >= 0) {
        newScrapedCommunityPosts.splice(
          deleteTargetScrapedCommunityPostIndex,
          1,
        );
      }
      if (deleteTargetCommentedCommunityPostIndex >= 0) {
        newCommentedCommunityPosts.splice(
          deleteTargetCommentedCommunityPostIndex,
          1,
        );
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
        OpponentPosts: newOpponentPosts,
        LikedCommunityPosts: newLikedCommunityPosts,
        ScrapedCommunityPosts: newScrapedCommunityPosts,
        CommentedCommunityPosts: newCommentedCommunityPosts,
        QuestionPosts: newQuestionPosts,
        FreeTalkPosts: newFreeTalkPosts,
      };

    case 'SET_POSTS':
      switch (action.payload.type) {
        case 'My':
          return {
            ...state,
            MyPosts: action.payload.posts,
          };
        case 'Opponent':
          return {
            ...state,
            OpponentPosts: action.payload.posts,
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
        case 'Liked':
          return {
            ...state,
            LikedCommunityPosts: action.payload.posts,
          };
        case 'Scraped':
          return {
            ...state,
            ScrapedCommunityPosts: action.payload.posts,
          };
        case 'Commented':
          return {
            ...state,
            CommentedCommunityPosts: action.payload.posts,
          };
      }

    case 'TOGGLE_LIKE':
      const toggleLikeMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleLikeOpponentPostIndex = state.OpponentPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleLikeLikedCommunityPostIndex = state.LikedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleLikeScrapedCommunityPostIndex = state.ScrapedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleLikeCommentedCommunityPostIndex = state.CommentedCommunityPosts.findIndex(
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
      if (toggleLikeOpponentPostIndex >= 0) {
        newOpponentPosts.splice(toggleLikeOpponentPostIndex, 1, {
          ...state.OpponentPosts[toggleLikeOpponentPostIndex],
          viewerLikeCommunityPost: !state.OpponentPosts[
            toggleLikeOpponentPostIndex
          ].viewerLikeCommunityPost,
          postLikeNum:
            state.OpponentPosts[toggleLikeOpponentPostIndex].postLikeNum +
            (state.OpponentPosts[toggleLikeOpponentPostIndex]
              .viewerLikeCommunityPost
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
      if (toggleLikeScrapedCommunityPostIndex >= 0) {
        newScrapedCommunityPosts.splice(
          toggleLikeScrapedCommunityPostIndex,
          1,
          {
            ...state.ScrapedCommunityPosts[toggleLikeScrapedCommunityPostIndex],
            viewerLikeCommunityPost: !state.ScrapedCommunityPosts[
              toggleLikeScrapedCommunityPostIndex
            ].viewerLikeCommunityPost,
            postLikeNum:
              state.ScrapedCommunityPosts[toggleLikeScrapedCommunityPostIndex]
                .postLikeNum +
              (state.ScrapedCommunityPosts[toggleLikeScrapedCommunityPostIndex]
                .viewerLikeCommunityPost
                ? -1
                : 1),
          },
        );
      }
      if (toggleLikeCommentedCommunityPostIndex >= 0) {
        newCommentedCommunityPosts.splice(
          toggleLikeCommentedCommunityPostIndex,
          1,
          {
            ...state.CommentedCommunityPosts[
              toggleLikeCommentedCommunityPostIndex
            ],
            viewerLikeCommunityPost: !state.CommentedCommunityPosts[
              toggleLikeCommentedCommunityPostIndex
            ].viewerLikeCommunityPost,
            postLikeNum:
              state.CommentedCommunityPosts[
                toggleLikeCommentedCommunityPostIndex
              ].postLikeNum +
              (state.CommentedCommunityPosts[
                toggleLikeCommentedCommunityPostIndex
              ].viewerLikeCommunityPost
                ? -1
                : 1),
          },
        );
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
            ScrapedCommunityPosts: newScrapedCommunityPosts,
            CommentedCommunityPosts: newCommentedCommunityPosts,
            MyPosts: newMyPosts,
            OpponentPosts: newOpponentPosts,
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
            ScrapedCommunityPosts: newScrapedCommunityPosts,
            CommentedCommunityPosts: newCommentedCommunityPosts,
            MyPosts: newMyPosts,
            OpponentPosts: newOpponentPosts,
            FreeTalkPosts: newFreeTalkPosts,
          };
      }

    case 'TOGGLE_SCRAP':
      const toggleScrapMyPostIndex = state.MyPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleScrapOpponentPostIndex = state.OpponentPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleScrapLikedCommunityPostIndex = state.LikedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleScrapScrapedCommunityPostIndex = state.ScrapedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      const toggleScrapCommentedCommunityPostIndex = state.CommentedCommunityPosts.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (toggleScrapMyPostIndex >= 0) {
        newMyPosts.splice(toggleScrapMyPostIndex, 1, {
          ...state.MyPosts[toggleScrapMyPostIndex],
          viewerScrapCommunityPost: !state.MyPosts[toggleScrapMyPostIndex]
            .viewerScrapCommunityPost,
        });
      }
      if (toggleScrapOpponentPostIndex >= 0) {
        newOpponentPosts.splice(toggleScrapOpponentPostIndex, 1, {
          ...state.OpponentPosts[toggleScrapOpponentPostIndex],
          viewerScrapCommunityPost: !state.OpponentPosts[
            toggleScrapOpponentPostIndex
          ].viewerScrapCommunityPost,
        });
      }
      if (toggleScrapLikedCommunityPostIndex >= 0) {
        newLikedCommunityPosts.splice(toggleScrapLikedCommunityPostIndex, 1, {
          ...state.LikedCommunityPosts[toggleScrapLikedCommunityPostIndex],
          viewerScrapCommunityPost: !state.LikedCommunityPosts[
            toggleScrapLikedCommunityPostIndex
          ].viewerScrapCommunityPost,
        });
      }
      if (toggleScrapScrapedCommunityPostIndex >= 0) {
        console.log(toggleScrapScrapedCommunityPostIndex);
        newScrapedCommunityPosts.splice(
          toggleScrapScrapedCommunityPostIndex,
          1,
          {
            ...state.ScrapedCommunityPosts[
              toggleScrapScrapedCommunityPostIndex
            ],
            viewerScrapCommunityPost: !state.ScrapedCommunityPosts[
              toggleScrapScrapedCommunityPostIndex
            ].viewerScrapCommunityPost,
          },
        );
      }
      if (toggleScrapCommentedCommunityPostIndex >= 0) {
        newCommentedCommunityPosts.splice(
          toggleScrapCommentedCommunityPostIndex,
          1,
          {
            ...state.CommentedCommunityPosts[
              toggleScrapCommentedCommunityPostIndex
            ],
            viewerScrapCommunityPost: !state.CommentedCommunityPosts[
              toggleScrapCommentedCommunityPostIndex
            ].viewerScrapCommunityPost,
          },
        );
      }
      switch (action.payload.type) {
        case 'Question':
          console.log(action.payload.id);
          const toggleScrapQuestionIndex = state.QuestionPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (toggleScrapQuestionIndex >= 0) {
            newQuestionPosts.splice(toggleScrapQuestionIndex, 1, {
              ...state.QuestionPosts[toggleScrapQuestionIndex],
              viewerScrapCommunityPost: !state.QuestionPosts[
                toggleScrapQuestionIndex
              ].viewerScrapCommunityPost,
            });
          }
          return {
            ...state,
            LikedCommunityPosts: newLikedCommunityPosts,
            ScrapedCommunityPosts: newScrapedCommunityPosts,
            CommentedCommunityPosts: newCommentedCommunityPosts,
            MyPosts: newMyPosts,
            OpponentPosts: newOpponentPosts,
            QuestionPosts: newQuestionPosts,
          };
        case 'FreeTalk':
          console.log(action.payload.id);
          const toggleScrapFreeTalkIndex = state.FreeTalkPosts.findIndex(
            (item) => item.id === action.payload.id,
          );
          if (toggleScrapFreeTalkIndex >= 0) {
            newFreeTalkPosts.splice(toggleScrapFreeTalkIndex, 1, {
              ...state.FreeTalkPosts[toggleScrapFreeTalkIndex],
              viewerScrapCommunityPost: !state.FreeTalkPosts[
                toggleScrapFreeTalkIndex
              ].viewerScrapCommunityPost,
            });
          }
          return {
            ...state,
            LikedCommunityPosts: newLikedCommunityPosts,
            ScrapedCommunityPosts: newScrapedCommunityPosts,
            CommentedCommunityPosts: newCommentedCommunityPosts,
            MyPosts: newMyPosts,
            OpponentPosts: newOpponentPosts,
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
