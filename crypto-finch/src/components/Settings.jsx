import React from 'react'
import { Checkbox, Form, Input, Image, Typography, Button } from 'antd';
import avatar_pic from "../images/avatar_pic.svg";

const Settings = () => {
  return (
    <>
        <Typography.Title level={4} style={{fontSize: '16px'}}>Account Settings</Typography.Title>
          <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3'}}>Profile picture, personal information and phone number</p>
          <Typography.Title level={4} style={{fontSize: '13px'}}>Profile picture</Typography.Title>
          <Image src={avatar_pic} style={{ width: 80, }} />
          <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3'}}>Click <span style={{color: 'cyan'}}>HERE</span> to change profile picture</p>
          <Typography.Title level={4} style={{fontSize: '13px'}}>Personal information and phone number</Typography.Title>
          <p style={{fontSize: '11px', color: 'rgba(255,255,255,0.3'}}>Update your profile name. You can also edit your phone number. Click on 'save changes' when you are done.</p>

          <div style={{display: 'flex', gap: '20px'}}>
          <Form
            name="basic"
            labelCol={{span: 16,}}
            wrapperCol={{span: 24,}}
            initialValues={{remember: true,}}
            autoComplete="off"
            layout="vertical"
            size="small"
          >
            <Form.Item label="Last name" name="lastname">
              <Input />
            </Form.Item>
          </Form>
          <Form
            name="basic"
            labelCol={{span: 16,}}
            wrapperCol={{span: 24,}}
            initialValues={{remember: true,}}
            autoComplete="off"
            layout="vertical"
            size="small"
          >
            <Form.Item label="First name" name="firstname">
              <Input />
            </Form.Item>
          </Form>
          </div>
          <Form
            name="basic"
            labelCol={{span: 8,}}
            wrapperCol={{span: 24,}}
            initialValues={{remember: true,}}
            autoComplete="off"
            layout="vertical"
            size="small"
          >
            <Form.Item label="Email address" name="email">
              <Input/>
            </Form.Item>
            <Form.Item label="Phone number" name="number">
              <Input/>
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

            <Form.Item wrapperCol={{span: 24,}}>
              <Button type="primary" htmlType="submit" className="heading-explore-button" style={{width: '100%',height: '30px', fontSize: '16px', color: '#fff',borderRadius: '6px', border: '0px', marginTop: '10px'}}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
    </>
  )
}

export default Settings