"use client";

import React, { useEffect, useState } from "react";
import { callGetAssignmentById } from "@/apis/classAPI";
import { assignmentTypes } from "@/utils/constant";
import ForTestAssignmentHistory from "@/components/submitHistory/forTestAssignment";
import NormalAssignmentHistory from "@/components/submitHistory/normalAssignment";

const Page = ({ params }) => {
  const classId = params.classId;
  const assignmentId = params.assignmentId;
  const [currentAssignment, setCurrentAssignment] = useState();
  const prop = {
    classId: classId,
    assignmentId: assignmentId,
  };

  const getCurrentAssignment = async () => {
    const res = await callGetAssignmentById(assignmentId);
    if (res?.id) {
      setCurrentAssignment(res);
    }
  };

  useEffect(() => {
    getCurrentAssignment();
    console.log(currentAssignment);
  }, []);

  return (
    <>
      {currentAssignment?.type === assignmentTypes.FOR_TEST ? (
        <ForTestAssignmentHistory params={prop} />
      ) : (
        <NormalAssignmentHistory params={prop} />
      )}
    </>
  );
};

export default Page;
