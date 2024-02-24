import instance from "@/utils/axiosCustomize";

export const callCommentToPost = (postId: number, content: string) => {
  return instance.post(`comments/post/${postId}`, content);
};

export const callLikePost = (postId: number) => {
  return instance.put(`posts/${postId}/like`);
};

export const callUnlikePost = (postId: number) => {
  return instance.put(`posts/${postId}/unlike`);
};

export const callHandleLikePost = (postId: number, type: string) => {
  return instance.put(`posts/${postId}/${type}`);
};

export const callGetPostStatus = (postId: number) => {
  return instance.get(`posts/detail/${postId}`);
};

export const callGetPostComments = (postId: number) => {
  return instance.get(`posts/${postId}/comments`);
};
