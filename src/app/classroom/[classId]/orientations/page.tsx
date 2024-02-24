"use client";

import { callGetClass } from "@/apis/classAPI";
import { useDispatch } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { colors, Orientations } from "@/utils/constant";
import paths from "@/app/paths";

const backgroundColor = {
  TECHNIQUE: colors.yellow_1,
  SOCIAL: colors.green_5,
  ART: colors.pink_3,
  MANAGEMENT: colors.grey_1,
  RESEARCH: colors.blue_9,
  MAJOR: colors.pink_1,
};

const textColor = {
  TECHNIQUE: colors.yellow_2,
  SOCIAL: colors.green_3,
  ART: colors.pink_4,
  MANAGEMENT: colors.grey_2,
  RESEARCH: colors.blue_5,
  MAJOR: colors.pink_5,
};

const ClassOrientations = (props: any) => {
  console.log(window.location.hostname);
  const classId = props.params.classId;
  const dispatch = useDispatch();
  const router = useRouter();

  const getClassDetail = async () => {
    const res = callGetClass(classId);
    // await filterPostsByStatus("APPROVED", classId);
    if (res?.id) {
      dispatch(getCurrentClassAction(res));
    }
  };

  useEffect(() => {
    getClassDetail();
  }, []);

  return (
    <div className="flex flex-row flex-wrap w-[80%] mx-auto">
      {Object.entries(Orientations).map(([key, value]) => (
        <div key={key} className="relative basis-1/3 h-[33%] block pb-[20%] ">
          <div
            className={
              "absolute h-[87%] w-[92%] rounded-xl cursor-pointer shadow-xl  hover:shadow-2xl flex items-center justify-center"
            }
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: `${textColor[value]}`,
              backgroundColor: `${backgroundColor[value]}`,
            }}
            onClick={() =>
              router.push(`${paths.classroomOrientations}/${value}`)
            }
          >
            <p className={"text-3xl font-bold"}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassOrientations;
