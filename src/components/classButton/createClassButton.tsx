"use client"

import {useState} from "react";
import {createNewClass} from "@/apis/classAPI";
import {Col, Modal} from "antd";

const CreateClassButton = ({onUpdate}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [classCode, setClassCode] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const handleChangeValue = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }

    const showSuccessAlert = () => {
        setOpenSuccessAlert(true);
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

    const handleCreateClass = async(e) => {
        e.preventDefault();
        // console.log(e.target.elements.className.value);
        const newClassName = e.target.elements.className.value;
        const res = await createNewClass(newClassName);
        if(res?.id) {
            onUpdate();
            setIsModalOpen(false);
            setIsUpdate(!isUpdate);
            setClassCode(res.code);
            setInputValue("");
            showSuccessAlert();

        }
        console.log(res);
    }
    return (
        <>
            <button type={"submit"} className={"bg-white rounded-lg px-5 py-1.5 shadow font-semibold"} onClick={showModal}> Create class</button>
            <Modal title="Create a new class" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <form onSubmit={(e) => handleCreateClass(e)}>
                    <Col>
                        <label>Enter your class name</label>
                        <br/>
                        <input 
                            type={"text"}
                            name={"className"} 
                            value={inputValue}
                            placeholder={"className"} 
                            onChange={handleChangeValue}
                            className={"border-[1px] px-3 py-1 rounded w-full my-2"}
                        />
                        <br/>
                        <button type={"submit"} className={"bg-rose-500 rounded px-10 py-1.5 font-semibold text-white"}>Create</button>
                    </Col>
                    
                </form>
            </Modal>
            <Modal title={"Create new class successfully"} open={openSuccessAlert} footer={null}>
                <p>Your class code: {classCode}</p>
                <button className={"bg-rose-500 rounded px-10 py-1.5 font-semibold text-white mt-2"} onClick={() => setOpenSuccessAlert(false)}>Done</button>
            </Modal>
        </>
    )
}

export default CreateClassButton;