import React from 'react'
import { Col, Row, Button } from 'antd';
import card1 from "../images/card1.png";
import card2 from "../images/card2.png";
import card3 from "../images/card3.png";

const Credits = () => {
  return (
    <>
            <Row style={{position: 'relative',height: '100%'}}>
            <Col span={24} style={{ display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
              <img className="drawer-cc" src={card1} />
              <img className="drawer-cc" src={card2} />
              <img className="drawer-cc" src={card3} />
            </Col>
            <Col span={24} style={{position: 'absolute', bottom: '5px', width: '100%',display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
              <Button className="heading-explore-button" style={{width: '80%',height: '30px', fontSize: '16px', color: '#fff',borderRadius: '6px', border: '0px'}}>Add more cards</Button>
            </Col>
          </Row>    
    </>
  )
}

export default Credits