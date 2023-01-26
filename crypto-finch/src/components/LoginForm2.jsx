import { useState } from "react";
import { LockOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { Spin } from 'antd';
import {
    Button,
    Col,
    Form,
    Row,
    Input,
    Upload,
    Typography,
    notification,
} from 'antd';
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../app/state";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";

const { Title } = Typography;

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    picture: yup.string().notRequired("optional"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};


const LoginForm = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [file, setFile] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);

    const register = async () => {
        setLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "neublock");
        
        try {
            const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dwxdztigp/image/upload",
            data
        );
            const { url } = uploadRes.data;
            // console.log('Image result', url)
            const registerValues = {
                firstName,
                lastName,
                email,
                password,
                picturePath: url || 'https://res.cloudinary.com/dwxdztigp/image/upload/v1674659921/neublock/yro4ihczj4vnoxc2h4yn.jpg',
            };

            // console.log('Form Data',registerValues);
            // const savedUserResponse = await fetch(
            // "http://localhost:3001/auth/register",
            // {
            //     method: "POST",
            //     body: registerValues,
            // }
            // );
            axios.post('https://neublock-backend.onrender.com/auth/register', registerValues)
                .then(response => {
                    // console.log("Reg response", response);
                    const savedUser = response.data;
                    notification.success({
                        message: 'Success!',
                        description: 'New account successfully created',
                    });
                    if (savedUser) {
                    setPageType("login");
                    }
                    })
                .catch(error => {
                    // console.log(error);
                    notification.error({
                        message: '',
                        description: 'Oops! There was an error.',
                    });
                });
        
        } catch (err) {
            // console.log(err);
            notification.error({
                message: '',
                description: 'Oops! There was an error.',
            });
        } finally {
            setLoading(false);
        }
        
    };

    const login = async () => {
        setLoading(true);
        const loginUser = {
            email,
            password,
        };
        const loggedInResponse = await fetch("https://neublock-backend.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
        });
        const loggedIn = await loggedInResponse.json();
        setLoading(false);
        if (loggedIn.msg) {
            notification.info({
            message: loggedIn.msg,
            description: '',
            });
        }
            
        
        if (loggedIn) {
            localStorage.setItem('user', JSON.stringify(loggedIn.user))
            localStorage.setItem('token', loggedIn.token)
            // console.log('loggedIn', loggedIn);
            // console.log('loggedIn user firstName', loggedIn.user.firstName);
            // console.log('user firstName', JSON.parse(localStorage.getItem('user')));

            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            history.push("/dashboard");
        }

    };

    // const isAuth = Boolean(useSelector((state) => state.isLoggedIn));
    // console.log("state isAuth", isAuth)
    // const user = useSelector((state) => state.user);
    // console.log("state user", user)
    // const token = useSelector((state) => state.token);
    // console.log("state token", token)

    const handleFormSubmit = async () => {
        if (isLogin) await login();
        if (isRegister) await register();
    };

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            {...layout}
            form={form}
            onFinish={(e) => handleFormSubmit(e)}
            name="control-hooks"
            style={{ maxWidth: 600 }}
            >
            <div className="login-form">
                {isRegister && (
                <>
                    <Row gutter={[16, 8]} >
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!'
                                },
                                ]}
                                >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!'
                                },
                                ]}
                                >
                                    <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    
                    {/* <input
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    />
                    <input
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    /> */}

                    {/* <Row>
                    <Col span={12} offset={6}>
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                        <Row {...getRootProps()} style={{border: '2px dashed #fff', padding: '1rem'}}>
                            <Col span={24}>
                            <input {...getInputProps()} />
                            {!values.picture ? (
                            <p>Add Picture Here</p>
                            ) : (
                            <Row>
                                <Col span={12} offset={6}>
                                <Title level={5}>{values.picture.name}</Title>
                                <UploadOutlined />
                                </Col>
                            </Row>
                            )}
                            </Col>
                        </Row>
                        )}
                    </Dropzone>
                    </Col>
                    </Row> */}

                    {/* <input 
                        className="login-form-upload"
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                    /> */}
                    <Form.Item
                        name="file"
                        label="Upload"
                        onChange={(e) => setFile(e.target.files[0])} 
                        // getValueFromEvent={normFile}
                        // extra="longgggggggggggggggggggggggggggggggggg"
                        >
                        <Upload name="logo" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </>
                )}
                <Form.Item
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                    >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    >
                    <Input.Password />
                </Form.Item>
                {/* <input
                    placeholder="Email"
                    name="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />

                <input
                    placeholder="Password"
                    name="password"
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    /> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    {isLogin ? "LOGIN" : "REGISTER"}
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    {loading && <Spin style={{marginLeft: "20 px"}}/>} 
                    <Title 
                        level={5} 
                        style={{ cursor: 'pointer'}} 
                        className="login-form-text" 
                        onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                    }}>
                        {isLogin
                        ? "Don't have an account? Sign Up here."
                        : "Already have an account? Login here."}
                    </Title>
                </Form.Item>
                
            </div>
        </Form>
    );
};

export default LoginForm;