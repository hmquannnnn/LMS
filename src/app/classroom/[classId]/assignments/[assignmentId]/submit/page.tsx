"use client";

import { useDispatch, useSelector } from "react-redux";
import { Orientations, ROLE_STUDENT, ROLE_TEACHER } from "@/utils/constant";
import {
  callGetAssigment,
  callGetAssignmentStatusStudent,
  callSubmitAssignment,
} from "@/apis/classAPI";
import { getCurrentAssignment } from "@/redux/slices/classSlice";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const SubmissionPage = (props: any) => {
  const classId = Number(props.params.classId);
  const assignmentId = Number(props.params.assignmentId);
  const user = useSelector((state) => state.account.user);
  const currentAssignment = useSelector(
    (state) =>
      state?.classes?.currentClass?.assignments?.currentAssignment || {},
  );
  const dispatch = useDispatch();
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const getAssignmentDetails = async () => {
    if (user.role === ROLE_TEACHER) {
      const res = await callGetAssigment(classId);
      const currentAssignment = res.find(
        (assignment) => assignment.id == assignmentId,
      );

      dispatch(getCurrentAssignment(currentAssignment));
    }
    if (user.role === ROLE_STUDENT) {
      const res = await callGetAssignmentStatusStudent(classId);
      const currentAssignment = res.find(
        (assignment) => assignment.id == assignmentId,
      );
      console.log(currentAssignment);
      dispatch(getCurrentAssignment(currentAssignment));
    }
  };

  useEffect(() => {
    getAssignmentDetails();
  }, [user]);

  const handleCloseSubmit = () => {
    setShowSubmitForm(false);
  };

  const openSubmitForm = () => {
    setShowSubmitForm(true);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    assignmentId: number,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const files = formData.getAll("files") as FileList;
    const caption = editorRef.current.getContent();
    const orientation = formData.get("orientation") as string;

    const formDataWithFiles = new FormData();
    formDataWithFiles.append("title", title);
    formDataWithFiles.append("caption", caption);
    formDataWithFiles.append("orientation", orientation);
    for (let i = 0; i < files.length; i++) {
      formDataWithFiles.append("files", files[i]);
    }

    const res = await callSubmitAssignment(assignmentId, formDataWithFiles);
  };

  const editorRef = useRef(null);

  return (
    <>
      <Row className={"w-[90%] mx-auto min-h-[80vh] h-fit"}>
        <Col span={10} className={"bg-blue_6 rounded-xl h-fit px-10 py-5"}>
          <h4
            className={
              "uppercase font-semibold text-xl text-blue_5 mb-5 text-center"
            }
          >
            {currentAssignment.title}
          </h4>
          <div
            dangerouslySetInnerHTML={{ __html: currentAssignment.content }}
          />
        </Col>
        <Col span={14} className={"pl-10"}>
          <div>
            <form onSubmit={(e) => handleSubmit(e, assignmentId)}>
              <Col>
                <div className={"my-2"}>
                  <div>
                    <label htmlFor={"title"}>Title: </label>
                    <input
                      name={"title"}
                      id={"title"}
                      type={"text"}
                      placeholder={"Title"}
                      className={"mb-2 rounded border-[1px]"}
                    />
                  </div>

                  <div>
                    <label htmlFor="orientation">Select orientation: </label>
                    <select
                      name="orientation"
                      id="orientation"
                      className={"border-[1px] px-2 p-0.5 rounded ml-2"}
                    >
                      <option value={`${Orientations.TECHNIQUE}`}>
                        TECHNIQUE
                      </option>
                      <option value={`${Orientations.MAJOR}`}>MAJOR</option>
                      <option value={`${Orientations.RESEARCH}`}>
                        RESEARCH
                      </option>
                      <option value={`${Orientations.SOCIAL}`}>SOCIAL</option>
                      <option value={`${Orientations.MANAGEMENT}`}>
                        MANAGEMENT
                      </option>
                      <option value={`${Orientations.ART}`}> ART</option>
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
                <input name="files" type="file" multiple className={"mt-2"} />

                <button
                  type="submit"
                  className="bg-blue_6 rounded mt-2 text-blue_5 font-bold text-base py-2 px-4"
                >
                  Submit
                </button>
              </Col>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SubmissionPage;
