"use client";

import { callGetClass } from "@/apis/classAPI";
import { useDispatch } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { colors, Orientations } from "@/utils/constant";
import paths from "@/app/paths";
import OrientationIcon from "@/components/orientationIcon";
import { theme } from "@/app/classroom/[classId]/orientations/[orientationName]/page";

const backgroundColor = {
  TECHNIQUE: colors.yellow_1,
  SOCIAL: colors.green_5,
  ART: colors.pink_3,
  MANAGEMENT: colors.pink_1,
  RESEARCH: colors.blue_6,
  MAJOR: colors.grey_1,
};

const textColor = {
  TECHNIQUE: colors.yellow_2,
  SOCIAL: colors.green_3,
  ART: colors.pink_4,
  MANAGEMENT: colors.pink_5,
  RESEARCH: colors.blue_10,
  MAJOR: colors.grey_2,
};

const ClassOrientations = (props: any) => {
  // console.log(window.location.hostname);
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
    <div>
      <p
        className={
          "text-center font-bold largelaptop:text-2xl xl:text-xl text-base mt-0"
        }
      >
        {/* CHÀO MỪNG EM KHÁM PHÁ THẾ GIỚI NGHỀ NGHIỆP KÌ THÚ */}
      </p>
      <div className="flex flex-row flex-wrap w-[60%] mx-auto">
        {Object.entries(Orientations).map(([key, value]) => (
          <div key={key} className="relative basis-1/3 h-[33%] block pb-[20%] ">
            <div
              className={
                "absolute h-[87%] w-[92%] cursor-pointer shadow-xl  hover:shadow-2xl " +
                // "flex items-center justify-center flex-row" +
                "grid content-end xl:p-5 lg:p-3"
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
              <div className={"flex flex-row h-fit"}>
                <OrientationIcon color={textColor[value]} orientation={value} />
                <p
                  className={
                    "text-lg 2xl:text-2xl font-bold w-fit grid content-end"
                  }
                >
                  {theme[value]?.vietnameseName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassOrientations;
