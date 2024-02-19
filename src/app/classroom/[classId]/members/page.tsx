"use client";

import { callGetAssigmentStatus, callGetClass } from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignmentsAction,
  getCurrentClassAction,
  getMembersAction,
} from "@/redux/slices/classSlice";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdCancel, MdPending } from "react-icons/md";
import { ROLE_TEACHER } from "@/utils/constant";

const STATUS = {
  APPROVED: 2,
  PENDING: 1,
  NOT_YET_SUBMITTED: 0,
  REJECTED: -1,
};

const ClassMember = (props: any) => {
  const classId = props.params.classId;
  const dispatch = useDispatch();
  const classInfo = useSelector(
    (state) => state.classes?.currentClass?.classInfo || {},
  );
  const membersList = useSelector(
    (state) => state.classes?.currentClass?.members || [],
  );
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  const total = useSelector(
    (state) => state.classes?.currentClass?.assignments?.total || 0,
  );
  const getClassDetail = async () => {
    const classInfo = await callGetClass(classId);
    if (classInfo?.id) {
      dispatch(getCurrentClassAction(classInfo));
      const res = await callGetAssigmentStatus(classId);
      dispatch(
        getMembersAction({
          // classInfo,
          students: res.students,
          status: res.status,
        }),
      );
      dispatch(getAssignmentsAction(res.assignments));
    }
  };
  useEffect(() => {
    getClassDetail();
  }, []);

  return (
    <>
      <div className={"w-3/5 mx-auto"}>
        <table>
          <thead>
            <tr className={"border border-collapse"}>
              <th className={"border"}>No</th>
              <th className={"border"}>Name</th>
              {Array.from({ length: total }).map((_, index) => (
                <th key={index} className={"border"}>
                  Assignment {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {membersList.map((student: object, index: number) => (
              <tr>
                <th className={"border"}>{index + 1}</th>
                <th className={"border"}>
                  {student.studentInfo.lastName +
                    " " +
                    student.studentInfo.firstName}
                </th>
                {userRole === ROLE_TEACHER &&
                  student.assignmentStatus.map((status: number) => (
                    <th className={"border"}>
                      {status === STATUS.APPROVED ? (
                        <FaCheck className={"text-green-500 mx-auto"} />
                      ) : status === STATUS.PENDING ? (
                        <MdPending className={"text-yellow-400 mx-auto"} />
                      ) : status ===
                        STATUS.NOT_YET_SUBMITTED ? null : status ===
                        STATUS.REJECTED ? (
                        <MdCancel className={"text-red-600 mx-auto"} />
                      ) : null}
                    </th>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClassMember;
