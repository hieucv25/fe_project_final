import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Modal, Space, Button } from 'antd';

export default function Login_Session_Expired_Component() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/login");
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/login");
    };
    const handleClick = () => {
        setIsModalOpen(false);
        navigate("/login");
    }
    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Space direction="vertical" size={16}>
                    <Card title="Phiên Đăng Nhập Hết Hạn" style={{ width: 300 }}>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <Button type="text" onClick={handleClick()}>Quay Lại Đăng Nhập</Button>
                    </Card>
                </Space>
            </Modal>
        </>
    );
}