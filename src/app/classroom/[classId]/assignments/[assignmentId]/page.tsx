"use client";

import {
  callGetAssigment,
  callGetAssignmentStatusStudent,
} from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAssignment } from "@/redux/slices/classSlice";
import React, { useEffect } from "react";
import { assignmentStatus, ROLE_STUDENT, ROLE_TEACHER } from "@/utils/constant";
import { FormatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

const AssignmentDetails = (props: any) => {
  const classId = Number(props.params.classId);
  const assignmentId = Number(props.params.assignmentId);
  const user = useSelector((state) => state.account.user);
  const currentAssignment = useSelector(
    (state) =>
      state?.classes?.currentClass?.assignments?.currentAssignment || {},
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const getAssignmentDetails = async () => {
    if (user.role === ROLE_TEACHER) {
      const res = await callGetAssigment(classId);
      const currentAssignment = res.find(
        (assignment) => assignment.id == assignmentId,
      );

      dispatch(getCurrentAssignment(currentAssignment));
    }
    if (user.role === ROLE_STUDENT) {
      const res = await callGetAssignmentStatusStudent(classId);
      const currentAssignment = res.find(
        (assignment) => assignment.id == assignmentId,
      );
      // console.log(currentAssignment);
      dispatch(getCurrentAssignment(currentAssignment));
    }
  };

  useEffect(() => {
    getAssignmentDetails();
  }, [user]);

  return (
    <>
      <div
        className={"w-full border-amber-500 min-h-[80vh] h-fit border-[1px]"}
      >
        <div
          className={
            "py-5 px-10 rounded-xl bg-blue_6 h-fit mx-auto w-[90%] my-10"
          }
        >
          <h4 className={"uppercase font-semibold text-xl text-blue_5 mb-5"}>
            {currentAssignment.title}
          </h4>
          <div
            dangerouslySetInnerHTML={{ __html: currentAssignment.content }}
          />
        </div>
        <table className={"w-[90%] mx-auto px-4 text-left"}>
          <tr className={"border border-collapse py-2"}>
            <th className={"border border-collapse w-1/3 px-5 py-2"}>
              Deadline
            </th>
            <th className={"border border-collapse font-normal text-left px-5"}>
              {FormatDate(currentAssignment.assignedDateTime)}
            </th>
          </tr>
          <tr>
            <th className={"border border-collapse w-1/3 text-left px-5 py-2"}>
              Status
            </th>
            <th className={"border border-collapse font-normal text-left px-5"}>
              {currentAssignment.status}
            </th>
          </tr>
          <tr>
            <th className={"border border-collapse w-1/3 text-left px-5 py-2"}>
              Submission
            </th>
            <th className={"border border-collapse font-normal text-left px-5"}>
              {currentAssignment.status === assignmentStatus.NOT_SUBMITTED ? (
                <button
                  className={
                    "rounded bg-blue_8 px-3 py-1 font-semibold text-white"
                  }
                  onClick={() => router.push(`${assignmentId}/submit`)}
                >
                  Submit
                </button>
              ) : (
                <p>See post</p>
              )}
            </th>
          </tr>
        </table>
      </div>
    </>
  );
};

export default AssignmentDetails;
