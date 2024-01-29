// "use client";
//
// import { callGetPost } from "@/apis/classAPI";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import {getCurrentPostAction} from "@/redux/slices/postSlice";
//
// const PostDetails = (props: any) => {
//   const classId = props.params.classId;
//   const postId = props.params.postId;
//   const dispatch = useDispatch();
//
//   const getPostDetails = async () => {
//     const res = await callGetPost(postId);
//     if(res?.id) {
//         dispatch(getCurrentPostAction(res));
//
//   };
//
//   useEffect(() => {
//     getPostDetails();
//   }, []);
//   return (
//     <>
//       {/*<div dangerouslySetInnerHTML={{ __html: post.caption }} />*/}
//         hello
//     </>
//   )
// }
//
// export default PostDetails;

"use client";

import { callGetPost } from "@/apis/classAPI";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentPostAction } from "@/redux/slices/postSlice";

const PostDetails = (props: any) => {
  console.log(props.params);
  const classId = props.params.classId;
  const postId = props.params.postId;
  const dispatch = useDispatch();
  const [post, setPost] = useState({});

  const getPostDetails = async () => {
    const res = await callGetPost(postId);
    dispatch(getCurrentPostAction(res));
    console.log(res);
    setPost(res);
  };

  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <>
      {/*<div dangerouslySetInnerHTML={{ __html: post.caption }} />*/}
      hello
    </>
  );
};

export default PostDetails;
