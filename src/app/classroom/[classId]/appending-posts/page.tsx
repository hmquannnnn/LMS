"use client";

import { callGetAllPosts, callHandleAppendingPost } from "@/apis/classAPI";
import { getAppendingPostsAction } from "@/redux/slices/classSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callFetchUserById } from "@/apis/userAPI";
import paths from "@/app/paths";

const AppendingPosts = (props: any) => {
  const classId = props.params.classId;
  const router = useRouter();
  const dispatch = useDispatch();
  const appendingList = useSelector(
    (state) => state?.classes?.currentClass?.appendingPosts?.postsList || [],
  );
  const [isUpdate, setIsUpdate] = useState(true);
  const getAllAppendingPosts = async () => {
    setIsUpdate(false);
    const res = await callGetAllPosts(classId);
    if (res?.length) {
      const promises = res
        .filter((post) => post.type === "PENDING")
        .map(async (post) => {
          const user = await callFetchUserById(post.authorId);
          return { ...post, user };
        });

      const appendingListsWithUsers = await Promise.all(promises);
      dispatch(getAppendingPostsAction(appendingListsWithUsers));
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
  console.log(">>> check length: ", appendingList.length);
  return (
    <div className={"w-3/5 mx-auto"}>
      <div
        className={
          "bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"
        }
      >
        <p className={"text-3xl font-bold text-white"}>Appending Posts</p>
      </div>
      {appendingList.length ? (
        <table className={"w-full border-collapse border border-slate-400"}>
          <thead>
            <tr className="bg-gray-200">
              <th className={"border border-slate-400"}>No</th>
              <th className={"border border-slate-400"}>Title</th>
              <th className={"border border-slate-400"}>Author</th>
              <th className={"border border-slate-400"}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appendingList.map((post, index) => (
              <tr key={post.id} className="odd:bg-white even:bg-gray-100">
                <td className={"border border-slate-400"}>{index + 1}</td>
                <td className={"border border-slate-400"}>{post.title}</td>
                <td className={"border border-slate-400"}>{post.authorId}</td>
                <td className={"border border-slate-400"}>
                  <button
                    className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handlePost(post.id, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handlePost(post.id, "reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={() =>
                      router.push(
                        `${paths.classroom}/${classId}/${paths.post}/${post.id}`,
                      )
                    }
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default AppendingPosts;
