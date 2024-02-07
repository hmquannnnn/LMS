"use client";

import { callGetAssigmentStatus, callGetClass } from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { useEffect } from "react";

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
  const getClassDetail = async () => {
    const classInfo = await callGetClass(classId);
    if (classInfo?.id) {
      dispatch(getCurrentClassAction(classInfo));
      // const memberList = await callGetStudentsList(classInfo.id);
      // const assignmentsList = await callGetAssigment(classInfo.id);
      // console.log("check members: ", memberList);
      // dispatch(getMembersAction(memberList));
      const res = await callGetAssigmentStatus(classId);
      console.log(res);
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
            <tr></tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default ClassMember;
