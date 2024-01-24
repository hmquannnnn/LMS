import instance from "@/utils/axiosCustomize";

export const callFetchUser = () => {
    return instance.get("/user");
}

export const changeAvatar = (file: string) => {
    return instance.post(`/user`, file);
}