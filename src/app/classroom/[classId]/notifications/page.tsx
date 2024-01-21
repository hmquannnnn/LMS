"use client"


import {createNotification, getClass, getNotification} from "@/apis/classAPI";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentClassAction, getNotificationsAction} from "@/redux/slices/classSlice";
import {Col, Row} from "antd";
import {FormatDate} from "@/utils/formatDate";

const ClassNotification = (props: any) => {
    const dispatch = useDispatch();
    const classId = props.params.classId;
    const [notification, setNofification] = useState("");
    const [isUpdate, setIsUpdate] = useState(true);
    const classInfo = useSelector(state => state.classes?.currentClass?.classInfo || {});
    const notificationsList = useSelector(state => state.classes?.currentClass?.notifications || []);
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
        setNofification(message);
        console.log("check state: ", notification);
    }

    const handleEnter = async () => {
        const res = await createNotification(classId, notification);
        // console.log(res);
        setIsUpdate(true);
        setNofification("");
    }
    // console.log("check params: ", classId);
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
                            <div className={"border-[1px] mt-5 rounded-xl w-full px-5 py-3"}>
                                <p className={"font-semibold text-base"}>{classInfo.teacherLastName + " " + classInfo.teacherFirstName}</p>
                                <p className={"text-gray-500"}>{FormatDate(notification.postTime)}</p>
                                <p className={"mt-2"}>{notification.content}</p>
                            </div>


                        ))}
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default ClassNotification;