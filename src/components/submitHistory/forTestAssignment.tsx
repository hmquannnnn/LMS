"use client";

import { callGetAssignmentById } from "@/apis/classAPI";
import { callGetTestById, callGetUserTestHistory } from "@/apis/testAPI";
import React, { useEffect, useState } from "react";
import { FormatDateTime } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForTestAssignmentHistory = ({ params }) => {
  const classId = params.classId;
  const assignmentId = params.assignmentId;
  const [history, setHistory] = useState();
  const router = useRouter();
  console.log(params);

  const getTestHistory = async () => {
    const curentAssignment = await callGetAssignmentById(assignmentId);
    if (curentAssignment?.id) {
      console.log("test: ", curentAssignment);
      const test = await callGetTestById(curentAssignment.relatedTestId);
      if (test?.id) {
        const testHistory = await callGetUserTestHistory(test.id);
        if (testHistory?.length) {
          setHistory(testHistory);
        }
      }
    }
  };

  const countWritingQuestion = (test) => {
    const countFillInTheBlankQuestions = test.questions.filter(
      (question) => question.type === "FILL_IN_THE_BLANK",
    ).length;
    return countFillInTheBlankQuestions;
  };

  useEffect(() => {
    getTestHistory();
  }, []);

  return (
    <table className={"w-[70%] mx-auto"}>
      <colgroup>
        <col style={{ width: "10%" }} />
        <col style={{ width: "40%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "25%" }} />
      </colgroup>
      <thead>
        <tr className="bg-gray-200">
          <th className={"border border-slate-400"}>STT</th>
          <th className={"border border-slate-400"}>Thời gian nộp</th>
          <th className={"border border-slate-400"}>Điểm</th>
          <th className={"border border-slate-400"}>Xem lại</th>
        </tr>
      </thead>
      <tbody>
        {history?.map((submission, index: number) => (
          <>
            <tr>
              <th className={"border border-slate-400 font-normal"}>
                {index + 1}
              </th>
              <th className={"border border-slate-400 font-normal"}>
                {FormatDateTime(submission.submitAt)}
              </th>
              <th className={"border border-slate-400 font-normal"}>
                {submission.totalScore} /{" "}
                {submission.questions.length - countWritingQuestion(submission)}
              </th>
              <th
                className={"border border-slate-400 font-normal"}
                // onClick={() => router.push(`test/${history.id}`)}
              >
                <Link href={`history/test/${submission.id}`}>Xem lại</Link>
              </th>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default ForTestAssignmentHistory;
