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
          "bg-blue_9 text-white rounded-lg px-5 py-1.5 shadow hover:shadow-lg font-bold"
        }
        onClick={showModal}
      >
        {" "}
        Tham gia lớp học
      </button>
      <Modal
        title="Nhập mã lớp để tham gia lớp học"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={(e) => handleJoinClass(e)}>
          <label>Nhập mã lớp</label>
          <br />
          <input
            className={"border-[1px] px-3 py-1 rounded w-full my-2"}
            name={"classCode"}
            placeholder={"Mã lớp học"}
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
            Tham gia
          </button>
        </form>
      </Modal>
      <Modal
        title={"Join class successfully"}
        open={openSuccessAlert}
        onCancel={() => setOpenSuccessAlert(false)}
        footer={null}
      >
        <p>Tên lớp: {className}</p>
        <button
          className={"bg-blue_6 rounded px-10 py-1.5 font-semibold text-blue_5"}
          onClick={() => setOpenSuccessAlert(false)}
        >
          Xong
        </button>
      </Modal>
    </>
  );
};

export default JoinClassButton;
