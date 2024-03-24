"use client";

import { callGetPostByAssignmentId } from "@/apis/postAPI";
import React, { useEffect, useState } from "react";
import { convertDateTime } from "@/utils/formatDate";
import { useRouter } from "next/navigation";

export const vietnamesePostStatus = {
  PENDING: "Đang chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Chưa đạt",
};

const Page = ({ params }) => {
  const classId = params.classId;
  const assignmentId = params.assignmentId;
  const [postList, setPostList] = useState([]);
  const router = useRouter();

  const getSubmissionHistory = async () => {
    const res = await callGetPostByAssignmentId(assignmentId);
    setPostList(res);
    console.log("check: ", res);
  };

  useEffect(() => {
    getSubmissionHistory();
  }, []);

  return (
    <>
      {postList.length > 0 && (
        <>
          <table className={"w-[70%] mx-auto"}>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "50%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr className="bg-gray-200">
                <th className={"border border-slate-400"}>STT</th>
                <th className={"border border-slate-400"}>Tiêu đề</th>
                <th className={"border border-slate-400"}>Thời gian nộp</th>
                <th className={"border border-slate-400"}>Trạng thái</th>
                <th className={"border border-slate-400"}>Xem lại</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post, index: number) => (
                <tr key={post.id} className={"font-normal"}>
                  <th className={"border border-slate-400 font-normal"}>
                    {index + 1}
                  </th>
                  <th className={"border border-slate-400 font-normal"}>
                    {post.title}
                  </th>
                  <th className={"border border-slate-400 font-normal"}>
                    {convertDateTime(post.postTime)}
                  </th>
                  <th className={"border border-slate-400 font-normal"}>
                    {vietnamesePostStatus[post.type]}
                  </th>
                  <th
                    className={
                      "border border-slate-400 font-normal cursor-pointer hover:text-blue-700"
                    }
                  >
                    <p onClick={() => router.push(`history/${post.id}`)}>
                      Xem lại
                    </p>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Page;
