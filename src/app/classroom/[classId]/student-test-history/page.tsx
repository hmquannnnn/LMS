"use client";

import React, { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { callGetTestById, callGetTestHistory } from "@/apis/testAPI";
import { FormatDateTime } from "@/utils/formatDate";
import { callGetDocumentById } from "@/apis/documentsAPI";
import { callGetAssigment, callGetStudentsList } from "@/apis/classAPI";
import { assignmentTypes, documentTypes, testTypes } from "@/utils/constant";
import Link from "next/link";

interface TestHistoryDataType {
  key: React.Key;
  documentTitle: string;
  testType: string;
  submitterName: string;
  submitAt: string;
}

const columns: TableColumnsType<TestHistoryDataType> = [
  {
    title: "STT",
    dataIndex: "index",
    showSorterTooltip: {
      target: "full-header",
    },
    sorter: (a, b) => a.index - b.index,
    sortDirections: ["descend"],
  },
  {
    title: "Ngữ liệu",
    dataIndex: "documentTitle",
    // defaultSortOrder: "descend",
    sorter: (a, b) => a.documentTitle.localeCompare(b.documentTitle),
    render: (text, record) => (
      <Link href={`student-test-history/${record.id}`}>{text}</Link> // Sử dụng Link ở đây
    ),
  },
  {
    title: "Học sinh",
    dataIndex: "submitterName",
  },
  {
    title: "Thời gian nộp",
    dataIndex: "submitAt",
    // defaultSortOrder: "descend",
    // sorter: (a, b) =>
    //   new Date(a.submitAt).getTime() - new Date(b.submitAt).getTime(),
  },
  {
    title: "Loại bài tập",
    dataIndex: "type",
  },
  {
    title: "Điểm",
    dataIndex: "totalScore",
    // sorter: (a, b) => a.totalScore - b.totalScore,
  },
];

const TestHistoryTable: React.FC<{ testHistory: TestHistoryDataType[] }> = ({
  testHistory,
}) => <Table columns={columns} dataSource={testHistory} pagination={false} />;

const StudentTestHistory: React.FC = ({ params }) => {
  const classId = params.classId;
  const [assignmentsList, setAssignmentsList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [testHistory, setTestHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getForTestAssignment();
    getStudentsList();
  }, []);

  useEffect(() => {
    if (studentsList.length > 0 && assignmentsList.length > 0) {
      getTestHistory();
    }
  }, [studentsList, assignmentsList]);

  const getStudentName = (submitterId, studentsList) => {
    const student = studentsList.find((student) => student.id === submitterId);
    return student ? student.lastName + " " + student.firstName : "Unknown";
  };

  const getUniqueTestIds = (assignmentsList) => {
    const uniqueTestIds = [];
    const uniqueTestIdSet = new Set();

    assignmentsList.forEach((assignment) => {
      if (!uniqueTestIdSet.has(assignment.relatedTestId)) {
        uniqueTestIdSet.add(assignment.relatedTestId);
        uniqueTestIds.push(assignment.relatedTestId);
      }
    });

    return uniqueTestIds;
  };

  const getForTestAssignment = async () => {
    const allAssignment = await callGetAssigment(classId);
    const forTestAssignment = allAssignment?.filter(
      (assignment) => assignment?.type === assignmentTypes.FOR_TEST,
    );
    forTestAssignment.sort((a, b) => a.id - b.id);
    setAssignmentsList(forTestAssignment);
  };

  const getStudentsList = async () => {
    const response = await callGetStudentsList(classId);
    setStudentsList(response);
  };

  const getTestHistory = async () => {
    setLoading(true);
    const uniqueRelatedTestIdAssignmentsList =
      getUniqueTestIds(assignmentsList);

    const promises = uniqueRelatedTestIdAssignmentsList.map(async (testId) => {
      const response = await callGetTestHistory(testId);
      return response.filter((item) =>
        studentsList.some((student) => student.id === item.submitterId),
      );
    });

    const testHistoryData = await Promise.all(promises).then((results) =>
      results.reduce((acc, val) => acc.concat(val), []),
    );

    const testHistoryWithStudentName = testHistoryData.map((item) => ({
      ...item,
      submitterName: getStudentName(item.submitterId, studentsList),
    }));

    const testIds = testHistoryWithStudentName.map((item) => item.testId);

    const testDocuments = await Promise.all(
      testIds.map(async (testId) => {
        const testInfo = await callGetTestById(testId);
        const documentId = testInfo.documentId;
        const documentInfo = await callGetDocumentById(documentId);
        return {
          testId: testInfo.id,
          documentTitle: documentInfo.title,
          documentType: documentInfo.type,
        };
      }),
    );

    testHistoryWithStudentName.sort((a, b) => {
      return new Date(b.submitAt) - new Date(a.submitAt);
    });

    const updatedTestHistory = testHistoryWithStudentName.map((item, index) => {
      const matchedDocument = testDocuments.find(
        (doc) => doc.testId === item.testId,
      );
      return {
        ...item,
        documentTitle: matchedDocument
          ? matchedDocument.documentTitle
          : "Unknown",
        submitAt: FormatDateTime(item.submitAt),
        index: index + 1,
        documentType: matchedDocument
          ? matchedDocument.documentType
          : "Unknown",
        questions: item.questions.filter(
          (question) => question.type !== "FILL_IN_THE_BLANK",
        ),
      };
    });

    const testHistoryWithTotalQuestions = updatedTestHistory.map((item) => {
      return {
        ...item,
        totalScore:
          item.type === testTypes.WRITING
            ? "Không chấm điểm"
            : `${item.totalScore}/${item.questions.length}`,
      };
    });

    const finalTestHistory = testHistoryWithTotalQuestions.map((item) => {
      return {
        ...item,
        type:
          item.type === testTypes.WRITING
            ? "Viết"
            : item.documentType === documentTypes.TEXT
              ? "Đọc hiểu"
              : "Nghe và nói",
      };
    });

    setTestHistory(finalTestHistory);
    setLoading(false);
  };

  console.log(testHistory);

  return (
    <>
      <TestHistoryTable testHistory={testHistory} />
    </>
  );
};

export default StudentTestHistory;
