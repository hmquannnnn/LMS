"use client";

import {
  callGetAssigment,
  callGetClass,
  callGetStudentsList,
} from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentClassAction,
  getMembersAction,
} from "@/redux/slices/classSlice";
import { useEffect } from "react";
import { Col, Divider, Row } from "antd";
import { ROLE_STUDENT } from "@/utils/constant";

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
      const memberList = await callGetStudentsList(classInfo.id);
      const assignmentsList = await callGetAssigment(classInfo.id);
      console.log("check members: ", memberList);
      dispatch(getMembersAction(memberList));
    }
  };
  useEffect(() => {
    getClassDetail();
  }, []);

  return (
    <>
      <div className={"w-3/5 mx-auto"}>
        <div
          className={
            "bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"
          }
        >
          <p className={"text-3xl font-bold text-white"}>Members</p>
        </div>

        <Row>
          <Col span={5} className={"pr-5"}>
            <div>
              <p>Total members: {membersList.length}</p>
            </div>
          </Col>
          <Col span={19}>
            {userRole === ROLE_STUDENT
              ? membersList.map((member: object, index: number) => (
                  <>
                    <p>{member.username}</p>
                    {index < membersList.length - 1 && <Divider />}
                  </>
                ))
              : membersList.map((member: object, index: string) => (
                  <>
                    teacher
                    <p>{member.username}</p>
                    {index < membersList.length - 1 && <Divider />}
                  </>
                ))}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassMember;
