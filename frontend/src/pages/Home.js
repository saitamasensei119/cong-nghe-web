import React from 'react';
import { Typography, Layout, Row, Col, Card, Button, Avatar } from 'antd';
import { RocketOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useUser();

    const features = [
        {
            icon: <RocketOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
            title: 'Nhanh Chóng & Hiệu Quả',
            description: 'Trải nghiệm hiệu suất nhanh chóng với nền tảng được tối ưu hóa của chúng tôi'
        },
        {
            icon: <BookOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
            title: 'Học Tập Dễ Dàng',
            description: 'Tài liệu và nguồn học tập toàn diện cho việc học hiệu quả'
        },
        {
            icon: <TeamOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
            title: 'Hỗ Trợ Cộng Đồng',
            description: 'Tham gia vào cộng đồng người học và chuyên gia đang phát triển của chúng tôi'
        }
    ];

    const developers = [
        {
            name: 'Lê Tăng Đạt',
            avatar: 'https://joeschmoe.io/api/v1/1'
        },
        {
            name: 'Trần Đình Đạt',
            avatar: 'https://joeschmoe.io/api/v1/2'
        },
        {
            name: 'Cao Tuấn Đạt',
            avatar: 'https://joeschmoe.io/api/v1/3'
        },
        {
            name: 'Ngô Ngọc Đăng',
            avatar: 'https://joeschmoe.io/api/v1/4'
        }
    ];

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    return (
        <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 64px)' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                padding: '80px 0',
                marginBottom: '50px',
                borderRadius: '0 0 20px 20px',
                color: 'white'
            }}>
                <Row justify="center" align="middle">
                    <Col xs={24} md={16} style={{ textAlign: 'center' }}>
                        <Title level={1} style={{ color: 'white', marginBottom: '20px' }}>
                            Chào Mừng Đến Với Nền Tảng Học Tập
                        </Title>
                        <Paragraph style={{ fontSize: '18px', color: 'white', marginBottom: '30px' }}>
                            Hành trình thành công của bạn bắt đầu từ đây. Hãy tham gia cùng hàng nghìn người học đã thay đổi sự nghiệp của họ với chúng tôi.
                        </Paragraph>
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                height: '45px',
                                padding: '0 40px',
                                fontSize: '16px',
                                borderRadius: '8px'
                            }}
                            onClick={handleGetStarted}
                        >
                            {isAuthenticated ? 'Vào Dashboard' : 'Bắt Đầu Ngay'}
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Features Section */}
            <Row gutter={[32, 32]} justify="center" style={{ marginBottom: '50px' }}>
                {features.map((feature, index) => (
                    <Col xs={24} md={8} key={index}>
                        <Card
                            hoverable
                            style={{
                                textAlign: 'center',
                                height: '100%',
                                borderRadius: '15px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
                            <Title level={3} style={{ marginBottom: '15px' }}>{feature.title}</Title>
                            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
                                {feature.description}
                            </Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Developers Section */}
            <div style={{ marginBottom: '50px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    Đội Ngũ Phát Triển
                </Title>
                <Row gutter={[32, 32]} justify="center">
                    {developers.map((dev, index) => (
                        <Col xs={12} sm={8} md={6} lg={6} key={index}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    height: '100%'
                                }}
                            >
                                <div style={{ textAlign: 'center' }}>
                                    <Avatar
                                        size={80}
                                        src={dev.avatar}
                                        style={{ marginBottom: '15px' }}
                                    />
                                    <Title level={4} style={{ margin: 0, fontSize: '16px' }}>
                                        {dev.name}
                                    </Title>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Call to Action Section */}
            <Row justify="center" style={{ marginBottom: '50px' }}>
                <Col xs={24} md={16} style={{ textAlign: 'center' }}>
                    <Card style={{
                        background: '#f5f5f5',
                        borderRadius: '15px',
                        padding: '40px'
                    }}>
                        <Title level={2} style={{ marginBottom: '20px' }}>
                            Sẵn Sàng Bắt Đầu Hành Trình?
                        </Title>
                        <Paragraph style={{ fontSize: '18px', marginBottom: '30px' }}>
                            Hãy tham gia cộng đồng của chúng tôi ngay hôm nay và thực hiện bước đầu tiên hướng tới mục tiêu của bạn.
                        </Paragraph>
                        <Button
                            type="primary"
                            size="large"
                            style={{ height: '45px', padding: '0 40px' }}
                            onClick={handleSignUp}
                        >
                            Đăng Ký Ngay
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default Home; 