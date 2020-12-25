const createPost = (data) => {
  return {
    type: 'CREATE_POST',
    payload: data,
  };
};

const editPost = (data) => {
  return {
    type: 'EDIT_POST',
    payload: data,
  };
};

const deletePost = (postId) => {
  return {
    type: 'DELETE_POST',
    payload: postId,
  };
};

const setPosts = (data) => {
  return {
    type: 'SET_POSTS',
    payload: data,
  };
};
export default {
  createPost,
  editPost,
  deletePost,
  setPosts,
};
