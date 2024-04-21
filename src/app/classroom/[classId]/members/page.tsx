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

export const sortByFirstName = (student) => {
  console.log(student);
  return student.sort((a, b) => {
    return a.firstName.localeCompare(b.firstName);
  });
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
          students: sortByFirstName(res.students),
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
          <p className={"font-bold text-xl"}>Giáo viên</p>
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
            <p className={"font-bold text-xl h-fit"}>
              Danh sách học sinh &nbsp;
            </p>
            <p className={"h-fit"}>({membersList?.length || 0} học sinh)</p>
          </div>

          <Divider className={"border-blue_3 my-1"} />
          {userRole === ROLE_TEACHER && (
            <>
              <div className={"my-5"}>
                <p className={"text-red-600 flex flex-row font-semibold"}>
                  *<p className={"text-black"}>Chú thích</p>
                </p>
                <div className={"flex flex-row items-center"}>
                  <FaCheck className={"text-green-500"} />
                  <p className={"h-fit ml-4"}>Đạt</p>
                </div>
                <div className={"flex flex-row items-center"}>
                  <MdPending className={"text-yellow-400"} />
                  <p className={"h-fit ml-4"}>Chờ duyệt</p>
                </div>
                <div className={"flex flex-row items-center"}>
                  <MdCancel className={"text-red-600"} />
                  <p className={"h-fit ml-4"}>Chưa đạt</p>
                </div>
              </div>
              <table className={"font-normal max-w-full overflow-x-scroll"}>
                <thead>
                  <tr className={"border border-collapse py-1 px-1"}>
                    <th className={"border px-1.5 font-semibold sticky"}>
                      STT
                    </th>
                    <th className={"border font-semibold sticky min-w-fit"}>
                      Họ và tên
                    </th>
                    {userRole === ROLE_TEACHER &&
                      Array.from({ length: total }).map((_, index) => (
                        <th key={index} className={"border w-10 font-semibold"}>
                          {index + 1}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {membersList.map((student: object, index: number) => (
                    <tr key={index} className={"px-2 py-1 font-normal"}>
                      <th className={"border font-normal py-1 sticky w-10"}>
                        {index + 1}
                      </th>
                      <th
                        className={"border px-4 font-normal sticky min-w-fit"}
                      >
                        {student.studentInfo.lastName +
                          " " +
                          student.studentInfo.firstName}
                      </th>
                      {userRole === ROLE_TEACHER &&
                        student.assignmentStatus.map(
                          (status: number, index: number) => (
                            <th className={"border w-10"} key={index}>
                              {status === STATUS.APPROVED ? (
                                <FaCheck className={"text-green-500 mx-auto"} />
                              ) : status === STATUS.PENDING ? (
                                <MdPending
                                  className={"text-yellow-400 mx-auto"}
                                />
                              ) : status ===
                                STATUS.NOT_YET_SUBMITTED ? null : status ===
                                STATUS.REJECTED ? (
                                <MdCancel
                                  className={"text-orange-500 mx-auto"}
                                />
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
            membersList?.length > 0 &&
            membersList.map((student: object, index: number) => (
              <div key={index} className={"flex flex-row px-3 my-2.5"}>
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
