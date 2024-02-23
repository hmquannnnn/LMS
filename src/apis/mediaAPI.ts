import instance from "@/utils/axiosCustomize";

export const callGetMedia = (mediaId: string) => {
  return instance.get(`media/${mediaId}`);
};

export const callGetStream = (streamId: string) => {
  return instance.get(`media/stream/${streamId}`);
};

export const callUploadMedia = (file: File) => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return instance.post("media", file);
};
