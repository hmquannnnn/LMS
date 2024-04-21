"use client";

import {
  callGetAssignmentById,
  callGetAssignmentStatusStudent,
} from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAssignment } from "@/redux/slices/classSlice";
import React, { useEffect, useState } from "react";
import { assignmentStatus, ROLE_STUDENT, ROLE_TEACHER } from "@/utils/constant";
import { FormatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { filterAndRemoveDuplicateAssignments } from "@/app/classroom/[classId]/assignments/page";
import { vietnamesePostStatus } from "@/app/classroom/[classId]/assignments/[assignmentId]/history/page";

const AssignmentDetails = (props: any) => {
  const classId = Number(props.params.classId);
  const assignmentId = Number(props.params.assignmentId);
  const user = useSelector((state) => state.account.user);
  const currentAssignment = useSelector(
    (state) =>
      state?.classes?.currentClass?.assignments?.currentAssignment || {},
  );
  const [document, setDocument] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const getAssignmentDetails = async () => {
    if (user.role === ROLE_TEACHER) {
      const res = await callGetAssignmentById(assignmentId);

      dispatch(getCurrentAssignment(res));
    }
    if (user.role === ROLE_STUDENT) {
      const res = await callGetAssignmentStatusStudent(classId);
      const filteredRes = filterAndRemoveDuplicateAssignments(res);
      const current = filteredRes.find(
        (assignment) => assignment.id == assignmentId,
      );
      // console.log(currentAssignment);
      dispatch(getCurrentAssignment(current));
    }
  };

  useEffect(() => {
    getAssignmentDetails();
  }, [user]);

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
                {vietnamesePostStatus[currentAssignment.status]}
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
                  onClick={() => router.push(`${assignmentId}/submit`)}
                >
                  Nộp bài
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
              </th>
            </tr>
          </table>
        )}
      </div>
    </>
  );
};

export default AssignmentDetails;
