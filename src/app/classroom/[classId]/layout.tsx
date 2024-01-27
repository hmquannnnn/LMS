"use client"

import {ReactNode, useEffect} from "react";
import {Col, Row} from "antd";
import Link from "next/link";
import paths from "@/app/paths";
import {useParams} from "next/navigation";
import {getClass} from "@/apis/classAPI";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentClassAction} from "@/redux/slices/classSlice";

const ClassroomLayout = ({children}: { children: ReactNode }) => {
    // const classId = props.params.classId;

    // const router = useRouter();
    // // const { classid } = router.query;
    // console.log("check classId: ", router.query);
    // console.log("check params: ", params);
    const params = useParams();
    const dispatch = useDispatch();
    // console.log("check params: ", params);
    const classId = params.classId;
    const getClassDetails = async () => {
        const res = await getClass(classId);
        if (res?.id) {
            dispatch(getCurrentClassAction(res));
        }
    }
    useEffect(() => {
        getClassDetails();
    }, []);
    const currentClass = useSelector(state => state.classes.currentClass.classInfo);
    return (
        <>
            <Row className={"min-h-[82vh]"}>
                <Col className={"border-[1px]"} md={3}>
                    <p className={"text-2xl font-bold"}>{currentClass.name}</p>
                    <p>Teacher: {currentClass.teacherLastName + " " + currentClass.teacherFirstName}</p>
                </Col>
                <Col md={21}>
                    <Row className={"border-b-[1px]"} justify="space-around" align="middle">
                        <Col className={""} span={3}>
                            <Link href={`${paths.classroom}/${classId}/${paths.classroomNotifications}`}>Notifications</Link>
                        </Col>
                        <Col span={3}>
                            <Link href={`${paths.classroom}/${classId}/${paths.classroomAssignments}`}>Assignments</Link>
                        </Col>
                        <Col span={3}>
                            <Link href={`${paths.classroom}/${classId}/${paths.classroomMembers}`}>Members</Link>
                        </Col>
                        <Col span={3}>
                            <Link href={`${paths.classroom}/${classId}/${paths.appendingPosts}`}>Appending Posts</Link>
                        </Col>
                        <Col span={3}>
                            <Link href={`${paths.classroom}/${classId}/${paths.classroomOrientations}`}>Orientations</Link>
                        </Col>
                    </Row>
                    {children}
                </Col>
            </Row>

        </>
    )
}

export default ClassroomLayout;