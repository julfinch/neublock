import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar, Card } from 'antd';
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined, CloseOutlined, GlobalOutlined, LogoutOutlined, DeploymentUnitOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import { setLogout } from "../app/state";
import { useDispatch } from "react-redux";

import icon from '../images/logo.jpg';
import card from '../images/card1.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const { pathname } = useLocation();

  // if (pathname === "/" || pathname === "/login") {
  //   return <></>
  // }

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container circles" style={{ zIndex: '1000',}}>
      <div className="logo-container">
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Avatar src={icon} size="medium" style={{width: 42}}/>
          <Typography.Title level={2} className="logo"><Link to="/">NeuBlock</Link></Typography.Title>
        </div>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      
      {activeMenu && (
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/dashboard">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<GlobalOutlined />}>
          <Link to="/global">Global</Link>
        </Menu.Item>
        <Menu.Item icon={<DeploymentUnitOutlined />}>
          <Link to="/nft">NFTs</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined/>}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined  />}>
          <Link to="/chart">Chart</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} onClick = {() => dispatch(setLogout())}>
          Log Out
        </Menu.Item>
        {/*CARD */}
        <Card className="nav-ads-card" style={{width: '185px', height: '180px',marginTop: '50px',}}>
        <CloseOutlined style={{marginBottom: '18px'}}/>
        <Typography.Title level={4} className="nav-card-title-1">Your credit card is almost ready!</Typography.Title>
        <Typography.Title level={4} className="nav-card-title-2">Continue Setup</Typography.Title>
        <img className="nav-ads-cc" src={card} />
        </Card>

        
        {/* 
        <Menu.Item style={{marginTop: '20px'}} icon={<InfoCircleOutlined />}>
          <Link to="/help">Help - FAQ</Link>
        </Menu.Item>
        
        */}
      </Menu>
        
      )}
    </div>
  );
};

export default Navbar;
