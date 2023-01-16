import React, { useState } from 'react';
import { Col, Row, Badge, Drawer, Avatar, List, Input, Image,Tabs, Layout, Typography, Card, Button } from 'antd';
import { NotificationOutlined, BarChartOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined, SettingOutlined, MessageOutlined, CreditCardOutlined } from '@ant-design/icons';
import avatar_bg from "../images/avatar_bg.svg";
import avatar_pic from "../images/avatar_pic.png";
import heading_bg from "../images/header_bg2.jpg";
import icon4 from "../images/Ripple.svg";
import icon1 from "../images/Polygon.svg";
import icon2 from "../images/Tron.svg";
import icon3 from "../images/Cardano.svg";
import HomeLinechart from "./HomeLinechart";
import Settings from "./Settings";
import Credits from "./Credits";
import Notifications from "./Notifications";
import Chat from "./Chat";
import { Link } from 'react-router-dom';
import HomeDonut from "./HomeDonut";
import { zodiacData, dawgzData, monkiesData, assetsData, topData } from "../images/dummy";
import Loader from './Loader';
const { Meta } = Card;
const { Header, Content, Sider } = Layout;
const { Search } = Input;
import useWindowSize from "../hooks/useWindowSize";

const data = [
  {
    icon: icon1,
    title: 'Polygon',
    desc: 'Buy',
    amount: '$ 1,200'
  },
  {
    icon: icon2,
    title: 'Tron',
    desc: 'Sell',
    amount: '$ 4,240'
  },
  {
    icon: icon3,
    title: 'Cardano',
    desc: 'Pending',
    amount: '$ 7,120'
  },
  {
    icon: icon4,
    title: 'Ripple',
    desc: 'Received',
    amount: '$ 264'
  },
];

const Homepage = () => {
  const { width } = useWindowSize();
  const [openSettings, setOpenSettings] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [open, setOpen] = useState(false);
  const showSettings = () => {
    setOpenSettings(true);
  };
  const showCredits = () => {
    setOpenCredits(true);
  };
  const showChat = () => {
    setOpenChat(true);
  };
  const showNotifications = () => {
    setOpenNotifications(true);
  };
  const onCloseSettings = () => {
    setOpenSettings(false);
  };
  const onCloseCredits = () => {
    setOpenCredits(false);
  };
  const onCloseChat = () => {
    setOpenChat(false);
  };
  const onCloseNotifications = () => {
    setOpenNotifications(false);
  };


  return (
      <Layout className="homepage-container" style={{minHeight: '100vh',}}>
        {/* MAIN */}
        <Layout>
          <Header className="header-container">
            <Row >
                <Col span={4} style={{height: '45px', display: 'grid', placeContent: 'center', padding: '0px'}}>
                  <p style={{color: '#fff', fontSize: '19px', lineHeight: '0.1'}}>Hi, Lara!</p>
                </Col>
                <Col span={8} offset={width > 1100 ? 8 : 4}>
                  <Search
                    placeholder="Search cryptocurrency, auction, NFTs and more..."
                    allowClear
                    size="small"
                    style={{
                      width: 400,
                    }}
                  />
                </Col>
            </Row>
          </Header>
          
          <Content className="main-container">
            <Row gutter={[15, 15]}>
              {/* MAIN - HEADER CARD */}
              <Card className="main-heading-card" style={{position: 'relative'}}>
                
                <Row style={{display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '2'}}>
                  <Typography.Title level={3} className="main-heading-title">Discover, Collect, and Sell</Typography.Title>
                  <Typography.Title level={3} className="main-heading-title">Extraordinary NFTs</Typography.Title>
                  <Row>
                    <Link to="/nft">
                      <Button className="heading-explore-button" style={{ fontSize: '11px', color: '#fff',borderRadius: '6px', marginRight: '10px', border: '0px'}}>Explore More</Button>
                    </Link>
                    <Link to="/nft">
                      <Button type="ghost" style={{ fontSize: '11px',borderRadius: '6px', color: '#fff'}}>Sell Artwork</Button>
                    </Link>
                  </Row>
                </Row>
                <img src={heading_bg} alt="header background" className="main-heading-card-bg"/>
              </Card>
              {/* MAIN - NFT COLLECTION */}
              
              <Col span={24} className="nft-collection-wrapper">
                <Typography.Title level={4} className="nft-title-heading">My NFT Collections</Typography.Title>
                <Tabs defaultActiveKey="1" className="nft-tabs">
                <Tabs.TabPane tab="Top NFTs" key="1">
                  {width > 1100 ? 
                    <Row gutter={164}>
                      {topData?.map((top) => (
                      <Col xl={4} lg={5} key={top.name}>
                        <Card className="my-nft-collection" hoverable style={{width: 140, height: 145,}} cover={<img alt={top.name} src={top.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{top.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{top.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row> : 
                      <Row gutter={width > 1100 ? 164 : 3}>
                      {topData.filter((item, index) => index < 4)?.map((top) => (
                      <Col xl={4} lg={6} key={top.name}>
                        <Card className="my-nft-collection" hoverable style={{width: 135, height: 145,}} cover={<img alt={top.name} src={top.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{top.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{top.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row>}
                  </Tabs.TabPane>
                <Tabs.TabPane tab="Monkies Club" key="2">
                    <Row gutter={3}>
                      {monkiesData?.map((monkies) => (
                      <Col span={6} key={monkies.name}>
                        <Card className="my-nft-collection" hoverable style={{width: width > 1100 ? 141 : 135, height: 145,}} cover={<img alt={monkies.name} src={monkies.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{monkies.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{monkies.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Zodiac Kingdom" key="3">
                    <Row gutter={3}>
                      {zodiacData?.map((zodiac) => (
                      <Col span={6} key={zodiac.name}>
                        <Card className="my-nft-collection" hoverable style={{width: width > 1100 ? 140 : 135, height: 145,}} cover={<img alt={zodiac.name} src={zodiac.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{zodiac.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{zodiac.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Wave Dawgz" key="4">
                    <Row gutter={3}>
                        {dawgzData?.map((dawgz) => (
                        <Col span={6} key={dawgz.name}>
                          <Card className="my-nft-collection" hoverable style={{width: width > 1100 ? 140 : 135, height: 145,}} cover={<img alt={dawgz.name} src={dawgz.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                          <p style={{fontWeight: '500', color: 'cyan'}}>{dawgz.name}</p>
                          <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{dawgz.price}</span></p>
                          </Card>
                        </Col>
                        ))}
                      </Row>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
              {/* MAIN - ASSET CHARTS */}
              
              <Row gutter={20}>
                <Col xl={12}>
                  <HomeLinechart/>
                </Col>
                <Col xl={6} lg={6}>
                  <HomeDonut/>
                </Col>
                <Col span={6} className="home-transactions-column">
                  <Card className="home-transactions-card" style={{width: width > 1100 ? '185px' : '140px', height: width > 1100 ? '180px' : '220px'}}>
                  <Typography.Title level={4} className="transactions-title">Recent Transactions</Typography.Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            className="transactions-list-item"
                            avatar={<Avatar style={{width: 23,height: 23}} src={item.icon} />}
                            title={item.title}
                            description={item.desc}
                          />
                          <div className="transactions-content">{item.amount}</div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row>
            </Row>
          </Content>
        </Layout>

        {/* SIDEBAR */}
        <Sider className="sidebar-container">
          <Row className="sidebar-user" justify="space-between">
            <Col span={2} onClick={showNotifications}  >              
              <Badge dot><NotificationOutlined className="sidebar-user-badge"/></Badge>
            </Col>
            <Col span={2} onClick={showChat} >              
              <Badge dot><MessageOutlined className="sidebar-user-badge"/></Badge>
            </Col>
            <Col span={2} onClick={showCredits}>              
              <Badge ><CreditCardOutlined className="sidebar-user-badge"/></Badge>
            </Col>
            <Col span={2} onClick={showSettings}>              
              <Badge ><SettingOutlined className="sidebar-user-badge"/></Badge>
            </Col>
          </Row>

          <Row className="sidebar-profile">
            <Col span={24} className="sidebar-user-right" style={{ position: 'relative'}}>
              <Image src={avatar_bg} style={{width: 246}}/>
              <Image src={avatar_pic} style={{ position: 'absolute', width: 125, left: '-186px', top: '-69px' }} />
              <Meta className="sidebar-profile-name" title="Lara D. Turner" description="@degen_ape01" style={{ color: '#fff', position: 'absolute', bottom: '-1px'}}/>
            </Col>
          </Row>               
          
          <Row className="sidebar-transactions">
            <Col span={24}>
              <Card className="sidebar-port">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography.Title level={4} className="transactions-title">My Portfolio</Typography.Title>
                  <BarChartOutlined />
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <p style={{lineHeight: '1', fontSize: '20px', fontWeight: '400'}}>$34,010.00</p>
                  <p style={{lineHeight: '1', fontSize: '13px', fontWeight: '400'}}>+2.55%</p>
                </div>
                <div className="sidebar-port-buttons">
                  <Button className="sidebar-button" style={{fontSize: '10px', borderRadius: '6px', width: width > 1100 ? '90px' : '80px', border: '0px', color: '#fff'}} icon={<VerticalAlignBottomOutlined style={{fontSize: '14px', marginLeft: width > 1100 ? '' : '-6px', marginRight: '-6px'}}/>}>Deposit</Button>
                  <Button className="sidebar-button" style={{fontSize: '10px', borderRadius: '6px', width: width > 1100 ? '90px' : '80px', border: '0px', color: '#fff'}} icon={<VerticalAlignTopOutlined style={{fontSize: '14px', marginLeft: width > 1100 ? '' : '-6px', marginRight: '-6px'}} />}>Withdraw</Button>
                </div>
              </Card>
            </Col>
          </Row>

          <Typography.Title level={4} className="coin-details-heading" style={{padding: '0 10px'}}>My Assets</Typography.Title>
          <Row gutter={[10, 10]} className="sidebar-assets">
            {assetsData?.map((assets) => (
              <Col span={24} className="assets-card-container" key={assets.coin}>
                  <div className="assets-card">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2px'}}>
                      <p><span style={{fontSize: '19px'}}>{assets.value}</span>  {assets.coin}</p>
                      <p>PROFITS: <span style={{color: 'limegreen'}}>{assets.profit}</span></p>
                    </div>
                    <div>
                      <img className="assets-image" src={assets.logo} />
                    </div>
                  </div>
              </Col>
            ))}
          </Row>
        </Sider>

        <Drawer title="Settings" placement="right" onClose={onCloseSettings} open={openSettings} className="drawer-settings">
          <Settings/>
        </Drawer>
        <Drawer title="Linked Cards" placement="right" onClose={onCloseCredits} open={openCredits} >
          <Credits/>
        </Drawer>
        <Drawer title="Messages" placement="right" onClose={onCloseChat} open={openChat} >
          <Chat/>
        </Drawer>
        <Drawer title="Notifications" placement="right" onClose={onCloseNotifications} open={openNotifications} >
          <Notifications/>
        </Drawer>
      </Layout>
  )
}

export default Homepage