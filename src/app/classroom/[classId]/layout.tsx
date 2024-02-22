"use client";

import { ReactNode, useEffect } from "react";
import { Col, Row } from "antd";
import Link from "next/link";
import paths from "@/app/paths";
import { useParams } from "next/navigation";
import { callGetClass } from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import {
  MdAssignmentTurnedIn,
  MdChecklistRtl,
  MdOutlineWork,
} from "react-icons/md";
import { FaPeopleLine } from "react-icons/fa6";
import { ROLE_TEACHER } from "@/utils/constant";

const ClassroomLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const classId = params.classId;
  const user = useSelector((state) => state.account.user);
  const getClassDetails = async () => {
    const res = await callGetClass(classId);
    if (res?.id) {
      dispatch(getCurrentClassAction(res));
    }
  };
  useEffect(() => {
    getClassDetails();
  }, []);
  const currentClass = useSelector(
    (state) => state.classes.currentClass.classInfo,
  );
  return (
    <>
      <Row className={"min-h-[82vh]"}>
        <Col md={24}>
          <Row
            className={"border-b-[1px] px-5 mb-5"}
            // justify="space-around"
            align="middle"
          >
            <Col span={3}>
              <Row>
                <FaChalkboardTeacher className={"h-10 w-10 mr-4"} />
                <p className={"text-2xl font-bold"}>{currentClass.name}</p>
              </Row>
            </Col>

            <Col className={""} span={2}>
              <Link
                href={`${paths.classroom}/${classId}/${paths.classroomNotifications}`}
              >
                {/*Notifications*/}
                <IoNotifications className={"h-6 w-6 mr-4"} />
              </Link>
            </Col>
            <Col span={2}>
              <Link
                href={`${paths.classroom}/${classId}/${paths.classroomAssignments}`}
              >
                {/*Assignments*/}
                <MdAssignmentTurnedIn className={"h-6 w-6 mr-4"} />
              </Link>
            </Col>
            <Col span={2}>
              <Link
                href={`${paths.classroom}/${classId}/${paths.classroomMembers}`}
              >
                {/*Members*/}
                <FaPeopleLine className={"h-6 w-6 mr-4"} />
              </Link>
            </Col>
            {user.role === ROLE_TEACHER && (
              <Col span={2}>
                <Link
                  href={`${paths.classroom}/${classId}/${paths.pendingPosts}`}
                >
                  {/*Appending Posts*/}
                  <MdChecklistRtl className={"h-6 w-6 mr-4"} />
                </Link>
              </Col>
            )}

            <Col span={2}>
              <Link
                href={`${paths.classroom}/${classId}/${paths.classroomOrientations}`}
              >
                {/*Orientations*/}
                <MdOutlineWork className={"h-6 w-6 mr-4"} />
              </Link>
            </Col>
          </Row>
          {children}
        </Col>
      </Row>
    </>
  );
};

export default ClassroomLayout;
