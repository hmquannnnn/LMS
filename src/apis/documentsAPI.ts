import instance from "@/utils/axiosCustomize";

const documentUrl = "/documents";

export interface DocumentInput {
  title: string;
  veryFirstText: string;
  type: string;
  notionPageId: string;
}

export const callPostDocument = (document: FormData) => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  };
  return instance.post(`${documentUrl}`, document);
};

export const callGetDocuments = (type: String | null, topic: String | null) => {
  if (type != null && topic != null) {
    return instance.get(`${documentUrl}?type=${type}&topic=${topic}`);
  } else if (type != null) {
    return instance.get(`${documentUrl}?type=${type}`);
  } else if (topic != null) {
    return instance.get(`${documentUrl}?topic=${topic}`);
  }
  return instance.get(`${documentUrl}`);
};

export const callGetDocumentById = (documentId: string) => {
  return instance.get(`${documentUrl}/detail/${documentId}`);
};

export const callLikeDocument = (documentId: string) => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return instance.put(`/users${documentUrl}/${documentId}/like`);
};

export const callUnLikeDocument = (documentId: string) => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return instance.put(`/users${documentUrl}/${documentId}/unlike`);
};
