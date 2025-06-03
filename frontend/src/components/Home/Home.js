import React from 'react';
import { Typography, Row, Col, Card, Button, Statistic } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Home.css';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <Title level={1}>Hệ Thống Quản Lý Môn Học</Title>
                    <Paragraph className="hero-description">
                        Nền tảng quản lý môn học hiện đại, giúp kết nối giáo viên và học sinh một cách hiệu quả
                    </Paragraph>
                    <div className="hero-buttons">
                        <Link to="/login">
                            <Button type="primary" size="large">
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button size="large" className="register-btn">
                                Đăng ký
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <Title level={2} className="section-title">Tính năng nổi bật</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="feature-card">
                            <UserOutlined className="feature-icon" />
                            <Title level={4}>Quản lý Giáo viên</Title>
                            <Paragraph>
                                Dễ dàng phân công và quản lý giáo viên cho từng môn học
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="feature-card">
                            <BookOutlined className="feature-icon" />
                            <Title level={4}>Quản lý Môn học</Title>
                            <Paragraph>
                                Tổ chức và theo dõi các môn học một cách hiệu quả
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="feature-card">
                            <TeamOutlined className="feature-icon" />
                            <Title level={4}>Quản lý Học sinh</Title>
                            <Paragraph>
                                Theo dõi và quản lý học sinh trong từng môn học
                            </Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="feature-card">
                            <RocketOutlined className="feature-icon" />
                            <Title level={4}>Báo cáo Thống kê</Title>
                            <Paragraph>
                                Theo dõi tiến độ và hiệu quả giảng dạy
                            </Paragraph>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* How It Works Section */}
            <div className="how-it-works-section">
                <Title level={2} className="section-title">Cách thức hoạt động</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={8}>
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <Title level={4}>Đăng ký tài khoản</Title>
                            <Paragraph>
                                Tạo tài khoản với vai trò phù hợp (Admin, Giáo viên, Học sinh)
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <Title level={4}>Tham gia môn học</Title>
                            <Paragraph>
                                Đăng ký tham gia các môn học hoặc được phân công giảng dạy
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <Title level={4}>Bắt đầu học tập</Title>
                            <Paragraph>
                                Tương tác và học tập trong môi trường trực tuyến
                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Statistics Section */}
            <div className="statistics-section">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Statistic
                                title="Tổng số môn học"
                                value={50}
                                prefix={<BookOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Statistic
                                title="Tổng số giáo viên"
                                value={30}
                                prefix={<UserOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card>
                            <Statistic
                                title="Tổng số học sinh"
                                value={500}
                                prefix={<TeamOutlined />}
                                valueStyle={{ color: '#722ed1' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Call to Action Section */}
            <div className="cta-section">
                <Title level={2}>Sẵn sàng bắt đầu?</Title>
                <Paragraph>
                    Tham gia ngay hôm nay để trải nghiệm hệ thống quản lý môn học hiện đại
                </Paragraph>
                <Link to="/register">
                    <Button type="primary" size="large">
                        Đăng ký ngay
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home; 