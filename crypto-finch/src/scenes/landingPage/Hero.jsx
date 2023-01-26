import React from 'react'
import { Col, Layout, Image, Row, Typography } from 'antd';
import card from "../../images/landing/heroCard.png";
import Navbar from './Navbar';

const { Text } = Typography;

const Hero = () => {
  return (
    <>
      <Layout className="landing-hero-container">
        
        <Navbar/>

        <Row >
          <Col className="landing-hero-grid1" xs={24} sm={24} md={11} lg={11} xl={10} style={{ display: 'flex',}}>
            <div className="landing-hero-content">
              <Text className="landing-hero-content-1">THE LARGEST NFT MARKETPLACE</Text>
              <Text className="landing-hero-content-2">DISCOVER RARE</Text>
              <Text className="landing-hero-content-2">MONKEY NFTS</Text>
              <Text className="landing-hero-content-3">The world's largest marketplace for rare collections of non-fungible tokens.</Text>
              
              <button className="landing-hero-connect">
                Connect Wallet
              </button>
            </div>
          </Col>
          <Col className="landing-hero-grid2" xs={0} sm={0} md={2} lg={0} xl={4}>
            
          </Col>
          <Col className="landing-hero-grid3" xs={24} sm={24} md={11} lg={10} xl={10}>
            <Image
                width={550}
                height={550}
                src={card}
                preview={false}
                className="landing-hero-image"
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