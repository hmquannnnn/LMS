import instance from "@/utils/axiosCustomize";

export const callFetchUser = () => {
  return instance.get("/user");
};

export const callChangeAvatar = (file: File) => {
  instance.defaults.headers.common = {
    "Content-Type": "multipart/form-data",
  };
  return instance.post(`/user`, file);
};

export const callFetchUserById = (userId: number) => {
  return instance.get(`/users/${userId}`);
};
