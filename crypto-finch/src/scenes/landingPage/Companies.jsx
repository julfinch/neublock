import React from 'react'
import { Col, Layout, Image, Row, Typography } from 'antd';
import l1 from "../../images/landing/ada.svg";
import l2 from "../../images/landing/bnb.svg";
import l3 from "../../images/landing/btc.svg";
import l4 from "../../images/landing/busd.svg";
import l5 from "../../images/landing/meta.svg";
import l6 from "../../images/landing/sol.svg";

const { Text } = Typography;

const logos = [ {icon: l1, title: 'BinanceUSD'},{icon: l2, title: 'BinanceSmart'},{icon: l3, title: 'BitcoinPlus'},{icon: l4, title: 'Cardano'},{icon: l5, title: 'Metamask'},{icon: l6, title: 'Solana'}];

const Companies = () => {
  return (
    <>
      <Layout className="landing-companies-container">
        <div className='landing-companies-logos'>
          {logos.map((logo, index) => (
            <div key={index} className='landing-companies-company'>
              <Image className='landing-companies-icon'  width={50} key={index} src={logo.icon} preview={false}/>
              <Text className='landing-companies-text'>{logo.title}</Text>
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default Companies