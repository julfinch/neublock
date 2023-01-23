import React from 'react'
import { Col, Layout, Image, Row, Typography, Space } from 'antd';
import l1 from "../../images/landing/icon1.png";
import l2 from "../../images/landing/icon2.png";
import l3 from "../../images/landing/icon3.png";
import l4 from "../../images/landing/icon4.png";
import l5 from "../../images/landing/icon5.png";

const icons = [ {icon: l1},{icon: l2},{icon: l5},{icon: l3},{icon: l4},];
const { Text, Title, Paragraph } = Typography;

const Footer = () => {
  return (
    <>
      <Layout className="landing-footer-container">
        <Row style={{ margin: '70px 0 100px'}}>
          <Col flex={2}>
            <Title level={1} className="landing-footer-title">NeuBlock</Title>
            <Paragraph style={{display: 'flex', flexWrap: 'no-wrap'}}> The largest NFT Marketplace. <br/> Unique and authentic digital creations.<br/> Made possible by blockchain technology.</Paragraph>
            <div className="landing-footer-socials">
                {icons.map((icon, index) => (
                <div key={index}>
                <Image width={30} key={index} src={icon.icon} preview={false}/>
                </div>
                ))}
            </div>
          </Col>
          <Col flex={3} className='landing-footer-row1-col2'>
            <Col className='landing-footer-links'>
              <Text strong>My Account</Text>
              <Text>Profile</Text>
              <Text>Collections</Text>
              <Text>Favorites</Text>
              <Text>Settings</Text>
            </Col>
            <Col className='landing-footer-links'>
              <Text strong>Marketplace</Text>
              <Text>Explore</Text>
              <Text>All NFTs</Text>
              <Text>Collectible</Text>
              <Text>All World</Text>
            </Col>
            <Col className='landing-footer-links'>
              <Text strong>Resources</Text>
              <Text>Help Center</Text>
              <Text>Partners</Text>
              <Text>Blog</Text>
              <Text>Newsletter</Text>
            </Col>
            <Col className='landing-footer-links'>
              <Text strong>Company</Text>
              <Text>About Us</Text>
              <Text>Careers</Text>
              <Text>Support</Text>
              <Text>Rankings</Text>
            </Col>
          </Col>
        </Row>
        <Row  className="landing-footer-row2">
          <Text>2022 © Copyright NeuBlock. All Rights Reserved</Text>
          <div>
            <Text>Terms of Service</Text>
            <Text style={{marginLeft: '30px'}}>Privacy Policy</Text>
          </div>
        </Row>
      </Layout>
    </>
  )
}

export default Footer