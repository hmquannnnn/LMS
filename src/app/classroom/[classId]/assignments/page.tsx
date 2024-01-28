"use client";

import {
  callCreateAssigment,
  callCreateNotification,
  callGetAssigment,
  callGetClass,
  callSubmitAssignment,
} from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignmentsAction,
  getCurrentClassAction,
} from "@/redux/slices/classSlice";
import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const ClassAssignment = (props: any) => {
  const classId = props.params.classId;
  const dispatch = useDispatch();
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
  const userRole = user.role;
  const [updateFlag, setUpdateFlag] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  // const [newAssignment, setNewAssignment] = useState(false);
  const getClassDetail = async () => {
    const classInfo = await callGetClass(classId);
    if (classInfo?.id) {
      dispatch(getCurrentClassAction(classInfo));
      const assignmentList = await callGetAssigment(classInfo.id);
      // console.log(">>>check assignments: ", assignmentsList);
      dispatch(getAssignmentsAction(assignmentList));
      setUpdateFlag(true);
    }
  };

  useEffect(() => {
    getClassDetail();
  }, [updateFlag]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    // const content = e.target.elements.content.value;
    const content = editorRef.current.getContent();
    const dueDateTime = e.target.elements.dueDateTime.value;
    const assignmentReq = {
      title: title,
      content: content,
      dueDateTime: dueDateTime,
      isForGroup: false,
    };
    const res = await callCreateAssigment(classId, assignmentReq);
    setUpdateFlag(false);
    setIsModalOpen(false);
    const notificationContent = `ASSIGNMENT: ${title} - ${content}`;
    await callCreateNotification(classId, notificationContent);
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    assignmentId: number,
  ) => {
    // console.log("ok");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const files = formData.get("files") as File;
    const caption = formData.get("caption") as string;
    console.log("this is caption: ", caption);
    const orientation = formData.get("orientation") as string;
    const req = {
      title: title,
      files: files,
      caption: editorRef.current.getContent(),
      orientation: orientation,
      id: user.id,
    };
    // console.log(">>> check req: ", req);
    const res = await callSubmitAssignment(assignmentId, req);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <div className={"w-3/5 mx-auto"}>
        <div
          className={
            "bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"
          }
        >
          <p className={"text-3xl font-bold text-white"}>Assignment</p>
        </div>

        <Row>
          <Col span={5} className={"pr-5"}>
            <button
              className={
                "border-[1px] bg-red-500 text-white rounded-xl w-full text-center py-3 font-bold"
              }
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
                  <input
                    type={"text"}
                    name={"title"}
                    placeholder={"Title"}
                    className="border-[1px] rounded w-full px-4 py-1 mb-3"
                  />
                  {/*<input*/}
                  {/*  type={"text"}*/}
                  {/*  name={"content"}*/}
                  {/*  placeholder={"Content"}*/}
                  {/*  className="border-[1px] rounded w-full px-4 py-1 mb-3"*/}
                  {/*/>*/}
                  <Editor
                    name="caption"
                    apiKey="ty6mn9smak440qi6gv53qqivqdulai6ja9wl6ao0bt12odwr"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
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
                  <input type={"datetime-local"} name={"dueDateTime"} />
                  <button
                    type={"submit"}
                    className="border-[1px] bg-red-500 text-white rounded w-full text-center py-1 font-bold"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
          </Col>
          <Col span={19}>
            {assignmentsList.map((assignment) => (
              <>
                <Row
                  className={"border-[1px] mb-5 rounded-xl w-full px-5 py-3"}
                  span={18}
                >
                  <Col span={21}>
                    <p className={"font-bold"}>Title: {assignment.title}</p>
                    <p>
                      Content:{" "}
                      <div
                        dangerouslySetInnerHTML={{ __html: assignment.content }}
                      />
                    </p>
                  </Col>
                  <Col span={3}>
                    {user.role === "ROLE_STUDENT" && (
                      <button
                        className={
                          "text-white font-semibold bg-green-500 rounded py-1 px-4 text-base"
                        }
                        onClick={openSubmitForm}
                      >
                        Submit
                      </button>
                    )}
                  </Col>
                </Row>
                <Modal
                  title={"Submit Form"}
                  open={showSubmitForm}
                  onCancel={handleCloseSubmit}
                  footer={null}
                >
                  <div>
                    <form onSubmit={(e) => handleSubmit(e, assignment.id)}>
                      <Col>
                        <div className={"my-2"}>
                          <input
                            name={"title"}
                            type={"text"}
                            placeholder={"Title"}
                            className={"mb-2 rounded border-[1px]"}
                          />
                          <div>
                            <label htmlFor="orientation">
                              Select orientation
                            </label>
                            <select
                              name="orientation"
                              id="orientation"
                              className={"border-[1px] px-2 p-0.5 rounded ml-2"}
                            >
                              <option value="TECHNIQUE">TECHNIQUE</option>
                              <option value="MAJOR">MAJOR</option>
                              <option value="RESEARCH">RESEARCH</option>
                              <option value="SOCIAL">SOCIAL</option>
                              <option value="MANAGEMENT">MANAGEMENT</option>
                              <option value="ART"> ART</option>
                            </select>
                          </div>
                        </div>

                        <Editor
                          name="caption"
                          apiKey="ty6mn9smak440qi6gv53qqivqdulai6ja9wl6ao0bt12odwr"
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue="<p>This is the initial content of the editor.</p>"
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
                        />

                        <button
                          type="submit"
                          className="border-[1px] bg-rose-500 w-full rounded mt-2 text-white font-bold font-xl py-2"
                        >
                          Submit
                        </button>
                      </Col>
                    </form>
                  </div>
                </Modal>
              </>
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassAssignment;
