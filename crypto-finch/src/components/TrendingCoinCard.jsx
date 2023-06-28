import React, {useState} from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { CaretDownOutlined, CaretUpOutlined, } from '@ant-design/icons';
import { 
    Col,
    Typography, 
    Card,
    Image,
  } from 'antd';
import millify from 'millify';


export default function TrendingCoinCard({data, loading,}) {

    return (
        <Col span={6}>
            <Card 
                key={data?.uuid}
                title={<div style={{display: 'flex', flexDirection: 'column'}}><p style={{color: 'rgba(255,255,255,0.4)', height: 0, fontSize: 12,}}>{data?.name}</p><p style={{fontSize: 16, height: 0, textTransform: 'uppercase'}}>{data?.symbol}</p></div>}
                size="small"
                loading={loading}
                extra={<img className="crypto-image" style={{height: 30, }} src={data?.icon} />}
                hoverable
                className="trending-coins-card"
            >
                <Sparklines data={data?.sparkline}>
                  <SparklinesLine color="cyan" />
                </Sparklines>
                <div style={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px', height: 10,}}>
                    <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center',}}>
                      <p style={{fontWeight: '400', fontSize: 13,marginTop: 10}}>$ {millify(data?.currentPrice)}</p>
                    </div>
                    <div>
                    {/* <p style={{fontWeight: '400',lineHeight: '0.3', margin: '1px'}}> {millify(data.marketCap)}</p> */}
                    <p style={{fontWeight: '400', fontSize: 13,marginTop: 10,}}> {data?.percentChange > 0 ? <CaretUpOutlined  style={{color: 'limegreen'}}/> : <CaretDownOutlined style={{color: 'red'}}/>} {data?.percentChange > 0 ? (<span style={{color: 'limegreen'}}>{millify(data?.percentChange)}%</span>) : (<span style={{color: 'red'}}>{millify(data?.percentChange)}%</span>)}</p>
                  </div>
                </div>
                

                {/* <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255, 0.1)'}}>
                <Typography.Title level={4} className="transactions-title">{title}</Typography.Title>
                <FireOutlined/>
                </div>
                <table style={{marginTop: '10px',width: '100%',}}>
                <tbody>
                    {data.map((coin, index) => (
                    <tr key={coin.name}>
                        <td><Image src={coin.image} style={{borderRadius: 50, height: '23px', width: '23px'}}/></td>
                        <td style={{textTransform: 'uppercase'}}>{coin.symbol}</td>
                        <td style={{textTransform: 'capitalize'}}>{coin.name}</td>
                        <td>${millify(coin.currentPrice)}</td>
                        <td>{coin.percentChange > 0 ? 
                        (<span style={{color: 'limegreen'}}>{millify(coin.percentChange)}%</span>) 
                        : 
                        (<span style={{color: 'red'}}>{millify(coin.percentChange)}%</span>)}</td>
                    </tr>
                    ))}
                </tbody>
                </table> */}
            </Card>
        </Col>
    )
}
