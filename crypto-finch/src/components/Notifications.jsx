import React from 'react'
import { Avatar, List, Button } from 'antd';
import { CheckCircleOutlined, DollarOutlined, LoadingOutlined } from '@ant-design/icons';
import avatar1 from "../images/avatar1.jpg";
import avatar2 from "../images/avatar2.jpg";
import avatar3 from "../images/avatar3.png";

const data = [
    {
        icon: <CheckCircleOutlined style={{fontSize: '42px'}}/>,
        name: 'Password changed',
        message: '',
        time: '1 AM'
    },
    {
      icon: avatar1,
      name: 'Rona Ablid',
      message: 'You should check XRP right now!',
      time: '3 AM'
    },
    {
        icon: <DollarOutlined style={{fontSize: '40px'}}/>,
        name: 'Deposited $100',
        message: '',
        time: '3:35 AM'
    },
    {
      icon: avatar2,
      name: 'Marcial Argo',
      message: 'Bro, did you bid on my item?',
      time: '4 AM'
    },
    {
      icon: avatar3,
      name: 'Cartian Trigo',
      message: 'APE nfts are mooning right now!',
      time: '8 min ago'
    },
    {
      icon: avatar1,
      name: 'Rona Ablid',
      message: 'Check your email',
      time: '3 min ago'
    },
    {
        icon: <LoadingOutlined style={{fontSize: '42px'}}/>,
        name: 'Processing XRP transfer',
        message: '',
        time: 'Just now'
    },
  ];

const Notifications = () => {
  return (
    <>
        <List
            itemLayout="horizontal"
            dataSource={data}
            style={{position: 'relative'}}
            renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                    className="chat-list-item"
                    avatar={<Avatar style={{width: 50,height: 50}} src={item.icon} />}
                    title={item.name}
                    description={item.message}
                />
                <div className="chat-content">{item.time}</div>
            </List.Item>
            )}
        />
        <Button className="heading-explore-button" style={{width: '84%',height: '30px', fontSize: '16px', color: '#fff',borderRadius: '6px', border: '0px', position: 'absolute', left: '30px', bottom: '20px'}}>Clear all</Button>
    </>
  )
}

export default Notifications