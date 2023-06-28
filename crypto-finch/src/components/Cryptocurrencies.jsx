import React, { useEffect, useState } from 'react';
import millify from 'millify';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { Card, Row, Col, Input, Table, Typography, Space, } from 'antd';
import { StarOutlined, StarFilled, AppstoreOutlined, BarsOutlined, BankOutlined, SlidersOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import useWindowSize from "../hooks/useWindowSize";
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const history = useHistory();
  const auth = localStorage.getItem('token');
  // console.log('auth', auth);
  
 useEffect(() => {
  if (!auth || auth === 'undefined') {
    history.push("/login");
  }
 }, [auth, history])
 const user = JSON.parse(localStorage.getItem('user'));
 const userId = user._id;
 const email = user.email;
  const { width } = useWindowSize();
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [list, setList] = useState([]);
  const [table, setTable] = useState(true);
  const [likedCoins, setLikedCoins] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/liked/${email}`);
        const { liked } = response.data;
        setWatchlist(liked);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchlist();
  }, [email]);

  const addToList = async (uuid) => {
    try {
      await axios.post("http://localhost:3001/users/add", {
        email,
        uuid,
      });
      setWatchlist([...watchlist, uuid]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromList = async (uuid) => {
    try {
      await axios.put("http://localhost:3001/users/remove", {
        email,
        uuid,
      });
      setWatchlist(watchlist.filter((coin) => coin !== uuid));
    } catch (error) {
      console.log(error);
    }
  };

  const isCoinLiked = (uuid) => {
    return watchlist.includes(uuid);
  };

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    setCoins(cryptosList?.data?.coins)
    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
// --------------------------------------------------------------------------

  const columns = [
    {
      title: 'Watchlist',
      key: 'watchlist',
      render: (_, coin) => (
        isCoinLiked(coin.uuid) ? (
          <StarFilled onClick={() => removeFromList(coin.uuid)}  style={{fontSize: 17, color: 'yellow' }} />
        ) : (
          <StarOutlined onClick={() => addToList(coin.uuid)}  style={{fontSize: 17, }}/>
        )
      ),
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.rank - b.rank,
    },
    {
      title: "Icon",
      dataIndex: "iconUrl",  // this is the value that is parsed from the DB / server side
      render: theiconUrl => <img alt={theiconUrl} src={theiconUrl} style={{height: '30px',}}/>  // 'theImageURL' is the variable you must declare in order the render the URL
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: '24-hour Performance',
      dataIndex: 'sparkline',
      render: sparkline => (<Sparklines data={sparkline}>
        <SparklinesLine color="cyan" />
      </Sparklines>), 
      key: 'sparkline',
    },
    {
      title: 'Price',
      dataIndex: "price",
      render: theprice => ("$" + " " + millify(theprice)), 
      key: 'price',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Daily change',
      dataIndex: "change",
      render: thechange => (thechange > 0 ? <span style={{ color: 'limegreen'}}>{thechange} %</span> : <span style={{ color: 'red'}}>{thechange} %</span>), 
      key: 'change',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.change - b.change,
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCap',
      render: themarketCap => ("$" + " " + millify(themarketCap)), 
      key: 'marketCap',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.marketCap - b.marketCap,
    },
    {
      title:"Action",
      key:"action",
      render:(_, record) => (
        <Space size="middle">
          <a href={`/crypto/${record.uuid}`}>More info</a>
        </Space>
      )
    }
  ];

  return (
    <Col>
    {!simplified && (
    <Row className="cryptocurrencies-header" style={{margin: 0}}>
      
      <Typography.Title level={5} style={{ position: 'absolute', left: 20, top: 15}}>Top 100 Cryptocurrencies</Typography.Title>
      
      {table && <div className="search-crypto" style={{backgroundColor: '#2b2f48', }}>
        <Input
          style={{ color: 'rgba(255, 255, 255, 1)', backgroundColor: '#2a2b47', border: '1px solid #515369',}}
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>}

      <div style={{ position: 'absolute', right: 20}}>
        {table ? 
        <BarsOutlined className='header-toggle-button' onClick={() => setTable(false)}/>
        :
        <AppstoreOutlined className='header-toggle-button' onClick={() => setTable(true)}/>
        }
      </div>
      
    
    </Row> )}

    <Col className="cryptocurrencies-container">
    
    {!table ? 
      // <Table dataSource={dataSource} columns={dataSourceColumns} className="cryptocurrencies-table"/>
        <Table dataSource={cryptosList?.data?.coins} columns={columns} />
      :
      <Row gutter={width < 500 ? [27, 27] : [32, 32]} justify="space-between" className="crypto-card-container" style={{padding: !simplified ? '55px 15px 0' : '10px 15px 0'}}>
      {cryptos?.map((currency) => (
        <Col
          xs={24}
          sm={24}
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
                  <div className="cryptocurrencies-details-1" style={{display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: '60px'}}>
                    <p style={{fontWeight: '400', fontSize: '38px',marginTop: '25px'}}>${millify(currency.price)}</p>
                  </div>
                <div className="cryptocurrencies-details-2">
                  <p style={{fontWeight: '400',lineHeight: '0.3', margin: '1px'}}><BankOutlined style={{border: '1px solid cyan', padding: '4px', borderRadius: ' 5px', color: 'cyan'}}/> {millify(currency.marketCap)}</p>
                  <p style={{fontWeight: '400',lineHeight: '0.3', margin: '1px'}}> {currency.change > 0 ? <CaretUpOutlined  style={{border: '1px solid cyan', padding: '4px', borderRadius: ' 5px', color: 'limegreen'}}/> : <CaretDownOutlined style={{border: '1px solid cyan', padding: '4px', borderRadius: ' 5px', color: 'red'}}/>} {currency.change > 0 ? (<span style={{color: 'limegreen'}}>{currency.change}%</span>) : (<span style={{color: 'red'}}>{currency.change}%</span>)}</p>
                </div>
              </div>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
    }

    </Col>
    </Col>
  );
};

export default Cryptocurrencies;
