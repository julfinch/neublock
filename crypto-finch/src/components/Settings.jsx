import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Checkbox, Form, Input, Image, Typography, Button, Upload, Row, Col, notification  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { Spin, Alert, Progress } from 'antd';



const Settings = ({userId}) => {
  const userRedux = useSelector((state) => state.user);
  // const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const [file, setFile] = useState("")
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picturePath: '',
  });


  const handleUpload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "neublock");
  
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dwxdztigp/image/upload",
          formData
        );
  
        const picturePath = uploadResponse.data.secure_url;
  
        setUpdatedUser((prevUser) => ({
          ...prevUser,
          picturePath: picturePath,
          file: null, // Reset the file state after successful upload
        }));
        setPreviewImage(picturePath)
      }
      // Perform any necessary actions after successful user update
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    // Fetch the user data from the backend when the component mounts
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://neublock-backend.onrender.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);
  
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`https://neublock-backend.onrender.com/users/${userId}`, updatedUser);
      // Perform any necessary actions after successful user update
      setLoading(false);
      notification.success({
        message: 'Success!',
        description: 'Changes successfully saved!',
        placement: 'top',
    });
    } catch (error) {
      console.log(error);
      notification.error({
        message: '',
        placement: 'top',
        description: 'Oops! There was an error. Fill the necessary fields and leave no empty response.',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        
          <Typography.Title level={4} style={{fontSize: '16px'}}>Account Settings</Typography.Title>
          <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3'}}>Profile picture, personal information and notifications</p>
          <Typography.Title level={4} style={{fontSize: '13px'}}>Profile picture</Typography.Title>
          <Image 
            src={previewImage ? previewImage : updatedUser.picturePath} 
            style={{ width: 80, }} 
          />
          <Form onFinish={(e) => handleUpload(e)}>
            <Form.Item
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              >
              <Row>
                <Col span={12}>
                  <Upload name="logo" listType="picture">
                    <Button style={{width: '100%',fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff'}} icon={<UploadOutlined />}>Select a new photo</Button>
                  </Upload>
                </Col>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" className="heading-explore-button" style={{width: '100%', fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff'}}>
                    Upload
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>

          <Form
            name="basic"
            onFinish={(e) => handleFormSubmit(e)}
            labelCol={{span: 16,}}
            wrapperCol={{span: 24,}}
            initialValues={{remember: true,}}
            autoComplete="off"
            layout="vertical"
            size="small"
            >
              <Typography.Title level={4} style={{fontSize: '13px', marginTop: '40px'}}>Personal information</Typography.Title>
              <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3'}}>Update your profile name. You can also edit your email address. Click on 'save changes' when you are done.</p>

              <div style={{display: 'flex', gap: '20px'}}>
                <Form.Item label="Last name" name="lastName">
                  <Input name="lastName" onChange={handleInputChange} value={updatedUser.lastName} placeholder={updatedUser.lastName}/>
                </Form.Item>
                <Form.Item label="First name" name="firstName">
                  <Input name="firstName" onChange={handleInputChange} value={updatedUser.firstName} placeholder={updatedUser.firstName} />
                </Form.Item>
              </div>
              <Form.Item label="Email address" name="email">
                <Input name="email" onChange={handleInputChange} value={updatedUser.email} placeholder={updatedUser.email}/>
              </Form.Item>

              <Form.Item label="Password" name="password">
                <Input name="password" />
              </Form.Item>
            
            
              <Typography.Title level={4} style={{fontSize: '16px'}}>Notifications</Typography.Title>
              <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3'}}>Customize type of notifications you want to achieve</p>
              <Form.Item name="remember" valuePropName="checked" wrapperCol={{span: 24,}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <Checkbox>Payment Success</Checkbox>
                    <Checkbox>Password change</Checkbox>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <Checkbox>Weekly report</Checkbox>
                    <Checkbox>Transfer success</Checkbox>
                  </div>
                </div>
              </Form.Item>

            <div>
              <Form.Item wrapperCol={{span: 24,}}>
                <Button type="primary" htmlType="submit" className="heading-explore-button" style={{width: '100%',height: '40px', fontSize: '16px', color: '#fff',borderRadius: '6px', border: '0px', marginTop: '40px',}}>
                {loading ? <Spin /> : 'Save changes'}
                </Button>
              </Form.Item>
            </div>
          </Form>
          
      </div>
    </>
  )
}

export default Settings