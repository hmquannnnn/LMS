"use client"

import {createAssigment, createNotification, getAssigment, getClass, submitAssignment} from "@/apis/classAPI";
import {useDispatch, useSelector} from "react-redux";
import {getAssignmentsAction, getCurrentClassAction} from "@/redux/slices/classSlice";
import {useEffect, useState} from "react";
import {Col, Modal, Row} from "antd";
import instance from "@/utils/axiosCustomize";

const ClassAssignment = (props: any) => {
    const classId = props.params.classId;
    const dispatch = useDispatch();
    const classInfo = useSelector(state => state.classes?.currentClass?.classInfo || {});
    const assignmentsList = useSelector(state => state.classes?.currentClass?.assignments?.assignmentsList || []);
    const total = useSelector(state => state.classes?.currentClass?.assignments?.total || 0);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [newAssignment, setNewAssignment] = useState(false);
    const getClassDetail = async () => {
        const classInfo = await getClass(classId);
        if (classInfo?.id) {
            dispatch(getCurrentClassAction(classInfo));
            const assignmentList = await getAssigment(classInfo.id);
            // console.log(">>>check assignments: ", assignmentsList);
            dispatch(getAssignmentsAction(assignmentList));
            setUpdateFlag(true);
        }
    }
    useEffect(() => {
        getClassDetail();
    }, [updateFlag]);
    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const content = e.target.elements.content.value;
        const dueDateTime = e.target.elements.dueDateTime.value;
        const assignmentReq = {
            title: title,
            content: content,
            dueDateTime: dueDateTime,
            isForGroup: true
        }
        const res = await createAssigment(classId, assignmentReq);
        setUpdateFlag(false);
        setIsModalOpen(false);
        const notificationContent = `ASSIGNMENT: ${title} - ${content}`;
        await createNotification(classId, notificationContent);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>, assignmentId: number) => {
        console.log("ok");
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const files = formData.get("files") as unknown;
        const caption = formData.get("caption") as string;
        const orientation = formData.get("orientation") as string;
        const req = {
            files: files,
            caption: caption,
            orientation: orientation
        }
        console.log(">>> check req: ", req);
        instance.defaults.headers.common = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
        };
        const res = await submitAssignment(assignmentId, req);
        // console.log(">>> check submit: ", res);
        // console.log(file);
        // const file = e.target.elements.files.files;
        // console.log(file[0]);
    }


    return (
        <>
            <div className={"w-3/5 mx-auto"}>
                <div className={"bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"}>
                    <p className={"text-3xl font-bold text-white"}>Assignment</p>
                </div>

                <Row>
                    <Col span={5} className={"pr-5"}>
                        <button
                            className={"border-[1px] bg-red-500 text-white rounded-xl w-full text-center py-3 font-bold"}
                            onClick={showModal}
                        >
                            Add assignment
                        </button>
                        <Modal 
                            title={"Add assignment"} 
                            open={isModalOpen} 
                            onCancel={handleCancel} 
                            footer={null}
                        >
                            <form onSubmit={handleCreateAssignment}>
                                <div>
                                    <input type={"text"} name={"title"} placeholder={"Title"} className="border-[1px] rounded w-full px-4 py-1 mb-3"/>
                                    <input type={"text"} name={"content"} placeholder={"Content"} className="border-[1px] rounded w-full px-4 py-1 mb-3"/>
                                    <input type={"datetime-local"} name={"dueDateTime"}/>
                                    <button type={"submit"} className="border-[1px] bg-red-500 text-white rounded w-full text-center py-1 font-bold">Submit</button>
                                </div>

                            </form>
                        </Modal>
                    </Col>
                    <Col span={19}>
                        {assignmentsList.map(assignment => (
                            <>
                                <div className={"border-[1px] mb-5 rounded-xl w-full px-5 py-3"}>
                                    <p className={"font-bold"}>Title: {assignment.title}</p>
                                    <p>Content: {assignment.content}</p>
                                </div>
                                <div>
                                    <form onSubmit={(e) => handleSubmit(e, assignment.id)}>
                                        <input name="files" type="file" multiple />
                                        <input name="caption" type="text" className="border-[1px]" placeholder="caption"/>
                                        <select name="orientation" id="orientation">
                                            <option value="TECHNIQUE">TECHNIQUE</option>
                                            <option value="MAJOR">MAJOR</option>
                                            <option value="RESEARCH">RESEARCH</option>
                                            <option value="SOCIAL">SOCIAL</option>
                                            <option value="MANAGEMENT">MANAGEMENT</option>
                                            <option value="ART"> ART</option>
                                        </select>
                                        <button type="submit" className="border-[1px]">Submit</button>
                                    </form>
                                </div>
                            </>
                            
                        ))}
                    </Col>
                </Row>


                
            </div>
        </>
    )
}

export default ClassAssignment;