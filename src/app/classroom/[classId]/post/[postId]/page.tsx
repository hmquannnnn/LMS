"use client";
import { callGetPost, callHandlePendingPost } from "@/apis/classAPI";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentAuthors,
  getCurrentPostAction,
} from "@/redux/slices/postSlice";
import { assignmentStatus } from "@/utils/constant";
import { Avatar, Col, Spin } from "antd";
import { callFetchUserById, callGetGroup } from "@/apis/userAPI";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";
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
  const [commentInput, setCommentInput] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const textAreaRef = useRef(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<string>({ url: "" });
  const [commentsList, setCommentsList] = useState([]);
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

  const getPostDetails = async () => {
    const res = await callGetPost(postId);
    if (res?.id) {
      dispatch(getCurrentPostAction(res));
      // const author = await callFetchUserById(res.authorId);
      const author = isManagementPost(res)
        ? await callGetGroup(post.authorId)
        : await callFetchUserById(post.authorId);
      dispatch(getCurrentAuthors(author));
      const comment = await callGetPostComments(postId);
      const sortedComment = await comment.sort((a, b) => {
        return new Date(b.postTime) - new Date(a.postTime);
      });
      await setCommentsList(comment);
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
    // console.log(post.isLiked);

    const type = post.isLiked ? "unlike" : "like";
    const res = await callHandleLikePost(post.id, type);
    // console.log(">>>check res: ", res);
    setIsUpdate(true);
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
    setIsUpdate(true);
    // console.log(res);
    // console.log("press Enter");
    setCommentInput("");
  };

  const handlePost = async (postId: number, action: string) => {
    const res = await callHandlePendingPost(postId, action);
    setIsUpdate(true);
    console.log(">> check res: ", res);
  };

  const handlePinComment = async (commentId: number, type: string) => {
    type === "pin"
      ? await callPinComment(commentId)
      : await callUnpinComment(commentId);
    setIsUpdate(true);
  };

  console.log(theme[post.orientation]);

  return (
    <div
      id={"post-detail"}
      className={
        "flex justify-center max-h-[80vh] h-[80vh] mx-[2vw] my-5 rounded-2xl pr-5 "
      }
      // style={{
      //   border: `1px solid ${theme[post.orientation]?.textColor}`,
      //   color: `${theme[post.orientation]?.textColor}`,
      //   --orientation-color: theme[post.orientation]?.textColor
      // }}
      style={{
        "--orientation-color": theme[post.orientation]?.textColor,
        color: `${theme[post.orientation]?.textColor}`,
        border: `1px solid ${theme[post.orientation]?.textColor}`,
      }}
    >
      {/* <Document className={"h-full overflow-y-scroll"} file={file.url} onLoadSuccess={onDocumentLoadSuccess}> */}
      {/* <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} canvasBackground='white' /> */}
      {/* {Array.from(
            new Array(numPages),
            (el, index) => (
              <Page
                renderTextLayer={false} renderAnnotationLayer={false} canvasBackground='white'
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ),
          )} */}
      {/* </Document> */}
      {/* <div>
                      Page {pageNumber} of {numPages}
                    </div> */}
      {/* <div>
                      <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                      </p>
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                      >
                        Next
                      </button>
                    </div> */}
      {post?.medias?.length > 0 && (
        <div className={"w-full relative flex-col items-center"}>
          <div
            className={
              "my-auto absolute w-full px-10 flex items-center justify-center h-full z-[2]"
            }
          >
            {media[mediaIndex].type.includes("image") ? (
              <img
                alt="Author's avatar"
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
              />
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
              <div className="w-full h-full ">
                <GoogleDocsViewer
                  width="60%"
                  height="78vh"
                  // className={"h-full w-full overflow-y-scroll"}
                  // fileUrl={"http://www.minhupro.xyz/api/v1/media/fda06ddb-a7f7-4030-b22c-11f146813b91"}
                  fileUrl={file.url}
                />
              </div>
            ) : (
              <p>Unsupported media type</p>
            )}
          </div>
          <div className="absolute w-full h-full px-10 flex justify-center items-center z-[1]">
            <Spin />
          </div>
          <div className={"flex mx-auto justify-center text-lg mt-[62%]"}>
            <button onClick={() => handleImageSlider(buttonType.PREV)}>
              <IoIosArrowBack />
            </button>
            <p className={"mx-3"}>
              {mediaIndex + 1} / {media.length}
            </p>
            <button onClick={() => handleImageSlider(buttonType.NEXT)}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
      <div
        className={
          "max-w-[800px] min-w-[30vw] h-[80vh] max-h-[80vh] w-max overflow-auto px-10 py-10 pr-20 post-detail flex flex-col"
        }
      >
        <div className="flex flex-col relative max-h-full" style={{ flex: 1 }}>
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

          {post.type === assignmentStatus.PENDING && (
            <div className={"flex flex-row"}>
              <button
                className="bg-red-500 text-white px-3 py-1 mr-2 rounded"
                onClick={() => handlePost(post.id, "reject")}
              >
                CHƯA ĐẠT
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                onClick={() => handlePost(post.id, "approve")}
              >
                DUYỆT
              </button>
            </div>
          )}
          <div
            className="flex flex-col relative max-w-full"
            style={{ flex: 1 }}
          >
            <div className="flex">
              {post.type != assignmentStatus.PENDING && post.isLiked ? (
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
              )}
              <p className={" text-base ml-2"}>{post.numberOfLikes}</p>
            </div>
            <div className={"max-h-[50%] overflow-y-scroll"}>
              {post.type != assignmentStatus.PENDING &&
                commentsList?.length > 0 &&
                commentsList.map((comment) => (
                  <div
                    className={`my-1.5 bg-${theme[post.orientation]?.lightColor} rounded-2xl p-2 w-full text-wrap break-words overflow-y-scroll`}
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
                            {comment.userLastName + " " + comment.userFirstName}
                          </p>
                          <p className="text-gray-500">
                            {FormatDateTime(comment.postTime)}
                          </p>
                        </Col>
                      </div>
                      {comment?.isPinned === true ? (
                        <AiFillPushpin
                          className={"cursor-pointer h-5 w-5"}
                          onClick={() => handlePinComment(comment.id, "unpin")}
                        />
                      ) : (
                        <AiOutlinePushpin
                          className={"cursor-pointer h-5 w-5"}
                          onClick={() => handlePinComment(comment.id, "pin")}
                        />
                      )}
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
  );
};

export default PostDetails;
