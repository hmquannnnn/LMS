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

export const callGetAllFavoriteDocuments = (userId: String) => {
  return instance.get(`/users/${userId}/favourite-documents`);
};

export const callGetPageFavoriteDocuments = (
  userId: String,
  page: number,
  pageSize: number
) => {
  return instance.get(
    `/users/${userId}/favourite-documents/page?page=${page}&pageSize=${pageSize}`
  );
};
