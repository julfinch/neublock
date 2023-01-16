import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { BankOutlined, SlidersOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import useWindowSize from "../hooks/useWindowSize";

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const { width } = useWindowSize();
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  console.log(cryptosList);
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <Col className="cryptocurrencies-container">
      {!simplified && (<Row className="cryptocurrencies-header" style={{margin: '-20px -20px 0 -20px'}}>
      
        <div className="search-crypto" style={{backgroundColor: '#2b2f48'}}>
          <Input
            style={{ color: 'rgba(255, 255, 255, 1)', backgroundColor: '#2a2b47', border: '1px solid #515369',}}
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      
      </Row> )}
      <Row gutter={[32, 32]} justify="space-between" className="crypto-card-container" style={{padding: !simplified ? '55px 15px 0' : '10px 15px 0'}}>
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            xl={6}
            className="crypto-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
                className="cryptocurrencies-card"
              >
                <Sparklines data={currency.sparkline}>
                  <SparklinesLine color="cyan" />
                </Sparklines>
                <div style={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px',}}>
                  <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: '60px'}}>
                    <p style={{fontWeight: '400', fontSize: '38px',marginTop: '25px'}}>${millify(currency.price)}</p>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', height: '60px'}}>
                    <p style={{fontWeight: '400',lineHeight: '0.3', margin: '1px'}}><BankOutlined style={{border: '1px solid cyan', padding: '4px', borderRadius: ' 5px', color: 'cyan'}}/> {millify(currency.marketCap)}</p>
                    <p style={{fontWeight: '400',lineHeight: '0.3', margin: '1px'}}> {currency.change > 0 ? <CaretUpOutlined  style={{border: '1px solid cyan', padding: '4px', borderRadius: ' 5px', color: 'limegreen'}}/> : <CaretDownOutlined style={{border: '1px solid cyan', padding: '4px', borderRadius: ' 5px', color: 'red'}}/>} {currency.change > 0 ? (<span style={{color: 'limegreen'}}>{currency.change}%</span>) : (<span style={{color: 'red'}}>{currency.change}%</span>)}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default Cryptocurrencies;
