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
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentAuthors,
  getCurrentPostAction,
} from "@/redux/slices/postSlice";
import { colors } from "@/utils/constant";
import { Col, Row } from "antd";
import { callFetchUserById } from "@/apis/userAPI";
import { FaUser } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const PostDetails = (props: any) => {
  console.log(props);
  const classId = props.params.classId;
  const postId = props.params.postId;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.currentPost);
  const author = useSelector((state) => state.post.author);
  const [like, setLike] = useState(false);
  // const [post, setPost] = useState({});

  const getPostDetails = async () => {
    const res = await callGetPost(postId);
    if (res?.id) {
      dispatch(getCurrentPostAction(res));
      const author = await callFetchUserById(res.authorId);
      dispatch(getCurrentAuthors(author));
    }

    // console.log(res);
    // setPost(res);
  };

  useEffect(() => {
    getPostDetails();
  }, []);
  return (
    <>
      <Row
        className={"min-h-[60vh] mx-10 my-10 rounded-2xl"}
        style={{ backgroundColor: `${colors.green_1}` }}
      >
        <Col span={12} className={"px-10"}>
          hhhhh
        </Col>
        <Col span={12} className={"border-amber-500 px-10 py-10"}>
          <div
            className="flex items-center mb-2 text-lg"
            style={{ color: `${colors.green_3}` }}
          >
            <FaUser className="mr-2" />
            <p className="inline-block text-green-3">
              {author.lastName} {author.firstName}
            </p>
          </div>
          <h4
            className={"uppercase font-bold text-2xl text-center my-5"}
            style={{ color: `${colors.green_3}` }}
          >
            {post.title}
          </h4>
          <div className={"text-lg"}>
            <div dangerouslySetInnerHTML={{ __html: post.caption }} />
          </div>
          <div>
            <div>
              {like ? (
                <IoIosHeart
                  className={"w-6 h-6"}
                  style={{ color: `${colors.green_3}` }}
                  onClick={() => setLike(false)}
                />
              ) : (
                <IoIosHeartEmpty
                  className={"w-6 h-6"}
                  style={{ color: `${colors.green_3}` }}
                  onClick={() => setLike(true)}
                />
              )}
            </div>
            <div>
              <input
                type={"text"}
                placeholder={"Comment"}
                className={
                  "w-full bg-transparent rounded-3xl py-2 px-7 text-black placeholder-black bg-green_3"
                }
                style={{ border: `1px solid ${colors.green_3}` }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PostDetails;
