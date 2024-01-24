"use client"


import {createNotification, getClass, getNotification} from "@/apis/classAPI";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentClassAction, getNotificationsAction} from "@/redux/slices/classSlice";
import {Col, Divider, Row} from "antd";
import {FormatDate} from "@/utils/formatDate";
import { replyNotification } from "@/apis/commentsAPI";

const ClassNotification = (props: any) => {
    const dispatch = useDispatch();
    const classId = props.params.classId;
    const [notification, setNotification] = useState("");
    const [comment, setComment] = useState("");
    const [isUpdate, setIsUpdate] = useState(true);
    const classInfo = useSelector(state => state.classes?.currentClass?.classInfo || {});
    const notificationsList = useSelector(state => state.classes?.currentClass?.notifications || []);
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    const getClassDetail = async () => {
        const res = await getClass(classId);
        if (res?.id) {
            dispatch(getCurrentClassAction(res));
            const notificationList = await getNotification(res.id);
            notificationList.sort((a: object, b: object) => {
                return new Date(b.postTime) - new Date(a.postTime);
            })
            dispatch(getNotificationsAction(notificationList));
            setIsUpdate(false);
        }
    }
    useEffect(() => {
        getClassDetail();
    }, [isUpdate]);

    const handleInputChange = (e) => {
        const message = e.target.value;
        setNotification(message);
        // console.log("check state: ", notification);
    }

    const handleChangeComment = (e) => {
        const message = e.target.value;
        setComment(message);
    }

    const handleEnter = async () => {
        const res = await createNotification(classId, notification);
        setIsUpdate(true);
        setNotification("");
    }

    const handleEnterReply = async(notificationId: number) => {
        const content = comment;
        const res = await replyNotification(notificationId, content);
        setIsUpdate(true);
    }
    
    return (
        <>
            <div className={"w-3/5 mx-auto"}>
                <div className={"bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"}>
                    <p className={"text-3xl font-bold text-white"}>Notifications</p>
                </div>
                <Row>
                    <Col className={"h-28 place-items-start pr-5"} span={5}>
                        <div className={"border-[1px] h-full pt-2 pl-4 rounded-xl"}>
                            <p className={"text-lg font-semibold mb-6"}>Class code</p>
                            <p className={"text-2xl font-bold text-rose-500"}>{classInfo.code}</p>
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
                        {notificationsList.map(notification => (
                            <>
                                <div key={notification.id} className={"border-[1px] mt-5 rounded-xl w-full py-3"}>
                                    <div className="px-5">
                                        <p className={"font-semibold text-lg"}>{classInfo.teacherLastName + " " + classInfo.teacherFirstName}</p>
                                        <p className={"text-gray-500"}>{FormatDate(notification.postTime)}</p>
                                        <p className={"mt-2"}>{notification.content}</p>
                                    </div>
                                    <Divider className="w-full"/>
                                    <div className="px-5">
                                        {notification.lastComment?.id ? <>
                                        <div>
                                            <Row>
                                                <p className="font-semibold text-base text-gray-800">{notification.lastComment.userLastName + " " + notification.lastComment.userFirstName}</p>
                                                <p className="inline-block align-middle">{notification.lastComment.postTime.slice(11, 16)}</p>
                                            </Row>
                                            <p>{notification.lastComment.content}</p>
                                        </div>
                                        <input 
                                            placeholder="Add comment"
                                            type="text" 
                                            value={comment} 
                                            onChange={handleChangeComment} 
                                            onKeyPress={(e) => e.key === "Enter" && handleEnterReply(notification.id)} 
                                            className={"border-[1px] w-full rounded-3xl px-5 py-3"}
                                        />
                                        </> : null}
                                        
                                    </div>
                                </div>
                            </> 
                        ))}
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default ClassNotification;