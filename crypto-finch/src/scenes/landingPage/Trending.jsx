import React from 'react'
import { Col, Layout, Image, Row, Typography } from 'antd';
import l1 from "../../images/landing/card1.png";
import l2 from "../../images/landing/card2.png";
import l3 from "../../images/landing/card3.png";
import l4 from "../../images/landing/card4.png";

const cards = [ {icon: l1},{icon: l3},{icon: l4},];

const {Title} = Typography;

const Trending = () => {
  return (
    <>
        <Layout className="landing-trending-container" style={{minHeight: '100vh',}}>
            <Title level={3}>TRENDING AUCTIONS</Title>
            <div className="landing-trending-cards">
                {cards.map((card, index) => (
                <div key={index}>
                <Image  width={410} key={index} src={card.icon} />
                </div>
                ))}
            </div>
            <button className="landing-trending-button">
                VIEW MORE
            </button>
        </Layout>
    </>
  )
}

export default Trending