"use client";

import { callGetAssigment, callGetPost } from "@/apis/classAPI";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { vietnamesePostStatus } from "@/app/classroom/[classId]/assignments/[assignmentId]/history/page";

const OldPost = ({ params }) => {
  const classId = params.classId;
  const assignmentId = params.assignmentId;
  console.log(assignmentId);
  const postId = params.postId;

  const [post, setPost] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState();
  // console.log(assignment);

  const getPost = async () => {
    const res = await callGetPost(postId);
    await setPost(res);
    const assignmentList = await callGetAssigment(classId);
    const current = await assignmentList.find(
      (assignment) => assignment.id == assignmentId,
    );
    await setCurrentAssignment(current);
    // console.log(assignment);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post?.id && currentAssignment?.id && (
        <Row className={"w-[90%] mx-auto min-h-[80vh] h-fit"}>
          <Col span={10} className={"bg-purple_4 rounded-xl h-fit px-10 py-5"}>
            <h4
              className={
                "uppercase font-semibold text-xl text-purple_5 mb-5 text-center"
              }
            >
              {currentAssignment.title}
            </h4>
            <div
              dangerouslySetInnerHTML={{ __html: currentAssignment.content }}
            />
          </Col>
          <Col span={14} className={"pl-10"}>
            <div className={"w-full"}>
              <table className={"w-full text-left"}>
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "70%" }} />
                </colgroup>
                <tr>
                  <th className={"border border-slate-400 p-2"}>Tiêu đề</th>
                  <th className={"border border-slate-400 font-normal p-2"}>
                    {post.title}
                  </th>
                </tr>
                <tr>
                  <th className={"border border-slate-400 p-2"}>Nội dung</th>
                  <th
                    className={
                      "border border-slate-400 text-left font-normal p-2"
                    }
                  >
                    <div dangerouslySetInnerHTML={{ __html: post.caption }} />
                  </th>
                </tr>
                <tr>
                  <th className={"border border-slate-400 p-2"}>
                    Tình trạng bài nộp
                  </th>
                  <th className={"border border-slate-400 font-normal p-2"}>
                    {vietnamesePostStatus[post.type]}
                  </th>
                </tr>
                <tr>
                  <th className={"border border-slate-400 p-2"}>
                    Phản hồi của người kiểm duyệt
                  </th>
                  <th className={"border border-slate-400 font-normal p-2"}>
                    {post.teacherComment}
                  </th>
                </tr>
              </table>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default OldPost;
