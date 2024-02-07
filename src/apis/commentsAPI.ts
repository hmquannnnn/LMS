import instance from "@/utils/axiosCustomize";

const commentUrl = "/comments";

export const callReplyNotification = (
  notificationId: number,
  content: string,
) => {
  return instance.post(`${commentUrl}/notification/${notificationId}`, content);
};

export const callGetCommentById = (commentId: number) => {
  return instance.get(`${commentUrl}/${commentId}`);
};

const callGetAllNotificationComments = (notificationId: number) => {
  return instance.get(`notifications/${notificationId}/${commentUrl}`);
};
