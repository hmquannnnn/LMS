import instance from "@/utils/axiosCustomize"

const commentUrl = "/comments"

export const replyNotification = (notificationId: number, content: string) => {
    return instance.post(`${commentUrl}/notification/${notificationId}`, content);
}

export const getComment = (commentId: number) => {
    return instance.get(`${commentUrl}/${commentId}`);
}

const getAllCommentNotification = (notificationId: number) => {
    return instance.get(`notifications/${notificationId}/${commentUrl}`)
}