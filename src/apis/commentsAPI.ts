import instance from "@/utils/axiosCustomize";

const commentUrl = "comments";

export const callReplyNotification = (
  notificationId: number,
  content: string,
) => {
  return instance.post(`${commentUrl}/notification/${notificationId}`, content);
};

export const callGetCommentById = (commentId: number) => {
  return instance.get(`${commentUrl}/${commentId}`);
};

export const callGetAllNotificationComments = (notificationId: number) => {
  return instance.get(`notifications/${notificationId}/${commentUrl}`);
};

export const callPinComment = (commentId: number) => {
  return instance.put(`${commentUrl}/pin/${commentId}`);
};

export const callUnpinComment = (commentId: number) => {
  return instance.put(`${commentUrl}/unpin/${commentId}`);
};
