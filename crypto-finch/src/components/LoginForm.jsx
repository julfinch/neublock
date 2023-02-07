import { useState } from "react";
import { LockOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import {
    Button,
    Col,
    Form,
    InputNumber,
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

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const LoginForm = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [file, setFile] = useState(null);

    const onFinish = (values) => {
    console.log(values);
  };

    const register = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "neublock");
        try {
        const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dwxdztigp/image/upload",
            formData
        );
        const { url } = uploadRes.data;

        for (let value in values) {
        formData.append(value, values[value]);
        }
        formData.append("picturePath", url);

        console.log('Form Data',formData);
        const savedUserResponse = await fetch(
        "https://neublock-backend.onrender.com/auth/register",
        {
            method: "POST",
            body: formData,
        }
        );
        console.log('Saved User Res', savedUserResponse);
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
        setPageType("login");
        }
        } catch (err) {
            console.log(err);
            notification.error({
                message: 'Error!',
                description: 'err.message',
            });
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch("https://neublock-backend.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
        dispatch(
            setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
            })
        );
        history.push("/dashboard");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        }) => (
            <form onSubmit={handleSubmit} className="login-form">
            {/* <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            > */}
                {isRegister && (
                <>
                    {/* <TextField
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                        Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                    /> */}
                    <input
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    />
                    {/* <Form.Item
                        name={['user', 'firstName']}
                        label="First Name"
                        value={values.firstName}
                        onChange={(value) => setFieldValue("firstName", value)}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}


                    {/* <TextField
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                    /> */}
                    <input
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    />
                    {/* <Form.Item
                        name={['user', 'lastName']}
                        label="Last Name"
                        onChange={(value) => setFieldValue("lastName", value)}
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}
                    


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
                        <Row>
                            <Col span={12} offset={6}>
                            <input {...getInputProps()} />
                            {!values.picture ? (
                            <p>Add Picture Here</p>
                            ) : (
                            <Row>
                                <Col span={12} offset={6}>
                                <Title level={h5}>{values.picture.name}</Title>
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

                    <input 
                        className="login-form-upload"
                        type="file" 
                        onChange={(e) => setFile(e.target.files[0])} 
                    />

                    {/* <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        onChange={(value) => setFieldValue("picture", value)}
                        // getValueFromEvent={normFile}
                        // extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item> */}
                </>
                )}

                {/* <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                /> */}
                <input
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    />
                {/* <Form.Item
                    name="email"
                    label="Email"
                    onChange={(value) => setFieldValue("email", value)}
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
                </Form.Item> */}


                {/* <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
                /> */}
                <input
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    />
                {/* <Form.Item
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item> */}


            {/* </Box> */}

            {/* BUTTONS */}
            {/* <Box> */}
                {/* <Button
                fullWidth
                type="submit"
                sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                }}
                >
                {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                }}
                sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                    },
                }}
                >
                {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography> */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    {isLogin ? "LOGIN" : "REGISTER"}
                    </Button>
                    
                    <Title 
                        level={5} 
                        style={{ cursor: 'pointer'}} 
                        className="login-form-text" 
                        onClick={() => {
                        setPageType(isLogin ? "register" : "login");
                        resetForm();
                    }}>
                        {isLogin
                        ? "Don't have an account? Sign Up here."
                        : "Already have an account? Login here."}
                    </Title>
                </Form.Item>
            {/* </Box> */}
            </form>
        )}
        </Formik>
    );
};

export default LoginForm;