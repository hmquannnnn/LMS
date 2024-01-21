import instance from "@/utils/axiosCustomize";

const classUrl = "/classrooms"

export const createNewClass = (className: string) => {
    return instance.post(`${classUrl}`, className);
}

export const joinClass = (classCode: string) => {
    // console.log(`/classrooms/join?code=${classCode}`);
    return instance.post(`${classUrl}/join?code=${classCode}`);
}

export const getAllClass = () => {
    return instance.get(`${classUrl}/all`);
}

export const getClass = (classId: string) => {
    return instance.get(`${classUrl}/${classId}`);
}

export const createNotification = (classId: string, content: string) => {
    return instance.post(`${classUrl}/${classId}/notifications`, content);
}

export const getNotification = (classId: string) => {
    return instance.get(`${classUrl}/${classId}/notifications`);
}

export const getStudentsList = (classId: string) => {
    return instance.get(`${classUrl}/${classId}/students`);
}

export const searchClass = (classCode: string) => {
    return instance.get(`${classUrl}`, classCode);
}

export const createAssigment = (classId: string, req: object) => {
    console.log("check req: ", req);
    return instance.post(`${classUrl}/${classId}/assignments`, req);
}

export const getAssigment = (classId: string) => {
    return instance.get(`${classUrl}/${classId}/assignments`);
}