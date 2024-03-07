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
            <p className={"h-fit font-bold text-2xl"}>Classes list</p>
            {userRole === ROLE_TEACHER ? (
              <CreateClassButton onUpdate={handleUpdate} />
            ) : (
              <JoinClassButton onUpdate={handleUpdate} />
            )}
          </div>

          <Divider className={"border-blue_3 my-1"} />
        </div>

        <Row className={"flex flex-wrap"}>
          {classesList.map((classItem) => {
            return (
              <div key={classItem.id} className={"relative w-1/5 pb-[16%] "}>
                <div
                  className={
                    "bg-blue_1 text-blue_5 rounded-xl px-5 py-4 cursor-pointer place-items-end grid"
                  }
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "92%",
                    height: "88%",
                    // display: "grid",
                    // gridTemplateRows: "70% 12% 12%",
                    // gap: "calc((100% - (70% + 12% + 12%)) / 2)",
                  }}
                  key={classItem.id}
                  onClick={() =>
                    router.push(
                      `${paths.classroom}/${classItem.id}/notifications`,
                    )
                  }
                >
                  <img src={"/classroom.png"} alt={"classroom thumnail"} />
                  <p className={"font-semibold text-xl"}>{classItem.name}</p>
                </div>
              </div>
            );
          })}
        </Row>
        <div id="one">
          <div id="two">&nbsp;</div>
        </div>
      </div>
    </>
  );
};

export default MyClasses;
