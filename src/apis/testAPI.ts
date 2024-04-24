import instance from "@/utils/axiosCustomize";

export const callCreateTest = (req: object) => {
  return instance.post("tests", req, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  });
};

export const callGetTest = (testId: number) => {
  return instance.get(`tests/${testId}`);
};

export const callGetTestByDocument = (formData: FormData) => {
  const documentId = formData.get("documentId") as number;
  const type = formData.get("type") as string;
  return instance.get(`documents/${documentId}/test`, {
    params: {
      documentId: documentId,
      type: type,
    },
  });
};

export const callGetAllTestsByDocument = (documentId: number) => {
  return instance.get(`documents/${documentId}/tests`);
};

export const callSubmitTest = (testId: number, testAnswer) => {
  return instance.post(`tests/${testId}/submit`, testAnswer);
};

export const callGetUserTestHistory = (testId: number) => {
  return instance.get(`tests/${testId}/user-history`);
};

export const callGetTestHistory = (testId: number) => {
  return instance.get(`tests/${testId}/history/`);
};

export const callGetTestHistoryByHistoryId = (historyId: number) => {
  return instance.get(`tests/history/${historyId}`);
};

export const callGetTestById = (testId: number) => {
  return instance.get(`tests/${testId}`);
};
