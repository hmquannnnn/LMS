import instance from "@/utils/axiosCustomize";

const documentUrl = "/documents";

export interface DocumentInput {
  title: string;
  veryFirstText: string;
  type: string;
  notionPageId: string;
  topic: string;
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

export const callGetDocumentsWithPaging = (
  type: String | null,
  topic: String | null,
  page: number,
  pageSize: number,
) => {
  if (type != null && topic != null) {
    return instance.get(
      `${documentUrl}/page?type=${type}&topic=${topic}&pageSize=${pageSize}&page=${page}`,
    );
  } else if (type != null) {
    return instance.get(
      `${documentUrl}/page?type=${type}&pageSize=${pageSize}&page=${page}`,
    );
  } else if (topic != null) {
    return instance.get(
      `${documentUrl}/page?topic=${topic}&pageSize=${pageSize}&page=${page}`,
    );
  }
  return instance.get(`${documentUrl}/page?pageSize=${pageSize}&page=${page}`);
};

export const callGetDocumentsDetail = (
  type: String | null,
  topic: String | null,
) => {
  if (type != null && topic != null) {
    return instance.get(`${documentUrl}/detail?type=${type}&topic=${topic}`);
  } else if (type != null) {
    return instance.get(`${documentUrl}/detail?type=${type}`);
  } else if (topic != null) {
    return instance.get(`${documentUrl}/detail?topic=${topic}`);
  }
  return instance.get(`${documentUrl}/detail`);
};

export const callGetDocumentById = (documentId: string) => {
  return instance.get(`${documentUrl}/detail/${documentId}`);
};

export const callSearchDocumentByTitle = (keyword: string) => {
  return instance.get(`${documentUrl}/search?keyword=${keyword}`);
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

export const callGetDocumentCounselling = (documentId: number) => {
  return instance.get(`documents/${documentId}/counsellings`);
};
