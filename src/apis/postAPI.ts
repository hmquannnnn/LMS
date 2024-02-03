import instance from "@/utils/axiosCustomize";

export const callCommentToPost = (postId: number) => {
  return instance.post(`comment/post/${postId}`);
};
