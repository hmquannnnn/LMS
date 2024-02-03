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
          className={`border-[1px] border-amber-500 px-5 py-3 bg-gradient-to-br from-${colors.pink_1} to-${colors.yellow_1}`}
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
          {classesList.map((classItem) => {
            return (
              <div
                className={"border-[1px] px-10 py-5"}
                key={classItem.id}
                onClick={() =>
                  router.push(
                    `${paths.classroom}/${classItem.id}/notifications`,
                  )
                }
              >
                <p>{classItem.name}</p>
              </div>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default MyClasses;
