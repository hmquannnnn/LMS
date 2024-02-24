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
import { ROLE_STUDENT, ROLE_TEACHER } from "@/utils/constant";
import { Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
      <div className={"w-[90%] mx-auto"}>
        <div className={"mb-20"}>
          <p className={"font-bold text-xl"}>Teacher</p>
          <Divider className={"border-blue_3 my-1"} />
          <div className={"flex flex-row items-center px-3"}>
            <Avatar
              size={30}
              icon={<UserOutlined />}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`}
              className="mr-2.5"
            />
            <p className={"h-fit"}>
              {classInfo.teacherLastName + " " + classInfo.teacherFirstName}
            </p>
          </div>
        </div>
        <div>
          <div className={"flex flex-row items-center"}>
            <p className={"font-bold text-xl h-fit"}>Students list &nbsp;</p>
            <p className={"h-fit"}>({membersList?.length || 0} students)</p>
          </div>

          <Divider className={"border-blue_3 my-1"} />
          {userRole === ROLE_TEACHER && (
            <>
              <div className={"my-5"}>
                <p className={"text-red-600 flex flex-row font-semibold"}>
                  *<p className={"text-black"}>Note</p>
                </p>
                <div className={"flex flex-row items-center"}>
                  <FaCheck className={"text-green-500"} />
                  <p className={"h-fit ml-4"}>Approved</p>
                </div>
                <div className={"flex flex-row items-center"}>
                  <MdPending className={"text-yellow-400"} />
                  <p className={"h-fit ml-4"}>Pending</p>
                </div>
                <div className={"flex flex-row items-center"}>
                  <MdCancel className={"text-red-600"} />
                  <p className={"h-fit ml-4"}>Rejected</p>
                </div>
              </div>
              <table className={"font-normal"}>
                <thead>
                  <tr className={"border border-collapse py-1 px-1"}>
                    <th className={"border px-1.5 font-semibold"}>No</th>
                    <th className={"border font-semibold"}>Name</th>
                    {userRole === ROLE_TEACHER &&
                      Array.from({ length: total }).map((_, index) => (
                        <th key={index} className={"border px-4 font-semibold"}>
                          Assignment {index + 1}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {membersList.map((student: object, index: number) => (
                    <tr key={index} className={"px-2 py-1 font-normal"}>
                      <th className={"border font-normal px-2 py-1"}>
                        {index + 1}
                      </th>
                      <th className={"border px-4 font-normal"}>
                        {student.studentInfo.lastName +
                          " " +
                          student.studentInfo.firstName}
                      </th>
                      {userRole === ROLE_TEACHER &&
                        student.assignmentStatus.map(
                          (status: number, index: number) => (
                            <th className={"border"} key={index}>
                              {status === STATUS.APPROVED ? (
                                <FaCheck className={"text-green-500 mx-auto"} />
                              ) : status === STATUS.PENDING ? (
                                <MdPending
                                  className={"text-yellow-400 mx-auto"}
                                />
                              ) : status ===
                                STATUS.NOT_YET_SUBMITTED ? null : status ===
                                STATUS.REJECTED ? (
                                <MdCancel className={"text-red-600 mx-auto"} />
                              ) : null}
                            </th>
                          ),
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {userRole === ROLE_STUDENT &&
            membersList.map((student: object, index: number) => (
              <div className={"flex flex-row px-3 my-2.5"}>
                <p className={"mr-10 w-3"}>{index + 1}</p>
                <div className={"span-10 flex flex-row"}>
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${student.studentInfo.avatarId}`}
                    className="mr-2.5"
                  />
                  <th className={"font-normal"}>
                    {student.studentInfo.lastName +
                      " " +
                      student.studentInfo.firstName}
                  </th>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ClassMember;
