import instance from "@/utils/axiosCustomize";

export const callCreateTest = (req: object) => {
  return instance.post("tests", req);
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
