const commentList = (
    state = {
        commentList: [],
        commentCount: 0,
    },
    action,
) => {
    switch(action.type) {
        case 'SET_COMMENT_LIST':
            return {
                ...state,
                commentList: action.payload,
            };
        case 'SET_COMMENT_COUNT':
            return {
                ...state,
                commentCount: action.payload,
            }
        default:
            return state;
    }
}

export default commentList;