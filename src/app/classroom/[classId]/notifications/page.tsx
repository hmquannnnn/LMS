"use client";

import { UserOutlined } from "@ant-design/icons";
import {
  callCreateNotification,
  callGetClass,
  callGetNotification,
} from "@/apis/classAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentClassAction,
  getNotificationsAction,
} from "@/redux/slices/classSlice";
import { Avatar, Col, Divider, Row } from "antd";
import { FormatDate, FormatDateTime } from "@/utils/formatDate";
import {
  callGetAllNotificationComments,
  callReplyNotification,
} from "@/apis/commentsAPI";
import { colors } from "@/utils/constant";
import { IoPeopleSharp } from "react-icons/io5";

type CommentInputs = {
  [key: number]: string;
};

type NotificationWithComments = {
  notificationId: number;
  showComments: boolean;
  comments: any[];
};

const ClassNotification = (props: any) => {
  const dispatch = useDispatch();
  const [classId, setClassId] = useState(props.params.classId);
  const [notification, setNotification] = useState("");
  const [comment, setComment] = useState<CommentInputs>({});
  const [notificationsWithComments, setNotificationsWithComments] = useState<
    NotificationWithComments[]
  >([]);
  const classInfo = useSelector(
    (state) => state.classes?.currentClass?.classInfo || {},
  );
  const notificationList = useSelector(
    (state) => state.classes?.currentClass?.notifications || null,
  );
  const user = useSelector((state) => state.account.user);

  const getClassDetail = async () => {
    setClassId(props.params.classId);
    const res = await callGetClass(classId);
    if (res) {
      dispatch(getCurrentClassAction(res));
      const notificationList = await callGetNotification(classId);
      notificationList.sort((a: object, b: object) => {
        return new Date(b.postTime) - new Date(a.postTime);
      });
      dispatch(getNotificationsAction(notificationList));

      const initialNotificationsWithComments = notificationList.map(
        (notification) => ({
          notificationId: notification.id,
          showComments: false,
          comments: [],
        }),
      );
      setNotificationsWithComments(initialNotificationsWithComments);
    }
  };

  useEffect(() => {
    getClassDetail();
  }, []);

  const handleInputChange = (e) => {
    const message = e.target.value;
    setNotification(message);
  };

  const handleChangeComment = (e, notificationId: number) => {
    const message = e.target.value;
    setComment((prevInputs) => ({
      ...prevInputs,
      [notificationId]: message,
    }));
  };

  const handleEnter = async () => {
    const res = await callCreateNotification(classId, notification);
    if (res) {
      getClassDetail();
      setNotification("");
    }
  };

  const handleEnterReply = async (notificationId: number) => {
    const content = comment[notificationId];
    if (content.trim() !== "") {
      const res = await callReplyNotification(notificationId, content);
      if (res) {
        getClassDetail();
        setComment((prevInputs) => ({
          ...prevInputs,
          [notificationId]: "",
        }));
      }
    }
  };

  const toggleShowComments = (notificationId: number) => {
    setNotificationsWithComments((prevState) => {
      return prevState.map((notification) => {
        if (notification.notificationId === notificationId) {
          return {
            ...notification,
            showComments: !notification.showComments,
          };
        }
        return notification;
      });
    });
  };

  const handleSeeAllComments = async (notificationId: number) => {
    toggleShowComments(notificationId);
    const notificationIndex = notificationsWithComments.findIndex(
      (notification) => notification.notificationId === notificationId,
    );
    if (
      notificationIndex !== -1 &&
      notificationsWithComments[notificationIndex].comments.length === 0
    ) {
      const comments = await callGetAllNotificationComments(notificationId);
      const sortedComments = comments.sort((a, b) => {
        return new Date(b.postTime) - new Date(a.postTime);
      });
      setNotificationsWithComments((prevState) => {
        return prevState.map((notification) => {
          if (notification.notificationId === notificationId) {
            return {
              ...notification,
              comments: sortedComments,
            };
          }
          return notification;
        });
      });
    }
  };

  return (
    <>
      <div className={"w-3/5 mx-auto"}>
        <Row>
          <Col className={"h-28 place-items-start pr-5"} span={5}>
            <div className={"border-[1px] h-full pt-2 pl-4 rounded-xl"}>
              <p className={"text-lg font-semibold mb-6"}>Class code</p>
              <p className={"text-2xl font-bold text-blue_5"}>
                {classInfo.code}
              </p>
            </div>
          </Col>
          <Col span={19}>
            <input
              type={"text"}
              placeholder={"Announce something to your class"}
              value={notification}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleEnter()}
              className={"border-[1px] w-full rounded-xl px-5 py-3"}
            />
            {notificationList.map((notification) => (
              <>
                <div
                  key={notification.id}
                  className={`mt-5 rounded-xl w-full py-3 bg-[${colors.blue_6}]`}
                  style={{ backgroundColor: `${colors.blue_6}` }}
                >
                  <div className="px-5">
                    <Row>
                      <Avatar
                        size={48}
                        icon={<UserOutlined />}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${notification.authorAvatarId}`}
                        className="mr-3"
                      />
                      <Col>
                        <Row>
                          <p
                            className={"font-semibold text-lg mr-1"}
                            style={{ color: `${colors.blue_5}` }}
                          >
                            {classInfo.teacherLastName +
                              " " +
                              classInfo.teacherFirstName}
                          </p>
                          <p
                            className={"relative top-[5px]"}
                            style={{ color: `${colors.blue_5}` }}
                          >
                            {" "}
                            đã đăng một thông báo
                          </p>
                        </Row>

                        <p className={"text-gray-500"}>
                          {FormatDate(notification.postTime)}
                        </p>
                      </Col>
                    </Row>
                    <div
                      dangerouslySetInnerHTML={{ __html: notification.content }}
                    />
                  </div>
                  <Divider className="w-full my-3" />
                  <div className="px-5">
                    {notification.lastComment?.id ? (
                      <>
                        <Row className={"mb-2"}>
                          <IoPeopleSharp
                            className={"relative my-auto h-5 w-5"}
                          />
                          <div
                            className={"cursor-pointer text-base ml-2"}
                            onClick={() =>
                              handleSeeAllComments(notification.id)
                            }
                          >
                            See all comments
                          </div>
                        </Row>
                      </>
                    ) : null}

                    {/* All comments  */}
                    {notificationsWithComments.find(
                      (notif) => notif.notificationId === notification.id,
                    )?.showComments &&
                      notificationsWithComments
                        .find(
                          (notif) => notif.notificationId === notification.id,
                        )
                        ?.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className={"mx-3 bg-blue-50 rounded-3xl p-2 mb-2"}
                          >
                            <Row>
                              <Avatar
                                size={42}
                                icon={<UserOutlined />}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${comment.userAvatarId}`}
                                className="mr-2.5"
                              />
                              <Col>
                                <p className="font-semibold text-base text-gray-800">
                                  {comment.userLastName +
                                    " " +
                                    comment.userFirstName}
                                </p>
                                <p className="text-gray-500">
                                  {FormatDateTime(comment.postTime)}
                                </p>
                              </Col>
                            </Row>
                            <p className={"mt-3 ml-12"}>{comment.content}</p>
                          </div>
                        ))}

                    {/*Last comment  */}
                    {notification.lastComment?.id &&
                      !notificationsWithComments.find(
                        (notif) => notif.notificationId === notification.id,
                      )?.showComments ? (
                      <>
                        <div className="mx-3 bg-blue-50 rounded-3xl p-2 ">
                          <Row>
                            <Avatar
                              size={42}
                              icon={<UserOutlined />}
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${notification.lastComment.userAvatarId}`}
                              className="mr-2.5"
                            />
                            <Col>
                              <p className="font-semibold text-base text-gray-800">
                                {notification.lastComment.userLastName +
                                  " " +
                                  notification.lastComment.userFirstName}
                              </p>
                              <p className="text-gray-500">
                                {FormatDateTime(
                                  notification.lastComment.postTime,
                                )}
                              </p>
                            </Col>
                          </Row>
                          <p className={"mt-3  ml-12"}>
                            {notification.lastComment.content}
                          </p>
                        </div>
                      </>
                    ) : null}
                    <input
                      placeholder="Add comment"
                      type="text"
                      value={comment[notification.id] || ""}
                      onChange={(e) => handleChangeComment(e, notification.id)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleEnterReply(notification.id)
                      }
                      className={
                        "border-[1px] w-full rounded-3xl px-5 py-3 mt-3"
                      }
                    />
                  </div>
                </div>
              </>
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassNotification;
