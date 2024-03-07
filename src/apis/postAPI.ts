import instance from "@/utils/axiosCustomize";

export const callCommentToPost = (postId: number, content: string) => {
  return instance.post(`comments/post/${postId}`, content);
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
