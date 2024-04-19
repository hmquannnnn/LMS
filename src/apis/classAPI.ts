import instance from "@/utils/axiosCustomize";

const classUrl = "/classrooms";

export const callCreaterNewClass = (className: string) => {
  const req = {
    name: className,
  };
  return instance.post(`${classUrl}`, req);
};

export const callJoinClass = (classCode: string) => {
  // console.log(`/classrooms/join?code=${classCode}`);
  return instance.post(`${classUrl}/join?code=${classCode}`);
};

export const callGetAllClass = () => {
  return instance.get(`${classUrl}/all`);
};

export const callGetClass = (classId: string) => {
  return instance.get(`${classUrl}/${classId}`);
};

export const callCreateNotification = (classId: string, content: string) => {
  return instance.post(`${classUrl}/${classId}/notifications`, { content });
};

export const callGetNotification = (classId: string) => {
  return instance.get(`${classUrl}/${classId}/notifications`);
};

export const callGetStudentsList = (classId: string) => {
  return instance.get(`${classUrl}/${classId}/students`);
};

export const callSearchClass = (classCode: number) => {
  return instance.get(`${classUrl}`, classCode);
};

export const callCreateAssigment = (classId: string, req: object) => {
  // console.log("check req: ", req);
  return instance.post(`${classUrl}/${classId}/assignments`, req);
};

export const callGetAssigment = (classId: string) => {
  return instance.get(`${classUrl}/${classId}/assignments`);
};

export const callGetAssigmentStatus = (classId: string) => {
  return instance.get(`${classUrl}/${classId}/assignments/status`);
};

export const callGetAssignmentStatusStudent = (classId: string) => {
  return instance.get(`${classUrl}/${classId}/assignments/student/status`);
};

export const callSubmitAssignment = (assignmentId: number, req: object) => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return instance.post(`assignments/${assignmentId}/post`, req);
};

export const callGetAllPosts = (classId: number) => {
  return instance.get(`${classUrl}/${classId}/posts`);
};

export const callHandlePendingPost = (postId: number, action: string) => {
  return instance.put(`posts/${postId}/action/${action}`);
};

export const callGetPost = (postId: number) => {
  return instance.get(`posts/detail/${postId}`);
};
