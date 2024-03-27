"use client";

import { callGetAllPosts, callHandlePendingPost } from "@/apis/classAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callFetchUserById, callGetGroup } from "@/apis/userAPI";
import paths from "@/app/paths";
import { getPendingPostsAction } from "@/redux/slices/classSlice";
import { assignmentStatus } from "@/utils/constant";
import { displayGroupAuthor, isManagementPost } from "@/utils/checkOrientation";

export const filterPostsByStatus = async (status: string, classId: number) => {
  const res = await callGetAllPosts(classId);
  // console.log("check raw: ", res);
  if (res?.length) {
    const promises = res
      .filter((post) => post.type === status)
      .map(async (post) => {
        const user = isManagementPost(post)
          ? await callGetGroup(post.authorId)
          : await callFetchUserById(post.authorId);
        return { ...post, user };
      });

    const pendingListsWithUsers = await Promise.all(promises);
    // dispatch(getPendingPostsAction(pendingListsWithUsers));
    return pendingListsWithUsers;
  }
};

const PendingPosts = (props: any) => {
  const classId = props.params.classId;
  const router = useRouter();
  const dispatch = useDispatch();
  const pendingList = useSelector(
    (state) => state?.classes?.currentClass?.pendingPosts?.postsList || [],
  );
  const [isUpdate, setIsUpdate] = useState(true);
  const getAllPendingPosts = async () => {
    setIsUpdate(false);
    const res = await filterPostsByStatus(assignmentStatus.PENDING, classId);
    console.log(">>>check: ", res);
    dispatch(getPendingPostsAction(res));
    // if (res?.length) {
    //   const promises = res
    //     .filter((post) => post.type === "PENDING")
    //     .map(async (post) => {
    //       const user = await callFetchUserById(post.authorId);
    //       return { ...post, user };
    //     });
    //
    //   const pendingListsWithUsers = await Promise.all(promises);
    //   dispatch(getPendingPostsAction(pendingListsWithUsers));
    // }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      getAllPendingPosts();
    }
  }, [isUpdate]);
  const handlePost = async (postId: number, action: string) => {
    const res = await callHandlePendingPost(postId, action);
    setIsUpdate(true);
    console.log(">> check res: ", res);
  };
  // console.log(">>> check length: ", appendingList.length);
  return (
    <div className={"w-4/5 mx-auto"}>
      {pendingList.length ? (
        <table className={"w-full border-collapse border border-slate-400"}>
          <thead>
            <tr className="bg-gray-200">
              <th className={"border border-slate-400"}>STT</th>
              <th className={"border border-slate-400"}>Tiêu đề</th>
              <th className={"border border-slate-400"}>Tác giả</th>
              <th className={"border border-slate-400"}>Thêm</th>
            </tr>
          </thead>
          <tbody>
            {pendingList.map((post, index) => (
              <tr key={post.id} className="odd:bg-white even:bg-gray-100">
                <td className={"border border-slate-400"}>{index + 1}</td>
                <td className={"border border-slate-400"}>{post.title}</td>
                <td className={"border border-slate-400"}>
                  {isManagementPost(post)
                    ? displayGroupAuthor(post)
                    : post.user.lastName + " " + post.user.firstName}
                </td>
                <td className={"border border-slate-400"}>
                  <button
                    className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handlePost(post.id, "approve")}
                  >
                    Đạt
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => handlePost(post.id, "reject")}
                  >
                    Chưa đạt
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={() =>
                      router.push(
                        `${paths.classroom}/${classId}/${paths.post}/${post.id}`,
                      )
                    }
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={"text-center"}>Không có bài nộp nào đang chờ</p>
      )}
    </div>
  );
};

export default PendingPosts;
