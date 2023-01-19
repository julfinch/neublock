import React from 'react'
import { Col, Layout, Image, Row, Typography } from 'antd';
import card from "../../images/landing/heroCard.png";
import Navbar from './Navbar';

const { Text } = Typography;

const Hero = () => {
  return (
    <>
      <Layout className="landing-hero-container" style={{minHeight: '100vh',}}>
        
        <Navbar/>

        <Row>
          <Col className="landing-hero-grid" xs={12} sm={11} md={11} lg={10} xl={10} style={{ display: 'flex'}}>
            <div className="landing-hero-content">
              <Text>THE LARGEST NFT MARKETPLACE</Text>
              <Text style={{ fontSize: 'clamp(1rem, 4.5vw, 3.7rem)', fontWeight: 'bold'}}>DISCOVER RARE</Text>
              <Text style={{ fontSize: 'clamp(1rem, 4.5vw, 3.7rem)', fontWeight: 'bold'}}>MONKEY NFTS</Text>
              <Text>The world's largest marketplace for rare collections of non-fungible tokens.</Text>
              
              <button className="landing-hero-connect">
                Connect Wallet
              </button>
            </div>
          </Col>
          <Col className="landing-hero-grid" xs={0} sm={2} md={2} lg={4} xl={4}>
            
          </Col>
          <Col className="landing-hero-grid" xs={12} sm={11} md={11} lg={10} xl={10}>
            <Image
                width={550}
                height={550}
                src={card}
                preview={false}
              />
          </Col>
        </Row>
        <div className="landing-hero-ellipse1"></div>
        <div className="landing-hero-ellipse2"></div>
        <div className="landing-hero-ellipse3"></div>
      </Layout>
    </>
  )
}

export default Hero