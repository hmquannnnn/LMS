"use client";

import { Divider, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateClassButton from "@/components/classButton/createClassButton";
import JoinClassButton from "@/components/classButton/joinClassButton";
import { callGetAllClass } from "@/apis/classAPI";
import { useEffect } from "react";
import { getAllClassAction } from "@/redux/slices/classSlice";
import { useRouter } from "next/navigation";
import paths from "@/app/paths";
import { ROLE_TEACHER } from "@/utils/constant";
import "../profile/profile.scss";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleLine } from "react-icons/fa6";

const MyClasses = () => {
  const userRole = useSelector((state) => state.account.user.role);
  const dispatch = useDispatch();
  const router = useRouter();
  const getAllClass = async () => {
    const res = await callGetAllClass();
    // console.log(res);
    if (res.length) {
      dispatch(getAllClassAction(res));
    }
  };
  const handleUpdate = () => {
    getAllClass();
  };
  useEffect(() => {
    getAllClass();
    // console.log(">>>check classes list: ", classesList);
  }, [dispatch]);
  const classesList = useSelector((state) => state.classes.classesList);
  return (
    <>
      <div className={" min-h-[84vh] mt-5 w-[90%] mx-auto"}>
        <div>
          <div className={"flex justify-between items-center"}>
            <p className={"h-fit font-bold text-2xl"}>Chào mừng em đến với</p>
            {userRole === ROLE_TEACHER ? (
              <CreateClassButton onUpdate={handleUpdate} />
            ) : (
              <JoinClassButton onUpdate={handleUpdate} />
            )}
          </div>

          <Divider className={"border-blue_9 my-1"} />
        </div>

        <Row className={"flex flex-wrap"}>
          {classesList?.length > 0 &&
            classesList.map((classItem) => {
              return (
                <div
                  key={classItem.id}
                  className={
                    "relative largelaptop:w-1/5 largelaptop:pb-[17%] w-1/4 pb-[19%] "
                  }
                >
                  <div
                    className={
                      " text-blue_5 rounded-xl px-5 py-4 cursor-pointer place-items-end grid shadow-2xl"
                    }
                    style={{
                      backgroundColor: "#f2f2f2",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "92%",
                      height: "88%",
                      // display: "grid",
                      // gridTemplateRows: "50% 18% 20%",
                      // gap: "calc((100% - 88%) / 2)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={classItem.id}
                    onClick={() =>
                      router.push(
                        `${paths.classroom}/${classItem.id}/notifications`,
                      )
                    }
                  >
                    <div style={{ flex: 2 }} className={"mb-2"}>
                      <img
                        src={"/classroom.png"}
                        alt={"classroom thumnail"}
                        className={"2xl:h-full w-full max-h-[50%] "}
                      />
                    </div>

                    <div
                      className={
                        "font-semibold flex justify-start flex-col w-full"
                      }
                      style={{ flex: 1 }}
                    >
                      <div className={"flex flex-row items-center"}>
                        <FaChalkboardTeacher className={"mr-1"} />
                        <p className={"h-fit 2xl:text-base text-xs"}>
                          {classItem.teacherLastName +
                            " " +
                            classItem.teacherFirstName}
                        </p>
                      </div>
                      <div
                        className={
                          "flex flex-row items-center 2xl:text-base text-xs"
                        }
                      >
                        <FaPeopleLine className={"mr-1"} />
                        <p className={"h-fit"}>
                          {classItem.numberOfStudents} thành viên
                        </p>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className={"font-bold 2xl:text-xl text-base"}>
                        {classItem.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </Row>
      </div>
    </>
  );
};

export default MyClasses;
