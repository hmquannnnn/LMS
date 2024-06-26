"use client";

import {
  callCreateAssigment,
  callCreateNotification,
  callGetAssigment,
  callGetAssignmentStatusStudent,
  callGetClass,
} from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignmentsAction,
  getCurrentClassAction,
} from "@/redux/slices/classSlice";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import {
  assignmentStatus,
  colors,
  ROLE_STUDENT,
  ROLE_TEACHER,
} from "@/utils/constant";
import { MdCancel, MdPending } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import paths from "@/app/paths";
import AssignmentTypeSelector from "@/components/assignmentTypeSelector";
import { FaRegCalendarTimes } from "react-icons/fa";

export const statusPriority = {
  APPROVED: 4,
  PENDING: 3,
  REJECTED: 2,
  NOT_SUBMITTED: 1,
};

export const filterAndRemoveDuplicateAssignments = (assignments) => {
  const assignmentsMap = {};

  assignments.forEach((assignment) => {
    if (!assignmentsMap[assignment.id]) {
      assignmentsMap[assignment.id] = assignment;
    } else {
      const currentStatus = assignmentsMap[assignment.id].status;
      const newStatus = assignment.status;
      if (statusPriority[newStatus] > statusPriority[currentStatus]) {
        assignmentsMap[assignment.id] = assignment;
      }
    }
  });

  const filteredAssignments = Object.values(assignmentsMap);
  return filteredAssignments;
};

const isMissedTheDeadline = (date) => {
  const currentDate = new Date();
  const deadline = new Date(date);
  console.log(deadline, currentDate, deadline < currentDate);
  return deadline < currentDate;
};

const ClassAssignment = (props: any) => {
  const classId = props.params.classId;
  const dispatch = useDispatch();
  const router = useRouter();
  const classInfo = useSelector(
    (state) => state.classes?.currentClass?.classInfo || {},
  );
  const assignmentsList = useSelector(
    (state) => state.classes?.currentClass?.assignments?.assignmentsList || [],
  );
  const total = useSelector(
    (state) => state.classes?.currentClass?.assignments?.total || 0,
  );
  const user = useSelector((state) => state.account.user);
  const creatingAssigment = useSelector(
    (state) => state?.classes?.currentClass?.assignments?.creatingAssignment,
  );
  const userRole = user.role;
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    dueDateTime: "",
    isForGroup: false,
  });
  const [linkedDocumentId, setLinkedDocumentId] = useState(0);

  const [linkedDocument, setLinkedDocument] = useState({
    type: "",
    documentId: 0,
    relatedTestId: 0,
  });
  console.log("check link: ", linkedDocument);

  const getLinkedDocument = (linkedDocument) => {
    setLinkedDocument(linkedDocument);
    console.log(linkedDocument);
  };

  const getLinkDocumentId = (documentId) => {
    setLinkedDocumentId(documentId);
  };

  const getClassDetail = async () => {
    const classInfo = await callGetClass(classId);

    if (classInfo?.id) {
      dispatch(getCurrentClassAction(classInfo));
      if (userRole === ROLE_TEACHER) {
        const assignmentList = await callGetAssigment(classId);
        console.log(assignmentList);
        assignmentList.sort((a: object, b: object) => {
          return b.id - a.id;
        });
        dispatch(getAssignmentsAction(assignmentList));
      }
      if (userRole === ROLE_STUDENT) {
        const assignmentList = await callGetAssignmentStatusStudent(classId);
        const filteredAssignment =
          filterAndRemoveDuplicateAssignments(assignmentList);
        console.log("filter: ", filteredAssignment);
        filteredAssignment.sort((a: object, b: object) => {
          return b.id - a.id;
        });
        dispatch(getAssignmentsAction(filteredAssignment));
      }

      setUpdateFlag(true);
    }
  };

  useEffect(() => {
    getClassDetail();
  }, [updateFlag]);

  const editorRef = useRef(null);

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    document.getElementById("assignmentForm").reset();
    if (editorRef.current) {
      editorRef.current.setContent("<p>Nhập nội dung ở đây</p>");
    }
    setFormValues({
      title: "",
      content: "",
      dueDateTime: "",
      isForGroup: false,
    });
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const title = `BÀI TẬP ${assignmentsList.length + 1}: ${e.target.elements.title.value}`;
    // const content = e.target.elements.content.value;
    const content = editorRef.current.getContent() as string;
    const dueDateTime = e.target.elements.dueDateTime.value as string;
    const isForGroup = e.target.elements.isForGroup.value as boolean;
    console.log("c: ", isForGroup);

    const assignmentReq = {
      title: title,
      content: content,
      dueDateTime: dueDateTime,
      isForGroup: isForGroup,
      type: creatingAssigment?.type,
      documentId: creatingAssigment?.documentId,
      relatedTestId:
        creatingAssigment?.relatedTestId > 0
          ? creatingAssigment?.relatedTestId
          : null,
    };
    const res = await callCreateAssigment(classId, assignmentReq);
    console.log("check: ", res);
    setUpdateFlag(false);
    setIsModalOpen(false);
    if (res.status === "success") {
      console.log(Boolean(isForGroup));
      const type = Boolean(isForGroup) == true ? "Nhóm" : "Cá nhân";

      const content = `${title}`;
      const noti = await callCreateNotification(classId, content);
      setSuccessModalVisible(true);
      // Clear form values
      setFormValues({
        title: "",
        content: "",
        dueDateTime: "",
        isForGroup: false,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openSubmitForm = () => {
    setShowSubmitForm(true);
  };

  const handleCloseSubmit = () => {
    setShowSubmitForm(false);
  };

  return (
    <>
      <Row>
        {userRole === ROLE_TEACHER && (
          <Col span={5} className={"pr-5"}>
            <button
              className={
                "border-[1px] bg-blue_5 text-blue_6 rounded-xl w-full text-center py-3 font-bold"
              }
              onClick={showModal}
            >
              Thêm bài tập
            </button>
            <Modal
              title={"Thêm bài tập"}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <form id={"assignmentForm"} onSubmit={handleCreateAssignment}>
                <div>
                  <input
                    type={"text"}
                    name={"title"}
                    placeholder={"Tiêu đề"}
                    className="border-[1px] rounded w-full px-4 py-1 mb-3"
                    defaultValue={""}
                  />
                  <Editor
                    name="caption"
                    apiKey="ty6mn9smak440qi6gv53qqivqdulai6ja9wl6ao0bt12odwr"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>Nhập nội dung ở đây</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                  <AssignmentTypeSelector
                    sendLinkedDocument={getLinkedDocument}
                    linkedDocument={linkedDocument}
                  />

                  <label htmlFor="deadline" className={"my-3"}>
                    Hạn nộp
                  </label>
                  <input
                    id={"deadline"}
                    type={"datetime-local"}
                    name={"dueDateTime"}
                    className={"border-[1px] w-full px-4 py-1 rounded mb-3"}
                    defaultValue={""}
                  />
                  <div>
                    <label htmlFor={"type"} className={"mb-3 w-full my-3"}>
                      Hình thức
                    </label>
                    <select
                      id={"type"}
                      name={"isForGroup"}
                      className={"px-4 py-1 rounded border-[1px] ml-3"}
                      defaultValue={"false"}
                    >
                      <option value={"false"}>Cá nhân</option>
                      <option value={"true"}>Nhóm</option>
                    </select>
                  </div>

                  <button
                    type={"submit"}
                    className="border-[1px] bg-blue_9 text-white rounded w-full text-center py-1 font-bold mt-3"
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </Modal>
            <Modal
              title="Tạo bài tập thành công"
              visible={successModalVisible}
              onCancel={handleSuccessModalClose}
              footer={[
                <Button key="back" onClick={handleSuccessModalClose}>
                  Quay lại
                </Button>,
              ]}
            >
              <p>Bài tập đã được tạo thành công!</p>
            </Modal>
          </Col>
        )}

        <Col span={19} className={"mx-auto pl-16"}>
          {userRole === ROLE_STUDENT && (
            <Row className={"mb-5 w-full"}>
              <Col span={21} className={"flex items-center justify-center"}>
                <p>Bài tập</p>
              </Col>
              <Col span={3} className={"flex items-center justify-center"}>
                <p>Tình trạng</p>
              </Col>
            </Row>
          )}

          {assignmentsList.map((assignment) => (
            <>
              <Row key={assignment.id} className={"mb-5 w-full"}>
                <Col
                  span={21}
                  className={"rounded-xl px-5 py-3 bg-purple_4 cursor-pointer"}
                  onClick={() =>
                    router.push(
                      `${paths.classroom}/${classId}/${paths.classroomAssignments}/${assignment.id}`,
                    )
                  }
                >
                  <p
                    className={"font-bold"}
                    style={{
                      color: `${colors.purple_5}`,
                      textTransform: "uppercase",
                    }}
                  >
                    {assignment.title}
                  </p>

                  <div
                    dangerouslySetInnerHTML={{ __html: assignment.content }}
                  />
                </Col>
                <Col span={3} className={"flex items-center"}>
                  {user.role === ROLE_STUDENT && (
                    <>
                      {assignment.status === assignmentStatus.APPROVED ? (
                        <FaCheck
                          className={"text-green-500 mx-auto text-4xl"}
                        />
                      ) : assignment.status === assignmentStatus.PENDING ? (
                        <MdPending
                          className={"text-yellow-400  mx-auto text-4xl"}
                        />
                      ) : assignment.status === assignmentStatus.REJECTED ? (
                        <MdCancel
                          className={"text-orange-500 mx-auto text-4xl"}
                        />
                      ) : assignment.status ===
                          assignmentStatus.NOT_SUBMITTED &&
                        isMissedTheDeadline(assignment.dueDateTime) ? (
                        <FaRegCalendarTimes
                          className={"text-red-600 mx-auto text-4xl"}
                        />
                      ) : null}
                    </>
                  )}
                </Col>
              </Row>
            </>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ClassAssignment;
