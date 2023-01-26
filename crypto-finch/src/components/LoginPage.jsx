import { Col, Row, Typography, Layout, Image } from 'antd';
import Navbar from '../scenes/landingPage/Navbar';
import LoginForm from "./LoginForm2";
import logo from "../images/logo.jpg";

const { Header, Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
    
    return (
        <Layout className="login-container">
            <Navbar/>
            <Row style={{minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Col xxl={9} xl={9} lg={13} md={13} sm={24}  className="login-form-container">
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
        </Layout>
    );
};

export default LoginPage;