import { Col, Row, Typography } from 'antd';
import LoginForm from "./LoginForm";

const { Title } = Typography;

const LoginPage = () => {
    
    return (
        <Row>
            <Col span={24}>
                <Row>
                    <Col span={12} offset={6}>
                        <Title level={5}>
                        Welcome to NeuBlock!
                        </Title>
                        <LoginForm />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default LoginPage;