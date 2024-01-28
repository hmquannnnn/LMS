"use client";

import { callGetAllPosts, callHandleAppendingPost } from "@/apis/classAPI";
import { getAppendingPostsAction } from "@/redux/slices/classSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppendingPosts = (props: any) => {
  const classId = props.params.classId;
  const router = useRouter();
  const dispatch = useDispatch();
  const appendingLists = useSelector(
    (state) => state?.classes?.currentClass?.appendingPosts?.postsList || [],
  );
  const [isUpdate, setIsUpdate] = useState(true);
  const getAllAppendingPosts = async () => {
    setIsUpdate(false);
    const res = await callGetAllPosts(classId);
    if (res?.length) {
      const appendingLists = res.filter((post) => post.type === "PENDING");
      dispatch(getAppendingPostsAction(appendingLists));
    }
    console.log(" check res: ", res);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      getAllAppendingPosts();
    }
  }, [isUpdate]);
  const handlePost = async (postId: number, action: string) => {
    const res = await callHandleAppendingPost(postId, action);
    setIsUpdate(true);
    console.log(">> check res: ", res);
  };
  return (
    <div className={"w-3/5 mx-auto"}>
      <div
        className={
          "bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"
        }
      >
        <p className={"text-3xl font-bold text-white"}>Appending Posts</p>
      </div>
      <table className={"border-collapse border border-slate-400"}>
        <tr>
          <th className={"border border-slate-400"}>No</th>
          <th className={"border border-slate-400"}>Title</th>
          <th className={"border border-slate-400"}>Author</th>
          <th className={"border border-slate-400"}>chua nghi ra de gi:v</th>
        </tr>
        {appendingLists.map((post, index) => (
          <tr key={post.id}>
            <th className={"border border-slate-400"}>{index + 1}</th>
            <th className={"border border-slate-400"}>{post.title}</th>
            <th className={"border border-slate-400"}>{post.authorId}</th>
            <th className={"border border-slate-400"}>
              <button
                className="bg-grey border-[1px] border-black"
                onClick={() => handlePost(post.id, "approve")}
              >
                Approve
              </button>
              <button
                className="bg-grey border-[1px] border-black"
                onClick={() => handlePost(post.id, "reject")}
              >
                Reject
              </button>
              <button
                className="bg-grey border-[1px] border-black"
                onClick={() =>
                  router.push(
                    `${paths.classroom}/${classId}/${paths.post}/${post.id}`,
                  )
                }
              >
                Details
              </button>
            </th>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AppendingPosts;
