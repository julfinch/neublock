import { Col, Row, Typography, Layout, Image } from 'antd';
import Navbar from '../scenes/landingPage/Navbar';
import LoginForm from "./LoginForm";
import logo from "../images/logo.jpg";

const { Header, Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
    
    return (
        <Layout className="login-container" style={{minHeight: '100vh',}}>
            <Navbar/>
            <Row style={{minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', }}>
                <Col span={12} offset={6} className="login-form-container">
                    <Layout  className="login-form-layout">
                        <Header className="login-form-header">
                            <Image
                                width={53}
                                height={50}
                                src={logo}
                                preview={false}
                                className="login-form-logo"
                            />
                        </Header>
                        <Content className="login-form-content">
                            <Row>
                                <Col span={24}>
                                    <LoginForm />
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Col>
            </Row>
            <div className="landing-hero-ellipse1"></div>
            <div className="landing-hero-ellipse2"></div>
            <div className="landing-hero-ellipse3"></div>
        </Layout>
    );
};

export default LoginPage;