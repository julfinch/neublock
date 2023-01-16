import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const GlobalPage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  console.log(data);
  if (isFetching) return <Loader />;

  return (
    <Col className="global-container">
      <Title level={3} className="heading">Global Crypto Stats</Title>
      <Card className="global-heading-card">
        <Row gutter={[32, 32]}>
          <Col span={8}><Statistic className="global-heading-text" title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
          <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges)} /></Col>
          <Col span={8}><Statistic title="Total Market Cap:" value={`$${millify(globalStats?.totalMarketCap)}`} /></Col>
          <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats?.total24hVolume)}`} /></Col>
          <Col span={8}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
          <Col span={12}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)} /></Col>
        </Row>
      </Card>
      <div className="home-heading-container">
        <Title level={3} className="home-title">Top 12 Cryptos In The World</Title>
        <Title level={5} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <div className="global-components-container">
        <Cryptocurrencies simplified/>
      </div>
      
      <div className="home-heading-container">
        <Title level={3} className="home-title">Latest Crypto News</Title>
        <Title level={5}><Link to="/news">Show more</Link></Title>
      </div>
      <div className="global-components-container">
        <News simplified />
      </div>
    </Col>
  );
};

export default GlobalPage;
