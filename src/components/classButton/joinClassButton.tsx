"use client";

import { useState } from "react";
import { callJoinClass } from "@/apis/classAPI";
import { Modal } from "antd";

const JoinClassButton = ({ onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [className, setClassName] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleChangeValue = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const showSuccessAlert = () => {
    setOpenSuccessAlert(true);
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

  const handleJoinClass = async (e) => {
    e.preventDefault();
    // console.log(e.target.elements.className.value);
    const classCode = e.target.elements.classCode.value;
    const res = await callJoinClass(classCode);
    if (res?.body?.id) {
      onUpdate();
      setInputValue("");
      setIsModalOpen(false);
      setClassName(res.body.name);
      showSuccessAlert();
    }
    console.log(res);
  };
  return (
    <>
      <button
        type={"submit"}
        className={
          "bg-blue_6 text-blue_5 rounded-lg px-5 py-1.5 shadow hover:shadow-lg font-semibold"
        }
        onClick={showModal}
      >
        {" "}
        Join class
      </button>
      <Modal
        title="Join a class"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={(e) => handleJoinClass(e)}>
          <label>Enter your class code</label>
          <br />
          <input
            className={"border-[1px] px-3 py-1 rounded w-full my-2"}
            name={"classCode"}
            placeholder={"classCode"}
            type={"text"}
            value={inputValue}
            onChange={handleChangeValue}
          />
          <br />
          <button
            type={"submit"}
            className={
              "bg-blue_6 rounded px-10 py-1.5 font-semibold text-blue_5"
            }
          >
            Join
          </button>
        </form>
      </Modal>
      <Modal
        title={"Join class successfully"}
        open={openSuccessAlert}
        footer={null}
      >
        <p>Your class name: {className}</p>
        <button
          className={
            "bg-rose-500 rounded px-10 py-1.5 font-semibold text-white"
          }
          onClick={() => setOpenSuccessAlert(false)}
        >
          Done
        </button>
      </Modal>
    </>
  );
};

export default JoinClassButton;
