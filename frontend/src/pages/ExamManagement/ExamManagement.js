import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ExamManagement.css';

const ExamManagement = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchExams();
        // eslint-disable-next-line
    }, [subjectId]);

    const fetchExams = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/exams/subject/${subjectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setExams(response.data);
        } catch (error) {
            message.error('Không thể tải danh sách đề thi');
        } finally {
            setLoading(false);
        }
    };

    const handleAddExam = async (values) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/teacher/subjects/${subjectId}/exam`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Thêm đề thi thành công');
            setIsModalVisible(false);
            form.resetFields();
            fetchExams();
        } catch (error) {
            message.error('Thêm đề thi thất bại');
        }
    };

    const columns = [
        { title: 'Tên đề thi', dataIndex: 'title', key: 'title' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Thời gian (phút)', dataIndex: 'duration', key: 'duration', align: 'center' },
        {
            title: 'Người tạo',
            dataIndex: ['createdBy', 'fullname'],
            key: 'createdBy',
            render: (_, record) => record.createdBy?.fullname || '---',
            align: 'center'
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
            align: 'center'
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <div className="table-actions">
                    <Tooltip title="Xem chi tiết">
                        <Button
                            shape="circle"
                            icon={<EyeOutlined />}
                            onClick={() => navigate(`/exams/${record.id}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            style={{ margin: '0 8px' }}
                            // onClick={() => ...}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            danger
                            // onClick={() => ...}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="exam-management">
            <div className="header">
                <h1>Quản lý đề thi môn học</h1>
                <div>
                    <Button
                        className="add-exam-btn"
                        type="primary"
                        onClick={() => setIsModalVisible(true)}
                        style={{ marginRight: 8 }}
                    >
                        Tạo đề thi
                    </Button>
                    <Button
                        className="add-exam-btn"
                        type="default"
                        onClick={() => navigate(`/question-bank/${subjectId}`)}
                    >
                        Ngân hàng câu hỏi
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table
                    columns={columns}
                    dataSource={exams}
                    loading={loading}
                    rowKey="id"
                    bordered
                    pagination={{ pageSize: 5 }}
                />
            </div>
            <Modal
                title="Thêm đề thi mới"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddExam} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Tên đề thi"
                        rules={[{ required: true, message: 'Nhập tên đề thi!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Nhập mô tả!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Thời gian (phút)"
                        rules={[{ required: true, message: 'Nhập thời gian!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm đề thi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ExamManagement;