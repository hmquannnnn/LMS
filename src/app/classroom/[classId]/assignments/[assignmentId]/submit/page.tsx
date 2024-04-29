"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  assignmentTypes,
  Orientations,
  ROLE_STUDENT,
  ROLE_TEACHER,
} from "@/utils/constant";
import {
  callGetAssigment,
  callGetAssignmentById,
  callGetStudentsList,
  callSubmitAssignment,
} from "@/apis/classAPI";
import {
  getCurrentAssignment,
  getMembersWithoutStatusAction,
} from "@/redux/slices/classSlice";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Row,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { UserOutlined } from "@ant-design/icons";
import { MdOutlineCancel } from "react-icons/md";
import {
  callGetDocumentById,
  callGetDocumentCounselling,
} from "@/apis/documentsAPI";
import Link from "next/link";
import { theme } from "@/app/classroom/[classId]/orientations/[orientationName]/page";

interface MembersItem {
  key: number;
  label: JSX.Element;
}

type Teammate = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  dateOfBirth: string;
  avatarId: string;
};

const initalCounselling = {
  id: null,
  title: "",
  content: "",
  createAt: "",
  documentId: 0,
  orientation: "",
};

const SubmissionPage = (props: any) => {
  const classId = Number(props.params.classId);
  const assignmentId = Number(props.params.assignmentId);
  const user = useSelector((state) => state.account.user);
  const currentAssignment = useSelector(
    (state) =>
      state?.classes?.currentClass?.assignments?.currentAssignment || {},
  );
  const members = useSelector(
    (state) => state?.classes?.currentClass?.members?.student || [],
  );
  // console.log(members);
  console.log(currentAssignment);
  const dispatch = useDispatch();
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [membersMenu, setMembersMenu] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [document, setDocument] = useState(null);
  // const [teammate, setTeammate] = useState([]);
  const teammate = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [counselling, setCounselling] = useState(initalCounselling);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(">>>check team: ", teammate);

  const handleAddTeammate = (member: Teammate) => {
    // console.log(member);
    teammate.current = [...teammate.current, member];
    setIsUpdate((prev) => !prev);
    // console.log(teammate);
  };

  const handleDeleteTeammate = (memberId: number) => {
    teammate.current = teammate.current.filter(
      (member) => member.id != memberId,
    );
    console.log(teammate.current, memberId);
    setIsUpdate((prev) => !prev);
  };

  const getAssignmentDetails = async () => {
    if (user.role === ROLE_TEACHER) {
      const res = await callGetAssigment(classId);
      // console.log("check res: ", res);
      const currentAssignment = res.find(
        (assignment) => assignment.id == assignmentId,
      );

      dispatch(getCurrentAssignment(currentAssignment));
    }
    if (user.role === ROLE_STUDENT) {
      const res = await callGetAssigment(classId);
      // console.log("check res: ", res);
      const membersList = await callGetStudentsList(classId);
      const filteredMemberList = membersList.filter(
        (student) => student.id != user.id,
      );
      const menu = await filteredMemberList.map((member, index) => ({
        key: index,
        label: (
          <div
            className={"flex flex-row items-center"}
            onClick={() => handleAddTeammate(member)}
          >
            <Avatar
              size={30}
              icon={<UserOutlined />}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${member.avatarId}`}
              className="mr-3 border-black border-[1px]"
            />
            <div>
              <p className={"font-medium"}>
                {member.lastName + " " + member.firstName}
              </p>
              <p className={"text-grey_2"}>
                {member.email != null ? member.email : "No email"}
              </p>
            </div>
          </div>
        ),
      }));
      await setMembersMenu(menu);
      const currentAssignment = await callGetAssignmentById(assignmentId);
      if (currentAssignment?.id) {
        const linkedDocument = await callGetDocumentById(
          currentAssignment?.relatedDocumentId,
        );
        if (linkedDocument?.id) {
          setDocument(linkedDocument);
          const counsellings = await callGetDocumentCounselling(
            currentAssignment.relatedDocumentId,
          );
          console.log("check fetch counselling: ", counsellings);
          if (counsellings?.length > 0) {
            await setCounsellingsList(counsellings);
          }
        }

        console.log("check document", linkedDocument);
      }
      // console.log(currentAssignment);
      dispatch(getCurrentAssignment(currentAssignment));
      dispatch(
        getMembersWithoutStatusAction({
          student: filteredMemberList,
          status: null,
        }),
      );
    }
  };

  useEffect(() => {
    getAssignmentDetails();
    currentAssignment?.relatedDocumentId && getLinkedDocument();
  }, [currentAssignment?.relatedDocumentId]);

  const handleCloseSubmit = () => {
    setShowSubmitForm(false);
  };

  const openSubmitForm = () => {
    setShowSubmitForm(true);
  };

  const isLinkedDocumentAssignmet = (assignment) => {
    return (
      assignment.type === assignmentTypes.FOR_TEST ||
      assignment.type === assignmentTypes.FOR_COUNSELLING
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    assignmentId: number,
  ) => {
    e.preventDefault();
    showModal();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const files = formData.getAll("files") as FileList;
    const caption = editorRef.current.getContent();
    const orientation = isLinkedDocumentAssignmet(currentAssignment)
      ? counselling.orientation
      : currentAssignment.isForGroup
        ? Orientations.MANAGEMENT
        : (formData.get("orientation") as string);

    const formDataWithFiles = new FormData();
    formDataWithFiles.append("title", title);
    formDataWithFiles.append("caption", caption);
    formDataWithFiles.append("orientation", orientation);
    if (counselling.id != null) {
      formDataWithFiles.append("counselling-id", counselling.id);
    }
    if (currentAssignment.isForGroup) {
      teammate.current.map((member, index) =>
        formDataWithFiles.append("member-ids", member.id),
      );
    }

    console.log("check files: ", files.length);
    for (let i = 0; i < files.length; i++) {
      formDataWithFiles.append("files", files[i]);
    }
    console.log(formDataWithFiles);
    const res = await callSubmitAssignment(assignmentId, formDataWithFiles);
    if (res.status === 'ok') {
      setSuccessModalVisible(true);
    } else {
      let errorMessage = ""
      if (res.message) {
        errorMessage = res.message
      } else if (res.detail) {
        errorMessage = res.detail
      }

      alert("Nộp bài không thành công. " + errorMessage);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    // document.getElementById("submitForm").reset();

    if (editorRef.current) {
      editorRef.current.setContent("<p>Nhập nội dung ở đây</p>");
    }

    teammate.current = [];
  };

  // console.log("check current: ", currentAssignment);

  const [counsellingsList, setCounsellingsList] = useState([]);
  const getLinkedDocument = async () => {
    const res = await callGetDocumentById(currentAssignment?.relatedDocumentId);
    if (res?.id) {
      setDocument(res);
      const counsellings = await callGetDocumentCounselling(res?.id);
      console.log("check fetch counselling: ", counsellings);
      if (counsellings?.length > 0) {
        await setCounsellingsList(counsellings);
      }
    }

    console.log("check document", res);
  };

  const items: MenuProps["items"] = membersMenu.map((member) => ({
    key: member.key.toString(),
    label: member.label,
  }));

  const counsellingItems: MenuProps["items"] = counsellingsList?.map(
    (counselling) => ({
      key: counselling?.id,
      label: (
        <div onClick={() => setCounselling(counselling)}>
          {counselling.content.slice(0, 70)}...
        </div>
      ),
    }),
  );

  const handleCancelSelection = () => {
    setCounselling(null);
  };

  const isLinkedDocumentAssignment = (assignment) => {
    return (
      assignment.type === assignmentTypes.FOR_COUNSELLING ||
      assignment.type === assignmentTypes.FOR_TEST
    );
  };

  console.log("check items: ", counsellingItems);

  return (
    <>
      <Row className={"w-[90%] mx-auto min-h-[80vh] h-fit"}>
        <Col span={10} className={"bg-purple_4 rounded-xl h-fit px-10 py-5"}>
          <h4
            className={
              "uppercase font-semibold text-xl text-purple_5 mb-5 text-center"
            }
          >
            {currentAssignment.title}
          </h4>
          <div
            dangerouslySetInnerHTML={{ __html: currentAssignment.content }}
          />

          {isLinkedDocumentAssignment(currentAssignment) && (
            <p>
              Ngữ liệu liên kết :{" "}
              <Link href={`/library/${document?.id}`} className={"font-bold"}>
                {document?.title}
              </Link>
            </p>
          )}
        </Col>
        <Col span={14} className={"pl-10"}>
          <div>
            <form
              id={"submitForm"}
              onSubmit={(e) => handleSubmit(e, assignmentId)}
            >
              <Col>
                {currentAssignment?.type != assignmentTypes.OTHER ? (
                  counselling?.id ? (
                    <div>
                      <div
                        className={
                          "flex flex-row items-center bg-gray-300 rounded px-3 py-1 w-fit"
                        }
                      >
                        <p>{counselling.content.slice(0, 70)}...</p>

                        <MdOutlineCancel
                          className={"text-red-600 cursor-pointer ml-5 text-lg"}
                          onClick={handleCancelSelection}
                        />
                      </div>
                      <div className={"my-2"}>
                        Định hướng:{" "}
                        {theme[counselling.orientation].vietnameseName}
                      </div>
                    </div>
                  ) : (
                    <>
                      <label htmlFor={"select-counselling"}>
                        Chọn bài tập hướng nghiệp:
                      </label>
                      <Dropdown
                        trigger={"click"}
                        overlay={<Menu items={counsellingItems} />}
                        placement={"bottom"}
                        id={"select-counselling"}
                      >
                        <div
                          className={
                            "border-[1px] rounded px-4 py-1 h-fit my-1.5 text-sm text-gray-400"
                          }
                        >
                          Chọn bài tập hướng nghiệp
                        </div>
                      </Dropdown>
                    </>
                  )
                ) : null}
                <div className={"my-2"}>
                  <div>
                    <label htmlFor={"title"}>Tiêu đề: </label>
                    <input
                      name={"title"}
                      id={"title"}
                      type={"text"}
                      placeholder={"Tiêu đề"}
                      className={"my-2 rounded border-[1px] px-4 py-1"}
                      defaultValue={""}
                    />
                  </div>
                  {currentAssignment?.isForGroup === true && (
                    <div className={"flex flex-row items-center"}>
                      <label>Chọn thành viên nhóm: </label>
                      {teammate.current.length < 2 && (
                        <Dropdown
                          trigger={"click"}
                          overlay={<Menu items={items} />}
                          placement={"bottom"}
                        >
                          <div
                            className={"border-[1px] rounded px-4 py-1 h-fit"}
                          >
                            Chọn thành viên
                          </div>
                        </Dropdown>
                      )}

                      <div className={"flex flex-row items-center"}>
                        {teammate.current.length > 0 &&
                          teammate.current.map((member: Teammate) => (
                            <div
                              key={member.id}
                              className={
                                "flex flex-row items-center bg-gray-100 rounded-3xl px-3 py-1 mx-2.5"
                              }
                            >
                              <Avatar
                                size={30}
                                icon={<UserOutlined />}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${member.avatarId}`}
                                className="mr-3 border-black border-[1px]"
                              />
                              <div>
                                <p className={"font-medium"}>
                                  {member.lastName + " " + member.firstName}
                                </p>
                                <p className={"text-grey_2"}>
                                  {member.email != null
                                    ? member.email
                                    : "No email"}
                                </p>
                              </div>
                              <MdOutlineCancel
                                className={
                                  "text-red-600 cursor-pointer ml-5 text-lg"
                                }
                                onClick={() => handleDeleteTeammate(member.id)}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {currentAssignment?.isForGroup === false && (
                    <>
                      {currentAssignment?.type === assignmentTypes.OTHER && (
                        <div>
                          <label htmlFor="orientation">Chọn định hướng: </label>
                          <select
                            name="orientation"
                            id="orientation"
                            className={"border-[1px] px-2 p-0.5 rounded ml-2"}
                            defaultValue={`${Orientations.TECHNIQUE}`}
                          >
                            <option value={`${Orientations.TECHNIQUE}`}>
                              KĨ THUẬT
                            </option>
                            <option value={`${Orientations.MAJOR}`}>
                              NGHIỆP VỤ
                            </option>
                            <option value={`${Orientations.RESEARCH}`}>
                              NGHIÊN CỨU
                            </option>
                            <option value={`${Orientations.SOCIAL}`}>
                              XÃ HỘI
                            </option>

                            <option value={`${Orientations.ART}`}>
                              {" "}
                              NGHỆ THUẬT
                            </option>
                          </select>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Editor
                  name="caption"
                  apiKey="ty6mn9smak440qi6gv53qqivqdulai6ja9wl6ao0bt12odwr"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Nhập nội dung</p>"
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
                {/* <button onClick={log}>Log editor content</button> */}
                <input
                  name="files"
                  type="file"
                  multiple
                  className={"mt-2"}
                  defaultValue={null}
                />

                <button
                  type="submit"
                  className="bg-purple_7 rounded mt-2 text-blue_5 font-bold text-base py-2 px-4"
                >
                  Nộp bài
                </button>
                <Modal
                  title="Nộp bài thành công"
                  visible={successModalVisible}
                  onCancel={handleSuccessModalClose}
                  footer={[
                    <Button key="back" onClick={handleSuccessModalClose}>
                      Quay lại
                    </Button>,
                  ]}
                >
                  <p>Nộp bài thành công</p>
                </Modal>
              </Col>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SubmissionPage;
