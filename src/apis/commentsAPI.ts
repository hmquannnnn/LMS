import instance from "@/utils/axiosCustomize";

const commentUrl = "/comments";

export const callReplyNotification = (
  notificationId: number,
  content: string,
) => {
  return instance.post(`${commentUrl}/notification/${notificationId}`, content);
};

export const callGetComment = (commentId: number) => {
  return instance.get(`${commentUrl}/${commentId}`);
};

const callGetAllCommentNotification = (notificationId: number) => {
  return instance.get(`notifications/${notificationId}/${commentUrl}`);
};
