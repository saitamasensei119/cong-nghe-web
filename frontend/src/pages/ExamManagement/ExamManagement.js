import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Tooltip, List } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import { useParams, useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import './ExamManagement.css';
import axiosInstance from "../../services/axiosInstance";

const ExamManagement = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isAddStudentModal, setIsAddStudentModal] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [isStudentListModal, setIsStudentListModal] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [loadingStudentList, setLoadingStudentList] = useState(false);
    const [editingExam, setEditingExam] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editForm] = Form.useForm();
    const [deleteExamId, setDeleteExamId] = useState(null);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [loadingAvailableStudents, setLoadingAvailableStudents] = useState(false);
    const [searchStudent, setSearchStudent] = useState('');
    const [isAvailableStudentsModal, setIsAvailableStudentsModal] = useState(false);
    const [searchStudentList, setSearchStudentList] = useState('');
    const [deleteStudentId, setDeleteStudentId] = useState(null);

    const studentListColumns = [
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() => handleRemoveStudent(record.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    useEffect(() => {
        fetchExams();
        // eslint-disable-next-line
    }, [subjectId]);

    const fetchExams = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get(`/api/teacher/exams/subject/${subjectId}`, {
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
            await axiosInstance.post(
                `/api/teacher/exams`,
                {
                    ...values,
                    subject: { id: Number(subjectId) }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            message.success('Thêm đề thi thành công');
            setIsModalVisible(false);
            form.resetFields();
            fetchExams();
        } catch (error) {
            message.error('Thêm đề thi thất bại');
        }
    };
    const handleShowStudentList = async () => {
        setIsStudentListModal(true);
        setLoadingStudentList(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axiosInstance.get(`/api/teacher/subjects/${subjectId}/students`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setStudentList(res.data);
        } catch (error) {
            message.error('Không thể lấy danh sách học sinh');
        } finally {
            setLoadingStudentList(false);
        }
    };
    const handleDeleteExam = (examId) => {
        setDeleteExamId(examId);
    };
    const confirmDeleteExam = async () => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.delete(`/api/teacher/exams/${deleteExamId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Xóa đề thi thành công');
            setDeleteExamId(null);
            fetchExams();
        } catch (error) {
            message.error('Xóa đề thi thất bại');
        }
    };
    const handleEditExam = (exam) => {
        setEditingExam(exam);
        setIsEditModalVisible(true);
        editForm.setFieldsValue({
            title: exam.title,
            description: exam.description,
            duration: exam.duration,
        });
    };

    const handleUpdateExam = async (values) => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.put(`/api/teacher/exams/${editingExam.id}`, {
                ...values,
                subject: { id: Number(subjectId) }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Cập nhật đề thi thành công');
            setIsEditModalVisible(false);
            setEditingExam(null);
            fetchExams();
        } catch (error) {
            message.error('Cập nhật đề thi thất bại');
        }
    };

    const handleShowAvailableStudents = async () => {
        setIsAvailableStudentsModal(true);
        setLoadingAvailableStudents(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching available students');
            const [allStudentsRes, enrolledStudentsRes] = await Promise.all([
                axiosInstance.get(`/api/teacher/student/findall`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
                axiosInstance.get(`/api/teacher/subjects/${subjectId}/students`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
            ]);

            const allStudents = allStudentsRes.data.data || [];
            const enrolledStudentIds = new Set(enrolledStudentsRes.data.map(student => student.id));

            // Filter out students that are already enrolled
            const availableStudents = allStudents.filter(student => !enrolledStudentIds.has(student.id));

            console.log('Available students response:', availableStudents);
            setAvailableStudents(availableStudents);
        } catch (error) {
            console.error('Error fetching available students:', error);
            message.error('Không thể lấy danh sách sinh viên có thể thêm');
            setAvailableStudents([]);
        } finally {
            setLoadingAvailableStudents(false);
        }
    };

    const handleAddStudent = async (studentId) => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.post(
                `/api/teacher/subjects/${subjectId}/students/${studentId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            message.success('Thêm học sinh thành công');
            setIsAvailableStudentsModal(false);
            // Refresh both student lists
            handleShowStudentList();
            handleShowAvailableStudents();
        } catch (error) {
            message.error(
                error.response?.data?.message || 'Thêm học sinh thất bại'
            );
        }
    };

    const handleRemoveStudent = (studentId) => {
        setDeleteStudentId(studentId);
    };

    const confirmRemoveStudent = async () => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.delete(
                `/api/teacher/subjects/${subjectId}/students/${deleteStudentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            message.success('Xóa học sinh khỏi môn học thành công');
            setDeleteStudentId(null);
            // Refresh student list
            handleShowStudentList();
        } catch (error) {
            message.error('Xóa học sinh khỏi môn học thất bại');
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
                            onClick={() => navigate(`/contest/${record.id}/${subjectId}`)}
                        />
                    </Tooltip>
                    <Tooltip title="Sửa">
                        <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            style={{ margin: '0 8px' }}
                            onClick={() => handleEditExam(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            shape="circle"
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => handleDeleteExam(record.id)}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className="exam-management">
            <div className="header">
                <h1>Quản lý môn học</h1>
                <div>
                    <Button
                        className="add-exam-btn"
                        icon={<UserAddOutlined />}
                        type="dashed"
                        onClick={handleShowAvailableStudents}
                    >
                        Thêm học sinh vào môn học
                    </Button>
                    <Button
                        className="add-exam-btn"
                        type="default"
                        onClick={handleShowStudentList}
                        style={{ marginRight: 8 }}
                    >
                        Xem danh sách học sinh
                    </Button>
                    <Button
                        className="add-exam-btn"
                        type="primary"
                        onClick={() => setIsModalVisible(true)}
                        style={{ marginRight: 8 }}
                    >
                        Tạo đề thi
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
            <Modal
                title="Danh sách sinh viên có thể thêm"
                open={isAvailableStudentsModal}
                onCancel={() => setIsAvailableStudentsModal(false)}
                footer={null}
                width={800}
            >
                <div style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Tìm kiếm sinh viên..."
                        prefix={<SearchOutlined />}
                        value={searchStudent}
                        onChange={e => setSearchStudent(e.target.value)}
                        style={{ width: 300 }}
                    />
                </div>
                {loadingAvailableStudents ? (
                    <div>Đang tải...</div>
                ) : (
                    <List
                        dataSource={availableStudents.filter(student =>
                            student.fullname.toLowerCase().includes(searchStudent.toLowerCase()) ||
                            student.email.toLowerCase().includes(searchStudent.toLowerCase())
                        )}
                        renderItem={student => (
                            <List.Item
                                actions={[
                                    <Button type="primary" onClick={() => handleAddStudent(student.id)}>
                                        Thêm
                                    </Button>
                                ]}
                            >
                                <List.Item.Meta
                                    title={student.fullname}
                                    description={student.email}
                                />
                            </List.Item>
                        )}
                    />
                )}
            </Modal>
            <Modal
                title="Danh sách học sinh"
                open={isStudentListModal}
                onCancel={() => setIsStudentListModal(false)}
                footer={null}
                width={800}
            >
                <div style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Tìm kiếm học sinh..."
                        prefix={<SearchOutlined />}
                        value={searchStudentList}
                        onChange={e => setSearchStudentList(e.target.value)}
                        style={{ width: 300 }}
                    />
                </div>
                {loadingStudentList ? (
                    <div>Đang tải...</div>
                ) : (
                    <Table
                        columns={studentListColumns}
                        dataSource={studentList.filter(student =>
                            student.fullname.toLowerCase().includes(searchStudentList.toLowerCase()) ||
                            student.username.toLowerCase().includes(searchStudentList.toLowerCase()) ||
                            student.email.toLowerCase().includes(searchStudentList.toLowerCase())
                        )}
                        rowKey="id"
                        pagination={{ pageSize: 5 }}
                        locale={{ emptyText: 'Không có học sinh nào.' }}
                    />
                )}
            </Modal>
            <Modal
                title="Sửa đề thi"
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <Form form={editForm} onFinish={handleUpdateExam} layout="vertical">
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
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Xác nhận xoá"
                open={!!deleteExamId}
                onOk={confirmDeleteExam}
                onCancel={() => setDeleteExamId(null)}
                okText="Xoá"
                okType="danger"
                cancelText="Huỷ"
            >
                Bạn có chắc muốn xoá đề thi này?
            </Modal>
            <Modal
                title="Xác nhận xóa học sinh"
                open={!!deleteStudentId}
                onOk={confirmRemoveStudent}
                onCancel={() => setDeleteStudentId(null)}
                okText="Xóa"
                okType="danger"
                cancelText="Hủy"
            >
                Bạn có chắc muốn xóa học sinh này khỏi môn học?
            </Modal>
        </div>
    );
};

export default ExamManagement;