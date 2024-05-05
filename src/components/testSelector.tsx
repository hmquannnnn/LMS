"use client";

import { callGetAllTestsByDocument } from "@/apis/testAPI";
import { useEffect, useState } from "react";
import { callGetDocumentById } from "@/apis/documentsAPI";
import { assignmentTypes, documentTypes } from "@/utils/constant";
import { useDispatch } from "react-redux";
import {
  updateAssignmentType,
  updateRelatedTest,
} from "@/redux/slices/classSlice";

const TestSelector = ({ sendTestsId, documentId, sendAssignmentType }) => {
  const [documentType, setDocumentType] = useState("");
  const [relatedTestId, setRelatedTestId] = useState(0);
  const [testsList, setTestsList] = useState([]);
  const [testType, setTestType] = useState("");
  const dispatch = useDispatch();
  console.log("type: ", testType);
  const fetchTestsList = async () => {
    const res = await callGetAllTestsByDocument(documentId);
    if (res?.length > 0) {
      setTestsList(res);
      // sendTestsList(testsList);
    }
    // console.log(res);
  };

  const fetchDocument = async () => {
    const res = await callGetDocumentById(documentId);
    res?.id && setDocumentType(res.type);
  };

  useEffect(() => {
    fetchTestsList();
    fetchDocument();
  }, []);

  useEffect(() => {
    sendAssignmentType(testType);
  }, [testType]);

  const handleChangeTestType = (e) => {
    const testTypeSelected = e.target.value;
    console.log(testTypeSelected);
    setTestType(testTypeSelected);
    sendAssignmentType(testType);
    dispatch(updateAssignmentType(testTypeSelected));

    const selectedTestId =
      e.target.options[e.target.selectedIndex].getAttribute("data-testid");
    console.log("testId: ", selectedTestId);
    selectedTestId && sendTestsId(selectedTestId);
    dispatch(updateRelatedTest(selectedTestId));
  };

  const handleChangeTestId = (testId) => {
    sendTestsId(testId);
    console.log(testId);
  };

  return (
    <div className={"my-2"}>
      <label htmlFor="test">Chọn bài kiểm tra</label>
      <select
        name="test"
        id="test"
        className={"px-4 py-1 rounded border-[1px] ml-3"}
        onChange={handleChangeTestType}
      >
        {testsList?.map((test) => (
          <option
            value={assignmentTypes.FOR_TEST}
            key={test.id}
            data-testid={test.id}
          >
            {test.type === "WRITING"
              ? "Viết"
              : documentType === documentTypes.TEXT
                ? "Đọc hiểu"
                : "Nói và nghe"}
          </option>
        ))}
        <option value={assignmentTypes.FOR_COUNSELLING} key={0} data-testid={0}>
          Nhiệm vụ hướng nghiệp
        </option>
      </select>
    </div>
  );
};

export default TestSelector;
