"use client";
import { callGetPost, callHandlePendingPost } from "@/apis/classAPI";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentAuthors,
  getCurrentPostAction,
} from "@/redux/slices/postSlice";
import { assignmentStatus, colors, ROLE_TEACHER } from "@/utils/constant";
import { Avatar, Col, Modal, Spin } from "antd";
import { callFetchUserById, callGetGroup } from "@/apis/userAPI";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { UserOutlined } from "@ant-design/icons";
import {
  callCommentToPost,
  callGetPostComments,
  callHandleLikePost,
  callTeacherComment,
} from "@/apis/postAPI";
import GoogleDocsViewer from "react-google-docs-viewer";
import { FormatDateTime } from "@/utils/formatDate";
import "./postDetails.scss";
import { isManagementPost } from "@/utils/checkOrientation";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { callPinComment, callUnpinComment } from "@/apis/commentsAPI";
import { FaRegPaperPlane } from "react-icons/fa";
import { theme } from "@/app/classroom/[classId]/orientations/[orientationName]/page";
import { useRouter } from "next/navigation";

interface button {
  PREV: string;
  NEXT: string;
}

const buttonType: button = {
  PREV: "PREV",
  NEXT: "NEXT",
};

const PostDetails = (props: any) => {
  // console.log(props);
  const classId = props.params.classId;
  const postId = props.params.postId;
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.currentPost);
  const author = useSelector((state) => state.post.author);
  const media = useSelector((state) => state.post.currentPost?.medias);
  const user = useSelector((state) => state.account.user);
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [mediaIndex, setMediaIndex] = useState(0);
  const [isUpdate, setIsUpdate] = useState(true);
  const [isUpdateComment, setIsUpdateComment] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const textAreaRef = useRef(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<string>({ url: "" });
  const [commentsList, setCommentsList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  const [pdfData, setPdfData] = useState();

  useEffect(() => {
    if (media && media.length > 0 && media[mediaIndex].type.includes("pdf")) {
      setFile({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${media[mediaIndex].id}`,
      });
      // fileObject.url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${media[mediaIndex].id}`;
    }
  }, [mediaIndex, media]);

  const handleInput = (e) => {
    setTextAreaHeight("auto"); // Reset height to auto to ensure the correct new height is calculated
    const target = e.target;
    if (target.offsetHeight <= target.scrollHeight)
      setTextAreaHeight(`${target.scrollHeight}px`); // Set new height based on scroll height
  };

  const getComment = async () => {
    const comment = await callGetPostComments(postId);
    const pinnedComments = comment.filter((comment) => comment.isPinned);
    console.log("pin: ", pinnedComments);
    const unpinnedComments = comment.filter((comment) => !comment.isPinned);
    const sortedComment = [
      ...pinnedComments.sort(
        (a, b) => new Date(b.postTime) - new Date(a.postTime),
      ),
      ...unpinnedComments.sort(
        (a, b) => new Date(b.postTime) - new Date(a.postTime),
      ),
    ];
    setIsUpdateComment(false);
    await setCommentsList(sortedComment);
  };

  const getPostDetails = async () => {
    const res = await callGetPost(postId);
    if (res?.id) {
      dispatch(getCurrentPostAction(res));
      setNumberOfLikes(res.numberOfLikes);
      setIsLiked(res.isLiked);
      // const author = await callFetchUserById(res.authorId);
      const author = isManagementPost(res)
        ? await callGetGroup(post.authorId)
        : await callFetchUserById(post.authorId);
      dispatch(getCurrentAuthors(author));
      getComment();
      console.log("check list: ", commentsList);
      // console.log("comment: ", comment);
      setIsUpdate(false);
    }

    // console.log(res);
    // setPost(res);
  };

  useEffect(() => {
    getPostDetails();
    console.log(commentsList);
  }, [isUpdate]);

  useEffect(() => {
    getComment();
  }, [isUpdateComment]);

  const handleImageSlider = (type: string) => {
    // console.log(type);
    if (type === buttonType.PREV) {
      // console.log(0);
      if (mediaIndex === 0) {
        setMediaIndex(media.length - 1);
      } else {
        setMediaIndex(mediaIndex - 1);
      }
    } else {
      // console.log(1);
      if (mediaIndex === media.length - 1) {
        setMediaIndex(0);
      } else {
        setMediaIndex(mediaIndex + 1);
      }
    }
  };

  const handleLikePost = async () => {
    console.log(isLiked);

    const type = isLiked ? "unlike" : "like";
    setIsLiked(!isLiked);
    type === "like"
      ? setNumberOfLikes(numberOfLikes + 1)
      : setNumberOfLikes(numberOfLikes - 1);
    await callHandleLikePost(post.id, type);
    // console.log(">>>check res: ", res);
    // setIsUpdate(true);
  };

  const handleChangeCommentInput = (e) => {
    const value = e.target.value;
    setCommentInput(value);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("comment", commentInput);
    const req = {
      postId: post.id,
      comment: commentInput,
    };
    const res =
      post.type === assignmentStatus.PENDING
        ? await callTeacherComment(post.id, req)
        : await callCommentToPost(post.id, commentInput);
    setIsUpdateComment(true);
    // console.log(res);
    // console.log("press Enter");
    setCommentInput("");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsUpdate(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    router.push(`classroom/${classId}/pending-posts`);
  };

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const showRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const handleRejectOk = () => {
    setIsRejectModalOpen(false);
    setIsUpdate(true);
  };

  const handleRejectCancel = () => {
    setIsRejectModalOpen(false);
    router.push(`classroom/${classId}/pending-posts`);
  };

  const handlePost = async (postId: number, action: string) => {
    const res = await callHandlePendingPost(postId, action);
    console.log("action: ", res);
    if (res?.type === assignmentStatus.APPROVED) {
      console.log("ok");
      await showModal();
    } else {
      await showRejectModal();
    }
    // setIsUpdate(true);
    // console.log(">> check res: ", res);
  };

  const handlePinComment = async (commentId: number, type: string) => {
    type === "pin"
      ? await callPinComment(commentId)
      : await callUnpinComment(commentId);
    setIsUpdateComment(true);
  };

  console.log(theme[post.orientation]);

  return (
    <div>
      <div
        id={"post-detail"}
        className={
          "flex justify-center max-h-[80vh] h-[80vh] mx-[2vw] my-5 rounded-2xl pr-5 "
        }
        style={{
          "--orientation-color": theme[post.orientation]?.textColor,
          color: `${theme[post.orientation]?.textColor}`,
          // border: `1px solid ${theme[post.orientation]?.textColor}`,
        }}
      >
        {post?.medias?.length > 0 && (
          <div className={"w-full relative flex-col items-center"}>
            <div
              className={
                "my-auto absolute w-full flex items-center justify-center h-full z-[2]"
              }
            >
              <button
                className="p-2 "
                onClick={() => handleImageSlider(buttonType.PREV)}
              >
                <svg
                  className="h-12 w-12 hover:h-[4rem] hover:w-[4rem] duration-300 ease-in-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {media[mediaIndex].type.includes("image") ? (
                <img
                  alt="post's picture"
                  className={
                    "h-fit w-fit mx-auto rounded-2xl max-h-[100%] max-w-[100%] object-contain"
                  }
                  // style={{
                  //   width: "80%",
                  //   minWidth: "80%",
                  //   maxWidth: "80%",
                  //   height: "60%",
                  //   minHeight: "60%",
                  //   maxHeight: "60%",
                  // }}
                  width={"10000"}
                  height={"10000"}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${media[mediaIndex].id}`}
                ></img>
              ) : media[mediaIndex].type.includes("video") ? (
                <video
                  className={" mx-auto rounded-2xl"}
                  style={{
                    width: "80%",
                    minWidth: "80%",
                    maxWidth: "80%",
                    height: "60%",
                    minHeight: "300px",
                    // maxHeight: "60%",
                  }}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/stream/${media[mediaIndex].id}`}
                  controls
                />
              ) : media[mediaIndex].type.includes("pdf") ? (
                <div className="w-full h-full pl-[4vw]">
                  <div classNamw="w-min">
                    <GoogleDocsViewer
                      width="90%"
                      height="78vh"
                      // className={"h-full w-full overflow-y-scroll"}
                      // fileUrl={"http://www.minhupro.xyz/api/v1/media/fda06ddb-a7f7-4030-b22c-11f146813b91"}
                      fileUrl={file.url}
                    />
                  </div>
                </div>
              ) : (
                <p>Unsupported media type</p>
              )}
              <button
                className="p-2"
                onClick={() => handleImageSlider(buttonType.NEXT)}
              >
                <svg
                  className="h-12 w-12 hover:h-[4rem] hover:w-[4rem] duration-300 ease-in-out"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute w-full h-full px-10 flex justify-center items-center z-[1]">
              <Spin />
            </div>
            <div className={"flex mx-auto justify-center text-lg mt-[62%]"}>
              {/* <button onClick={() => handleImageSlider(buttonType.PREV)}>
                <IoIosArrowBack />
              </button> */}
              <p className={"mx-3"}>
                {mediaIndex + 1} / {media.length}
              </p>
              {/* <button onClick={() => handleImageSlider(buttonType.NEXT)}>
                <IoIosArrowForward />
              </button> */}
            </div>
          </div>
        )}
        <div
          className={
            "lg:max-w-[20%] max-w-[20%]  min-w-[30vw] h-[80vh] max-h-[80vh] w-max overflow-auto post-detail flex flex-col"
          }
        >
          <div
            className="flex flex-col relative max-h-full"
            style={{ flex: 1 }}
          >
            <div
              className="flex items-center mb-2 text-lg"
            // style={{ color: `${colors.green_3}` }}
            >
              {isManagementPost(post) ? (
                author?.students?.length &&
                author.students.map((student, index: number) =>
                  index != author.students.length - 1
                    ? student.lastName + " " + student.firstName + ", "
                    : student.lastName + " " + student.firstName,
                )
              ) : (
                <>
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${author.avatarId}`}
                    className="mr-3"
                  />
                  <p className="inline-block ">
                    {author.lastName + " " + author.firstName}
                  </p>
                </>
              )}
              <p className="inline-block ">
                {/*{isManagementPost(post)*/}
                {/*  ? displayGroupAuthor(post)*/}
                {/*  : post.user.lastName + " " + post.user.firstName}*/}
              </p>
            </div>
            <h4
              className={"uppercase font-bold text-2xl text-center my-5"}
            // style={{ color: `${colors.green_3}` }}
            >
              {post.title}
            </h4>

            <div
              className={"text-lg text-justify inline-block post-detail"}
              style={{ overflowY: "scroll" }}
              dangerouslySetInnerHTML={{ __html: post.caption }}
            />

            <div
              className="flex flex-col relative max-w-full"
              style={{ flex: 1 }}
            >
              <div className="flex">
                {post.type != assignmentStatus.PENDING ? (
                  isLiked ? (
                    <IoIosHeart
                      className={"w-6 h-6"}
                      style={{ color: `${theme[post.orientation]?.textColor}` }}
                      onClick={handleLikePost}
                    />
                  ) : (
                    <IoIosHeartEmpty
                      className={"w-6 h-6"}
                      style={{ color: `${theme[post.orientation]?.textColor}` }}
                      onClick={handleLikePost}
                    />
                  )
                ) : null}
                {post.type != assignmentStatus.PENDING && (
                  <p className={" text-base ml-2"}>{numberOfLikes}</p>
                )}
              </div>
              <div>
                {post.type != assignmentStatus.PENDING &&
                  commentsList?.length > 0 &&
                  commentsList.map((comment) => (
                    <div
                      key={comment.id}
                      className={`my-1.5 bg-${theme[post.orientation]?.lightColor} rounded-2xl p-2 w-full text-wrap break-words`}
                      style={{
                        backgroundColor: `${theme[post.orientation]?.lightColor}`,
                      }}
                    >
                      <div className={"flex flex-row justify-between"}>
                        <div className={"flex flex-row"}>
                          <Avatar
                            size={42}
                            icon={<UserOutlined />}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${comment.userAvatarId}`}
                            className="mr-2.5"
                          />
                          <Col>
                            <p className="font-semibold text-base">
                              {comment.userLastName +
                                " " +
                                comment.userFirstName}
                            </p>
                            <p className="text-gray-500">
                              {FormatDateTime(comment.postTime)}
                            </p>
                          </Col>
                        </div>
                        {user.id === post.submitterId ? (
                          comment?.isPinned === true ? (
                            <AiFillPushpin
                              className={"cursor-pointer h-5 w-5"}
                              onClick={() =>
                                handlePinComment(comment.id, "unpin")
                              }
                            />
                          ) : (
                            <AiOutlinePushpin
                              className={"cursor-pointer h-5 w-5"}
                              onClick={() =>
                                handlePinComment(comment.id, "pin")
                              }
                            />
                          )
                        ) : null}
                      </div>
                      <p
                        className={"mt-3  ml-12 max-w-full"}
                        style={{ textWrap: "wrap" }}
                      >
                        {comment.content}
                      </p>
                    </div>
                  ))}
              </div>

              <div
                className={"mb-7 flex w-full mt-auto items-end"}
              // style={{
              //   position: "absolute",
              //   bottom: "2.5rem",
              //   // right: "5rem",
              // }}
              >
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`}
                  className="mr-3"
                />
                <div className={"flex flex-row items-end w-full sticky"}>
                  <textarea
                    ref={textAreaRef}
                    value={commentInput}
                    onInput={handleInput}
                    className={
                      "w-[90%]  bg-transparent rounded-3xl py-2 px-7 text-black placeholder-black outline-none"
                    }
                    style={{
                      border: `1px solid ${theme[post.orientation]?.textColor}`,
                      height: textAreaHeight,
                      overflow: "hidden",
                    }}
                    placeholder={
                      post.type === assignmentStatus.PENDING
                        ? "Thêm góp ý cho bài nộp của học sinh..."
                        : "Thêm bình luận..."
                    }
                    onChange={(e) => handleChangeCommentInput(e)}
                  // onKeyPress={}
                  // onKeyDown={(e) => e.key === "Enter" && handleEnter(e)}
                  />
                  <FaRegPaperPlane
                    className={`w-8 h-8 ml-3 cursor-pointer text-{${theme[post.orientation]?.textColor}}`}
                    onClick={(e) => handleComment(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {post.type === assignmentStatus.PENDING && user.role === ROLE_TEACHER && (
        <div className={"flex flex-row justify-center"}>
          <button
            className="bg-white text-purple_5 border-[2px] border-purple_5 px-3 py-1 mr-2 rounded font-bold"
            onClick={() => handlePost(post.id, "reject")}
          >
            CHƯA ĐẠT
          </button>
          <button
            className="bg-purple_7 text-white px-6 py-1 mr-2 rounded font-bold"
            onClick={() => handlePost(post.id, "approve")}
          >
            DUYỆT
          </button>
          <Modal
            title="Duyệt bài thành công"
            open={isModalOpen}
            onOk={handleOk}
            okButtonProps={{
              style: {
                backgroundColor: colors.purple_7,
                color: "white",
                borderRadius: "8px",
                padding: "0.25rem 1rem",
                fontWeight: "bold",
              },
            }}
            okText={"Xem bài đăng"}
            onCancel={handleCancel}
            cancelButtonProps={{
              style: {
                backgroundColor: "white",
                color: colors.pink_5,
                borderRadius: "8px",
                padding: "0.25rem 1rem",
                border: `2px solid ${colors.purple_5}`,
                fontWeight: "bold",
              },
            }}
            cancelText={"Quay lại"}
          ></Modal>
          <Modal
            title="Bài làm chưa đạt"
            open={isRejectModalOpen}
            onOk={handleRejectOk}
            okButtonProps={{
              style: {
                backgroundColor: colors.purple_7,
                color: "white",
                borderRadius: "8px",
                padding: "0.25rem 1rem",
                fontWeight: "bold",
              },
            }}
            okText={"Xem bài đăng"}
            onCancel={handleRejectCancel}
            cancelButtonProps={{
              style: {
                backgroundColor: "white",
                color: colors.purple_5,
                borderRadius: "8px",
                padding: "0.25rem 1rem",
                border: `2px solid ${colors.purple_5}`,
                fontWeight: "bold",
              },
            }}
            cancelText={"Quay lại"}
          ></Modal>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
