"use client";

import { callGetClass } from "@/apis/classAPI";
import { useDispatch } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { useEffect } from "react";

import { Orientations } from "@/utils/constant";
import paths from "@/app/paths";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ClassOrientations = (props: any) => {
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
    <>
      <Link
        href={`${paths.classroom}/${classId}/${paths.classroomOrientations}/${Orientations.SOCIAL}`}
      >
        {Orientations.SOCIAL}
      </Link>
    </>
  );
};

export default ClassOrientations;
