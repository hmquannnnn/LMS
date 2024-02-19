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

export const callGetDocuments = (type: String | null) => {
  if (type != null) {
    return instance.get(`${documentUrl}?type=${type}`);
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
  return instance.put(`${documentUrl}/${documentId}/like`);
};

export const callUnLikeDocument = (documentId: string) => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return instance.put(`${documentUrl}/${documentId}/unlike`);
};
