"use client";

import {
  callGetAssignmentById,
  callGetAssignmentStatusStudent,
} from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAssignment } from "@/redux/slices/classSlice";
import React, { useEffect, useState } from "react";
import {
  assignmentStatus,
  assignmentTypes,
  documentTypes,
  ROLE_STUDENT,
  ROLE_TEACHER,
  testTypes,
} from "@/utils/constant";
import { FormatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { filterAndRemoveDuplicateAssignments } from "@/app/classroom/[classId]/assignments/page";
import { vietnamesePostStatus } from "@/components/submitHistory/normalAssignment";
import { callGetTestById, callGetUserTestHistory } from "@/apis/testAPI";
import Link from "next/link";
import { callGetDocumentById } from "@/apis/documentsAPI";

const initalAssignment = {
  id: 0,
  title: "",
  content: "",
  dueDateTime: "",
  assignedDateTime: "",
  isForGroup: false,
  relatedDocumentId: 0,
  type: "OTHER",
  relatedTestId: 0,
};

const initalTest = {
  id: 0,
  authorId: 0,
  documentId: 0,
  title: "",
  questions: [
    {
      id: 0,
      type: "",
      question: "",
      choices: [
        {
          id: 0,
          content: "",
          isAnswer: true,
        },
      ],
      hints: [
        {
          id: 0,
          content: "",
        },
      ],
      answerHints: [
        {
          id: 0,
          content: "",
        },
      ],
    },
  ],
  type: "",
};

const AssignmentDetails = (props: any) => {
  const classId = Number(props.params.classId);
  const assignmentId = Number(props.params.assignmentId);
  const user = useSelector((state) => state.account.user);
  const currentAssignment = useSelector(
    (state) =>
      state?.classes?.currentClass?.assignments?.currentAssignment || {},
  );
  const [assignmentWithDocument, setAssignmentWithDocument] =
    useState(initalAssignment);
  const [test, setTest] = useState(initalTest);
  const [isDone, setIsDone] = useState(false);
  const [document, setDocument] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const getAssignmentDetails = async () => {
    if (user.role === ROLE_TEACHER) {
      const res = await callGetAssignmentById(assignmentId);
      const relatedDocument = await callGetDocumentById(res?.relatedDocumentId);

      console.log(relatedDocument);
      setDocument(relatedDocument);
      dispatch(getCurrentAssignment(res));

      //fetch test if assignment type is FOR_TEST
      if (res?.relatedTestId) {
        const testId = res?.relatedTestId;
        const relatedTest = await callGetTestById(testId);
        await setTest(relatedTest);
      }
    }
    if (user.role === ROLE_STUDENT) {
      const res = await callGetAssignmentStatusStudent(classId);
      const currentAssignmentWithDocument =
        await callGetAssignmentById(assignmentId);
      setAssignmentWithDocument(currentAssignmentWithDocument);
      const filteredRes = filterAndRemoveDuplicateAssignments(res);
      const current = filteredRes.find(
        (assignment) => assignment.id == assignmentId,
      );
      // console.log(currentAssignment);
      dispatch(
        getCurrentAssignment({
          ...currentAssignmentWithDocument,
          status: current.status,
        }),
      );

      const relatedDocument = await callGetDocumentById(
        currentAssignmentWithDocument?.relatedDocumentId,
      );
      console.log(relatedDocument);
      setDocument(relatedDocument);

      //fetch test if assignment type is FOR_TEST
      if (currentAssignmentWithDocument?.relatedTestId) {
        const testId = currentAssignmentWithDocument?.relatedTestId;
        const relatedTest = await callGetTestById(testId);
        await setTest(relatedTest);
        const history = await callGetUserTestHistory(testId);
        if (history?.length > 0) {
          setIsDone(true);
        }
      }
    }
  };

  useEffect(() => {
    getAssignmentDetails();

    console.log("document: ", document);
  }, [user]);
  console.log("test: ", test);
  const convertTestType = (testType: string) => {
    return testType === testTypes.MULTIPLE_CHOICE ? "READING" : "WRITING";
  };

  const handleSubmit = () => {
    currentAssignment.type === assignmentTypes.FOR_TEST
      ? router.push(`/library/${test.documentId}/${convertTestType(test.type)}`)
      : router.push(`${assignmentId}/submit`);
  };

  const isTestDone = () => {
    return isDone ? "Hoàn thành" : "Chưa hoàn thành";
  };

  const isLinkedDocumentAssignment = (assignment) => {
    return (
      assignment.type === assignmentTypes.FOR_COUNSELLING ||
      assignment.type === assignmentTypes.FOR_TEST
    );
  };

  return (
    <>
      <div className={"w-full min-h-[80vh] h-fit"}>
        <div
          className={
            "py-5 px-10 rounded-xl bg-purple_4 h-fit mx-auto w-[90%] my-10"
          }
        >
          <h4 className={"uppercase font-semibold text-xl text-purple_5 mb-5"}>
            {currentAssignment.title}
          </h4>
          <div
            dangerouslySetInnerHTML={{ __html: currentAssignment.content }}
          />
          {currentAssignment?.type === assignmentTypes.FOR_COUNSELLING && (
            <p>
              Ngữ liệu liên kết :&nbsp;
              <Link href={`/library/${document?.id}`} className={"font-bold"}>
                {document?.title}
              </Link>
            </p>
          )}
          {currentAssignment?.type === assignmentTypes.FOR_TEST && (
            <p>
              <Link
                href={`/library/${document?.id}/${test?.type === testTypes.MULTIPLE_CHOICE ? "READING" : testTypes.WRITING}`}
                className={"font-bold"}
              >
                Bài tập&nbsp;
                {test?.types === testTypes.WRITING
                  ? "Viết "
                  : document?.type === documentTypes.TEXT
                    ? "Đọc hiểu "
                    : "Nghe và nói "}
                Ngữ liệu&nbsp; &quot;{document?.title}&quot;
              </Link>
            </p>
          )}
        </div>
        {user.role === ROLE_STUDENT && (
          <table className={"w-[90%] mx-auto px-4 text-left"}>
            <tr className={"border border-collapse py-2"}>
              <th className={"border border-collapse w-1/3 px-5 py-2"}>
                Thời hạn
              </th>
              <th
                className={"border border-collapse font-normal text-left px-5"}
              >
                {FormatDate(currentAssignment.assignedDateTime)}
              </th>
            </tr>
            <tr>
              <th
                className={"border border-collapse w-1/3 text-left px-5 py-2"}
              >
                Trạng thái
              </th>
              <th
                className={"border border-collapse font-normal text-left px-5"}
              >
                {currentAssignment.type === assignmentTypes.FOR_TEST
                  ? isTestDone()
                  : vietnamesePostStatus[currentAssignment?.status]}
              </th>
            </tr>
            <tr>
              <th
                className={"border border-collapse w-1/3 text-left px-5 py-2"}
              >
                Nộp bài
              </th>
              <th
                className={"border border-collapse font-normal text-left px-5"}
              >
                {/*{currentAssignment.status === assignmentStatus.NOT_SUBMITTED ? (*/}
                <button
                  className={
                    "rounded bg-purple_7 px-3 py-1 font-semibold text-white mr-5"
                  }
                  onClick={handleSubmit}
                >
                  {currentAssignment.type === assignmentTypes.FOR_TEST
                    ? "Làm bài"
                    : "Nộp bài"}
                </button>
                {currentAssignment?.status !=
                  assignmentStatus.NOT_SUBMITTED && (
                  <button
                    className={
                      "rounded bg-purple_7 px-3 py-1 font-semibold text-white"
                    }
                    onClick={() => router.push(`${assignmentId}/history`)}
                  >
                    Lịch sử nộp bài
                  </button>
                )}
                {currentAssignment.type === assignmentTypes.FOR_TEST &&
                  isDone && (
                    <button
                      className={
                        "rounded bg-purple_7 px-3 py-1 font-semibold text-white"
                      }
                      onClick={() => router.push(`${assignmentId}/history`)}
                    >
                      Lịch sử làm bài
                    </button>
                  )}
              </th>
            </tr>
          </table>
        )}
      </div>
    </>
  );
};

export default AssignmentDetails;
