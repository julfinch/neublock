import React, { useState } from 'react'
import { Col, Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const AssetCard = ({ token, amount, price, onClick, onDelete }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked);
    };

    const getImageTitle = (token) => {
        const imageTitles = {
        apecoin: 'apecoin',
        aptos: 'aptos',
        arbitrum: 'arbitrum',
        binance: 'binance',
        bitcoin: 'bitcoin',
        cardano: 'cardano',
        ethereum: 'ethereum',
        litecoin: 'litecoin',
        optimism: 'optimism',
        polkadot: 'polkadot',
        polygon: 'polygon',
        solana: 'solana',
        sui: 'sui',
        tron: 'tron',
        xrp: 'xrp',
        };
    
        return imageTitles[token.toLowerCase()] || '';
    };
    
    const imageTitle = getImageTitle(token);
    // console.log(imageTitle)

    return (
        <Col 
        span={24}
            className={`assets-card-container ${isClicked ? 'shrink-left' : ''}`}
            style={
              Object.assign(
                {
                  display: isClicked ? 'flex' : '',
                  flexDirection: 'row',
                },
                // Other style properties
              )
            }
            onClick={handleClick}
        >
            
        {isClicked ? (
          <Col span={4} className="delete-button-container"  style={{display: 'flex', alignItems:'center', justifyContent: 'center',}}>
            <Tooltip title="Delete coin">
              <Button 
                onClick={onDelete} 
                style={{ backgroundColor: 'transparent', border: 'none', padding: '0px'}}
              >
                <DeleteOutlined style={{ fontSize: '29px', color: 'red' }} />
              </Button>
            </Tooltip>
          </Col>
        ) : (
          <div></div>
        )}
        <div 
          className="assets-card"
          style={
            Object.assign(
              {
                paddingLeft: isClicked ? '10px' : '20px',
                paddingRight: isClicked ? '10px' : '20px',
                width: '100%',
              },
            )
          }
        >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2px' }}>
            <p>
              <span style={{ fontSize: '19px' }}>{amount}</span> {token}
            </p>
            <p>
              AVERAGE: <span style={{ color: 'limegreen' }}>$ {price}</span>
            </p>
          </div>
        <div>
        {imageTitle && <img className="assets-image" src={`/src/images/crypto_icons/${imageTitle}.png`} alt={imageTitle} />}</div>
      </div>
        </Col>
    )
}

export default AssetCard