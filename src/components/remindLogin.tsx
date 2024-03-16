"use client";
import { Modal, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';


export const RemindLoginModal = ({ open, toggleModal }) => {
    const router = useRouter();
    const [openRemindLoginModal, setOpenRemindLoginModal] = useState(open);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOpenRemindLoginModal(open);
    }, [open]);

    const handleCancelModal = () => {
        setOpenRemindLoginModal(false);
        toggleModal(false)
    };

    const handleGoToLogin = () => {
        setOpenRemindLoginModal(false);
        toggleModal(false)
        setLoading(true)
        router.push("/login");
    };

    return (
        <>
            <div className="z-[2000]">
                <Modal
                    open={openRemindLoginModal}
                    title="Bạn chưa đăng nhập"
                    onCancel={handleCancelModal}
                    footer={[
                        <Button key="back" onClick={handleCancelModal}>
                            Hủy
                        </Button>,
                        <Button
                            className="bg-purple_1 text-white hover:text-purple_1  hover:bg-white"
                            key="submit"
                            loading={loading}
                            onClick={handleGoToLogin}
                        >
                            Đăng nhập
                        </Button>,
                    ]}
                >
                    Vui lòng đăng nhập để thực hiện hành động.
                </Modal>
            </div>
        </>
    );
}