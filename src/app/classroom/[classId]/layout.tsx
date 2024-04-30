"use client";

import { ReactNode, useEffect } from "react";
import Link from "next/link";
import paths from "@/app/paths";
import { useParams } from "next/navigation";
import { callGetClass } from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { FaChalkboardTeacher, FaHistory } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import {
  MdAssignmentTurnedIn,
  MdChecklistRtl,
  MdOutlineWork,
} from "react-icons/md";
import { FaPeopleLine } from "react-icons/fa6";
import { ROLE_TEACHER } from "@/utils/constant";
import { Tooltip } from "antd";
import { PiListChecks } from "react-icons/pi";

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
      <div className={"min-h-[82vh] w-full"}>
        <div className={"flex flex-col w-full"}>
          <div className={"mb-5 xl:h-[120px] h-[80px] w-full]"}>
            <div
              className={"navigation w-full"}
              style={{
                // position: "-webkit-sticky" /* Safari */,
                position: "fixed",
                // top: 0,
                backgroundColor: "#fff",
                zIndex: 200,
              }}
            >
              {/*<div className="pt-3 pl-10 font-timesNewRoman text-xl">*/}
              {/*  <i>Chào mừng em đến với</i>*/}
              {/*</div>*/}
              <div className={"flex items-center mt-5 pl-10 mb-5"}>
                <div className="flex items-center">
                  <FaChalkboardTeacher className={"h-10 w-10 mr-4"} />
                  <p className={"text-xl font-bold"}>{currentClass.name}</p>
                </div>

                <div className="flex w-1/2 ml-[5vw] ">
                  <Tooltip
                    className={
                      "flex justify-center px-[2vw]  hover:bg-slate-200 cursor-pointer py-1 "
                    }
                    placement="top"
                    title={"Thông báo"}
                    color={"#367ff0"}
                    arrow={false}
                  >
                    <Link
                      href={`${paths.classroom}/${classId}/${paths.classroomNotifications}`}
                    >
                      {/*Notifications*/}
                      <IoNotifications className={"h-6 w-6"} />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    className={
                      "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
                    }
                    placement="top"
                    title={"Bài tập"}
                    color={"#367ff0"}
                    arrow={false}
                  >
                    <Link
                      href={`${paths.classroom}/${classId}/${paths.classroomAssignments}`}
                    >
                      {/*Assignments*/}
                      <MdAssignmentTurnedIn className={"h-6 w-6"} />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    className={
                      "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
                    }
                    placement="top"
                    title={"Danh sách"}
                    color={"#367ff0"}
                    arrow={false}
                  >
                    <Link
                      href={`${paths.classroom}/${classId}/${paths.classroomMembers}`}
                    >
                      {/*Members*/}
                      <FaPeopleLine className={"h-6 w-6"} />
                    </Link>
                  </Tooltip>
                  {user.role === ROLE_TEACHER && (
                    <Tooltip
                      className={
                        "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
                      }
                      placement="top"
                      title={"Bài chờ duyệt"}
                      color={"#367ff0"}
                      arrow={false}
                    >
                      <Link
                        href={`${paths.classroom}/${classId}/${paths.pendingPosts}`}
                      >
                        {/*Appending Posts*/}
                        <MdChecklistRtl className={"h-6 w-6"} />
                      </Link>
                    </Tooltip>
                  )}
                  <Tooltip
                    className={
                      "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
                    }
                    placement="top"
                    title={"Định hướng"}
                    color={"#367ff0"}
                    arrow={false}
                  >
                    <Link
                      href={`${paths.classroom}/${classId}/${paths.classroomOrientations}`}
                    >
                      {/*Orientations*/}
                      <MdOutlineWork className={"h-6 w-6"} />
                    </Link>
                  </Tooltip>
                  {user.role === ROLE_TEACHER && (
                    <>
                      <Tooltip
                        className={
                          "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
                        }
                        placement="top"
                        title={"Tiêu chí kiểm tra đánh giá"}
                        color={"#367ff0"}
                        arrow={false}
                      >
                        <Link
                          href={`${paths.classroom}/${classId}/${paths.evaluation}`}
                        >
                          {/*Appending Posts*/}
                          <PiListChecks className={"h-6 w-6"} />
                        </Link>
                      </Tooltip>
                      <Tooltip
                        className={
                          "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
                        }
                        placement="top"
                        title={"Lịch sử làm bài của học sinh"}
                        color={"#367ff0"}
                        arrow={false}
                      >
                        <Link
                          href={`${paths.classroom}/${classId}/student-test-history`}
                        >
                          {/*Appending Posts*/}
                          <FaHistory className={"h-6 w-6"} />
                        </Link>
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*<div style={{ height: "150px" }} />*/}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default ClassroomLayout;
