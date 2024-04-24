"use client";

import { assignmentTypes } from "@/utils/constant";
import DocumentSelector from "@/components/documentSelector";
import { useState } from "react";
import TestSelector from "@/components/testSelector";
import { useDispatch } from "react-redux";
import { updateAssignmentType } from "@/redux/slices/classSlice";

const AssignmentTypeSelector = ({ sendLinkedDocument, linkedDocument }) => {
  const [selectedType, setSelectedType] = useState(assignmentTypes.OTHER);
  const [linkedDocumentId, setLinkedDocumentId] = useState(0);
  const [testsList, setTestsList] = useState([]);
  const dispatch = useDispatch();

  const getLinkDocumentId = (documentId) => {
    setLinkedDocumentId(documentId);
    sendLinkedDocument({ ...linkedDocument, documentId: documentId });
  };

  const getAssigmentType = (assignmentType) => {
    sendLinkedDocument({ ...linkedDocument, type: assignmentType });
    console.log(assignmentType);
  };

  const getRelatedTestId = (testId) => {
    sendLinkedDocument({ ...linkedDocument, relatedTestId: testId });
  };

  const getTestsList = (testsList) => {
    setTestsList(testsList);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    if (type === assignmentTypes.OTHER) {
      sendLinkedDocument({ ...linkedDocument, type: type });
      dispatch(updateAssignmentType(type));
    }
  };

  return (
    <div className={"my-2"}>
      <label htmlFor="assignment-type">Loại bài tập</label>
      <select
        name="type"
        id="assignment-type"
        className={"px-4 py-1 rounded border-[1px] ml-3"}
        onChange={handleTypeChange}
      >
        <option value={assignmentTypes.OTHER} key={1}>
          Tự do
        </option>
        <option value={assignmentTypes.FOR_TEST} key={2}>
          Mặc định
        </option>
      </select>
      {selectedType != assignmentTypes.OTHER && (
        <DocumentSelector sendLinkedDocumentId={getLinkDocumentId} />
      )}
      {linkedDocument.documentId && (
        <TestSelector
          sendTestsId={getRelatedTestId}
          documentId={linkedDocument.documentId}
          sendAssignmentType={getAssigmentType}
        />
      )}
    </div>
  );
};

export default AssignmentTypeSelector;
