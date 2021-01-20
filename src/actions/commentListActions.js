const setCommentList = (commentList) => {
    return {
        type: 'SET_COMMENT_LIST',
        payload: commentList,
    }
}

const setCommentCount = (commentCount) => {
    return {
        type: "SET_COMMENT_COUNT",
        payload: commentCount,
    }
}

export default {
    setCommentList,
    setCommentCount,
}