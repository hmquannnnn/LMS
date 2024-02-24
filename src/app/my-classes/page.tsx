"use client";

import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateClassButton from "@/components/classButton/createClassButton";
import JoinClassButton from "@/components/classButton/joinClassButton";
import { callGetAllClass } from "@/apis/classAPI";
import { useEffect } from "react";
import { getAllClassAction } from "@/redux/slices/classSlice";
import { useRouter } from "next/navigation";
import paths from "@/app/paths";
import { colors, ROLE_TEACHER } from "@/utils/constant";

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
      <Row className={"min-h-[78vh]"}>
        <Col
          md={4}
          className={`border-[1px] border-amber-500 px-5 py-3 bg-gradient-to-br from-pink_1 to-yellow_1`}
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${colors.pink_1}, ${colors.yellow_1})`,
          }}
        >
          {userRole === ROLE_TEACHER ? (
            <CreateClassButton onUpdate={handleUpdate} />
          ) : (
            <JoinClassButton onUpdate={handleUpdate} />
          )}
        </Col>
        <Col md={20}>
          <Row className={"flex flex-wrap"}>
            {classesList.map((classItem) => {
              return (
                <div key={classItem.id} className={"relative w-1/6 pb-[8%]"}>
                  <div
                    className={
                      "bg-blue_1 text-blue_5 rounded-xl px-5 py-4 cursor-pointer place-items-end grid h-full"
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
                    <p className={"font-semibold text-xl"}>{classItem.name}</p>
                  </div>
                </div>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MyClasses;
