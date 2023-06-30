import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CaretDownOutlined, CaretUpOutlined, FundViewOutlined  } from '@ant-design/icons';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { 
  Col, 
  Tooltip, 
  Row, 
  Badge,
  Select, 
  Drawer, 
  Avatar, 
  List, 
  Input, 
  Image,
  Tabs, 
  Layout, 
  Typography, 
  Card,
  Table, 
  Button, 
  Modal,
  Spin,
  notification, 
} from 'antd';
import { 
  NotificationOutlined, 
  BarChartOutlined, 
  VerticalAlignTopOutlined, 
  VerticalAlignBottomOutlined, 
  SettingOutlined, 
  PlusOutlined, 
  MessageOutlined, 
  CreditCardOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useGetCryptosQuery, useGetCryptoDetailsQuery } from '../services/cryptoApi';
import avatar_bg from "../images/avatar_bg.svg";
import avatar_pic from "../images/avatar_pic.png";
import heading_bg from "../images/header_bg2.jpg";
import icon4 from "../images/Ripple.svg";
import icon1 from "../images/Polygon.svg";
import icon2 from "../images/Tron.svg";
import icon3 from "../images/Cardano.svg";
import HomeLinechart from "./HomeLinechart";
import Settings from "./Settings";
import Credits from "./Credits";
import Notifications from "./Notifications";
import Chat from "./Chat";
import { Link, useHistory } from 'react-router-dom';
import HomeDonut from "./HomeDonut";
import { zodiacData, dawgzData, monkiesData, assetsData, topData, cryptoData, gainersList } from "../images/dummy";
import Loader from './Loader';
import millify from 'millify';
const { Meta } = Card;
const { Header, Content, Sider } = Layout;
const { Search } = Input;
import useWindowSize from "../hooks/useWindowSize";
import { useSelector } from "react-redux";
import AssetCard from './AssetCard';
import TrendingCoinCard from './TrendingCoinCard';

const data = [
  {
    icon: icon1,
    title: 'Polygon',
    desc: 'Buy',
    amount: '$ 1,200'
  },
  {
    icon: icon2,
    title: 'Tron',
    desc: 'Sell',
    amount: '$ 4,240'
  },
  {
    icon: icon3,
    title: 'Cardano',
    desc: 'Pending',
    amount: '$ 7,120'
  },
  {
    icon: icon4,
    title: 'Ripple',
    desc: 'Received',
    amount: '$ 264'
  },
];


const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Input number of tokens'
  );
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input number of tokens"
        maxLength={16}
      />
    </Tooltip>
  );
};


const Homepage = () => {
  // const history = useHistory();
  // const isAuth = Boolean(useSelector((state) => state.login));
  // console.log("state isAuth", isAuth)
  // const stateuser = useSelector((state) => state.user);
  // console.log("state user", stateuser)
  // const token = useSelector((state) => state.token);
  // console.log("state token", token)

  const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
  const [cryptos, setCryptos] = useState();

  const auth = localStorage.getItem('token');
  // console.log('auth', auth);

  if (!auth || auth === 'undefined') {
    history.push("/login");
  }

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const email = user.email;
  //STATES FOR ADDING ASSETS
  const [assets, setAssets] = useState([]);
  const [amount, setAmount] = useState('');  
  const [price, setPrice] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [profitChange, setProfitChange] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [likedCoins, setLikedCoins] = useState([]);
  const [gainers, setGainers] = useState([])


  //OVERVIEW TOP 3 CRYPTOS
  useEffect(() => {
    setLoadingOverview(true);
    setCryptos(cryptosList?.data?.coins);
    setLoadingOverview(false);
  }, [cryptosList]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`https://neublock-backend.onrender.com/users/liked/${email}`);
        const { liked } = response.data;
        setWatchlist(liked);

        const filteredCoins = cryptosList?.data?.coins.filter(
          (coin) => liked.includes(coin.uuid)
        );
        setLikedCoins(filteredCoins);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchlist();
  }, [email]);


  // useEffect(() => {
  //   const filteredCoins = cryptosList?.data?.coins.filter(
  //     (coin) => watchlist.includes(coin.uuid)
  //   );
  //   setLikedCoins(filteredCoins);
  // }, []);

  // console.log("likedCoins", likedCoins)

  // useEffect(() => {
  //   const fetchCoinData = async () => {
  //     try {
  //       const coinDataPromises = watchlist.map(async (uuid) => {
  //         const response = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${uuid}`, {
  //           headers: {
  //             'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_CRYPTO_RAPIDAPI_HOST,
  //             'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
  //           },
  //         });

  //         return response.data.data.coin;
  //       });

  //       const coinData = await Promise.all(coinDataPromises);
  //       console.log("coinData",coinData);
  //       // Now you have an array of coin data, you can update your state or use it as needed
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (watchlist.length > 0) {
  //     fetchCoinData();
  //   }
  // }, [watchlist]);

  // TOP GAINERS LIST 
  useEffect(() => {
    fetchTopGainers();
  }, [ ]);

  const fetchTopGainers = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'price_change_percentage_24h',
            per_page: 4,
            page: 1,
            sparkline: true,
          },
        }
      );

      const gainersData = response.data.map((coin) => ({
        key: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        currentPrice: coin.current_price,
        percentChange: coin.price_change_percentage_24h,
        icon: coin.image,
        sparkline: coin.sparkline_in_7d.price,
      }));

      setGainers(gainersData);
    } catch (error) {
      console.error('Error fetching top gainers:', error);
    }
  };

  // GET USER ASSETS SIDEBAR
  const getUserAssets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://neublock-backend.onrender.com/assets/${userId}`);
      const { assets } = response.data;
      setAssets(assets);

      // Get token names from the JSON
      const tokenNames = assets.map((item) => item.token);

      // Fetch current prices using CoinGecko API
      const pricesResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenNames.join(',')}&vs_currencies=usd`);
      const pricesData = pricesResponse.data;

      // Fetch historical price data for the last 24 hours
      const currentDate = Math.floor(Date.now() / 1000); // Get current timestamp
      const historicalPricesResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenNames.join(',')}&vs_currencies=usd&include_last_updated_at=true&date=${currentDate - 24 * 60 * 60}`);
      const historicalPricesData = historicalPricesResponse.data;

      // Calculate portfolio value
      let totalValue = 0;
      let totalCost = 0;

      assets.forEach((item) => {
        const currentPrice = pricesData[item.token]?.usd;
        const historicalPrice = historicalPricesData[item.token]?.usd;

        if (currentPrice && historicalPrice) {
          const value = item.amount * currentPrice;
          const cost = item.amount * historicalPrice;

          totalValue += value;
          totalCost += cost;
        }
      });
      setPortfolioValue(totalValue);

      // Calculate profit change percentage
      const percentChange = ((totalValue - totalCost) / totalCost) * 100;
      setProfitChange(percentChange);
      
      setLoading(false);
    } catch (error) {
      console.error('Error retrieving user assets:', error);
    }
  };
  
  useEffect(() => {
    // Retrieve user data and assets on component mount
    getUserAssets();
  }, []);

  console.log("assets",assets)
  console.log("likedCoins",likedCoins)

  // SUBMIT ASSETS TO DATABASE
  const submitAssets = async () => {
    const submittedAsset = {
        token,
        amount,
        price,
        email,
    };
    // https://neublock-backend.onrender.com/users/:id/crypto-data
    // https://neublock-backend.onrender.com/auth/login
    const assetResponse = await fetch("https://neublock-backend.onrender.com/assets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submittedAsset),
    });
    const assetData = await assetResponse.json();
    if (assetData.error) {
      notification.error({
      message: assetData.error,
      description: 'Oops! There was an error. Make sure to provide the necessary information before submitting.',
      });
    } else {
      notification.info({
        message: "Asset successfully added!",
        description: '',
        });
    }
  }

  // DELETE AN ASSET
  const handleDelete = async (assetId) => {
    try {
      await axios.delete(`https://neublock-backend.onrender.com/assets/${assetId}`);
      getUserAssets();
      setIsModalOpen(false);
      // setSelectedAsset(null);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  // ASSETS MODAL
  const showModal = (asset) => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await submitAssets();
    setAmount('')
    setPrice('')
    setToken('')
    getUserAssets();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setAmount('')
    setPrice('')
    setToken('')
    setIsModalOpen(false);
    // setSelectedAsset(null);
  };
  const onChange = (value) => {
    setToken(value)
    // console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    // console.log('search:', value);
  };  
  
  // SIDEBAR DRAWERS
  const { width } = useWindowSize();
  const [openSettings, setOpenSettings] = useState(false);
  const [openCredits, setOpenCredits] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [open, setOpen] = useState(false);

  const showSettings = () => {
    setOpenSettings(true);
  };
  const showCredits = () => {
    setOpenCredits(true);
  };
  const showChat = () => {
    setOpenChat(true);
  };
  const showNotifications = () => {
    setOpenNotifications(true);
  };
  const onCloseSettings = () => {
    setOpenSettings(false);
  };
  const onCloseCredits = () => {
    setOpenCredits(false);
  };
  const onCloseChat = () => {
    setOpenChat(false);
  };
  const onCloseNotifications = () => {
    setOpenNotifications(false);
  };

  const fullName = `${user.firstName} ${user.lastName}`;


const columns = [
  
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.rank - b.rank,
  },
  {
    title: "Icon",
    dataIndex: "iconUrl", 
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
    title: '24-hour performance',
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
];

  return (
      <Layout className="homepage-container" style={{minHeight: '100vh',}}>
        {/* MAIN */}
        <Layout>
          <Header className="header-container">
            <Row style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Col xl={4} lg={5} sm={5} xs={6} style={{height: '45px', display: 'grid', placeContent: 'center', padding: '0px'}}>
                  <p style={{color: '#fff', fontSize: '19px', lineHeight: '0.1'}}>Hi, {user.firstName}!</p>
                </Col>
                <Col xl={13} lg={16} sm={6} xs={10}>
                  
                  {/* {width < 500 ? 
                    <Row className="sidebar-user-mobile" justify="space-between">
                      <Col span={2} onClick={showNotifications}  >              
                        <Badge dot><NotificationOutlined className="sidebar-user-badge"/></Badge>
                      </Col>
                      <Col span={2} onClick={showChat} >              
                        <Badge dot><MessageOutlined className="sidebar-user-badge"/></Badge>
                      </Col>
                      <Col span={2} onClick={showCredits}>              
                        <Badge ><CreditCardOutlined className="sidebar-user-badge"/></Badge>
                      </Col>
                      <Col span={2} onClick={showSettings}>              
                        <Badge ><SettingOutlined className="sidebar-user-badge"/></Badge>
                      </Col>
                    </Row>
                    :
                    <Search
                      placeholder="Search cryptocurrency, auction, NFTs and more..."
                      allowClear
                      size="small"
                      className="header-search"
                      style={{
                        width: 400,
                      }}
                    />
                  } */}
                </Col>
            </Row>
          </Header>
          
          <Content className="main-container">
            <Row gutter={[15, 15]}>
              {/* MAIN - HEADER CARD */}
              <Card className="main-heading-card" style={{position: 'relative'}}>
                
                <Row style={{display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '2'}}>
                  <Typography.Title level={3} className="main-heading-title">Discover, Collect, and Sell</Typography.Title>
                  <Typography.Title level={3} className="main-heading-title">Extraordinary NFTs</Typography.Title>
                  <Row>
                    <Link to="/nft">
                      <Button className="heading-explore-button" style={{ fontSize: '11px', color: '#fff',borderRadius: '6px', marginRight: '10px', border: '0px'}}>Explore More</Button>
                    </Link>
                    <Link to="/nft">
                      <Button type="ghost" style={{ fontSize: '11px',borderRadius: '6px', color: '#fff'}}>Sell Artwork</Button>
                    </Link>
                  </Row>
                </Row>
                <img src={heading_bg} alt="header background" className="main-heading-card-bg"/>
              </Card>


              {/* MAIN - CRYPTO CATEGORIES LIST CARDS */}
              <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
                <Typography.Title level={5} style={{ height: 8}}>Overview</Typography.Title>
                <Typography.Title level={5} style={{ height: 8}}><Link to="/cryptocurrencies">See all coins</Link></Typography.Title>
              </Col>
                {gainers?.map((data, index) => (
                  <TrendingCoinCard data={data} key={index} loading={loadingOverview}/>
                ))}

              {/* MAIN - WATCHLIST TABLE*/}
              {likedCoins && likedCoins.length > 0 ? 
              <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',}}>
                <Typography.Title level={5} style={{ height: 8}}>Watchlist</Typography.Title>
              </Col>
              :
              ''
              }
              
              {likedCoins && likedCoins.length > 0 ? 
              <Col span={24}>
                <Table dataSource={likedCoins} columns={columns} className="home-table"/>
              </Col>
              :
              ''
              }

              {/* MAIN - NFT COLLECTION */}
              
              <Col span={24} className="nft-collection-wrapper" style={{ marginBottom: 50,}}>
                <Typography.Title level={4} className="nft-title-heading">My NFT Collections</Typography.Title>
                <Tabs defaultActiveKey="1" className="nft-tabs">
                <Tabs.TabPane tab="Top NFTs" key="1">
                  {width > 1100 ? 
                    <Row gutter={164}>
                      {topData?.map((top) => (
                      <Col xl={4} lg={5} key={top.name}>
                        <Card className="homepage-nft-collection" hoverable style={{width: 140, height: 145,}} cover={<img alt={top.name} src={top.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{top.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{top.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row> : 
                      <Row gutter={width > 1100 ? 164 : 3} className="nft-collection-grid">
                      {topData.filter((item, index) => index < 4)?.map((top) => (
                      <Col sm={2} xl={4} lg={6} key={top.name}>
                        <Card className="homepage-nft-collection" hoverable style={{width: 135, height: 145,}} cover={<img alt={top.name} src={top.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{top.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{top.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row>}
                  </Tabs.TabPane>
                <Tabs.TabPane tab="Monkies Club" key="2">
                    <Row gutter={3} className="nft-collection-grid">
                      {monkiesData?.map((monkies) => (
                      <Col xl={6} key={monkies.name}>
                        <Card className="homepage-nft-collection" hoverable style={{width: width > 1100 ? 141 : 135, height: 145,}} cover={<img alt={monkies.name} src={monkies.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{monkies.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{monkies.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Zodiac Kingdom" key="3">
                    <Row gutter={3} className="nft-collection-grid">
                      {zodiacData?.map((zodiac) => (
                      <Col span={6} key={zodiac.name}>
                        <Card className="homepage-nft-collection" hoverable style={{width: width > 1100 ? 140 : 135, height: 145,}} cover={<img alt={zodiac.name} src={zodiac.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                        <p style={{fontWeight: '500', color: 'cyan'}}>{zodiac.name}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{zodiac.price}</span></p>
                        </Card>
                      </Col>
                      ))}
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Wave Dawgz" key="4">
                    <Row gutter={3} className="nft-collection-grid">
                        {dawgzData?.map((dawgz) => (
                        <Col span={6} key={dawgz.name}>
                          <Card className="homepage-nft-collection" hoverable style={{width: width > 1100 ? 140 : 135, height: 145,}} cover={<img alt={dawgz.name} src={dawgz.image} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0'}}/>}>
                          <p style={{fontWeight: '500', color: 'cyan'}}>{dawgz.name}</p>
                          <p style={{fontWeight: '200',marginTop: '-5px'}}>Current price: <span style={{fontWeight: '500'}}>{dawgz.price}</span></p>
                          </Card>
                        </Col>
                        ))}
                      </Row>
                  </Tabs.TabPane>
                </Tabs>
              </Col>

              {/* MAIN - ASSET CHARTS */}
              {/* <Col span={24}>
                <Typography.Title level={5} style={{ height: 8}}>Statistics</Typography.Title>
              </Col>
              <Row gutter={width < 500 ? [9,24] : [34, 20]}>
                <Col xl={12} lg={16} sm={24} xs={24}>
                  <HomeLinechart/>
                </Col>
                <Col xl={6} lg={8} sm={24} xs={24}>
                  <HomeDonut assets={assets}/>
                </Col>
                <Col xl={5} lg={6} sm={24} xs={24} className="home-transactions-column">
                  <Card className="home-transactions-card" style={{width: width > 1100 ? '185px' : '140px', height: width > 1100 ? '180px' : '220px'}}>
                  <Typography.Title level={4} className="transactions-title">Recent Transactions</Typography.Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            className="transactions-list-item"
                            avatar={<Avatar style={{width: 23,height: 23}} src={item.icon} />}
                            title={item.title}
                            description={item.desc}
                          />
                          <div className="transactions-content">{item.amount}</div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
              </Row> */}
            </Row>
          </Content>
        </Layout>

        {/* SIDEBAR */}
        <Sider className="sidebar-container">
          <Row className="sidebar-user" justify="space-between">
            <Col span={2} onClick={showNotifications}  >              
              <Badge dot><NotificationOutlined className="sidebar-user-badge"/></Badge>
            </Col>
            <Col span={2} onClick={showChat} >              
              <Badge dot><MessageOutlined className="sidebar-user-badge"/></Badge>
            </Col>
            <Col span={2} onClick={showCredits}>              
              <Badge ><CreditCardOutlined className="sidebar-user-badge"/></Badge>
            </Col>
            <Col span={2} onClick={showSettings}>              
              <Badge ><SettingOutlined className="sidebar-user-badge"/></Badge>
            </Col>
          </Row>

          <Row className="sidebar-profile">
            <Col span={24} className="sidebar-user-right" style={{ position: 'relative'}}>
              <Image src={avatar_bg} style={{zIndex: '10', width: 246}}/>
              <Image src={user.picturePath} style={{ zIndex: '100', position: 'absolute', width: 125, height: 125, left: '-186px', top: '-64px' , borderRadius:'50%'}} />
              <Meta className="sidebar-profile-name" title={fullName} description={user.email} style={{ textAlign: 'center', color: '#fff', position: 'absolute', bottom: '-1px'}}/>
            </Col>
          </Row>               
          
          <Row className="sidebar-transactions">
            <Col span={24}>
              <Card className="sidebar-port">
                  <div style={{padding: '0 14px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255, 0.1)'}}>
                    <Typography.Title level={4} className="transactions-title">Portfolio Value</Typography.Title>
                    <BarChartOutlined style={{fontSize: 18}}/>
                  </div>

                    {loading ? <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', }}><Spin tip="Loading" /></Row> : 
                      <div style={{padding: '0 14px',margin: '10px 0 -20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <p style={{lineHeight: '1', fontSize: '24px', fontWeight: '400'}}>${millify(portfolioValue)}</p>
                      {portfolioValue === 0 ? "" : <p style={{lineHeight: '1', fontSize: '13px', fontWeight: '400'}}>
                        {profitChange.toFixed(2) > 0 ? 
                          <CaretUpOutlined  style={{color: 'limegreen'}}/> 
                          : 
                          <CaretDownOutlined style={{color: 'red'}}/>} 
                        {profitChange.toFixed(2) > 0 ? 
                          (<span style={{color: 'limegreen'}}>{profitChange.toFixed(2)}%</span>) 
                        : 
                          (<span style={{color: 'red'}}>{profitChange.toFixed(2)}%</span>)}
                      </p>}
                      </div>
                    }
                  
                    {assets && assets.length > 0 ? <HomeDonut assets={assets}/> : ''}

                  {/* <div className="sidebar-port-buttons">
                    <Button className="sidebar-button" style={{fontSize: '10px', borderRadius: '6px', width: width > 1100 ? '90px' : '80px', border: '0px', color: '#fff'}} icon={<VerticalAlignBottomOutlined style={{fontSize: '14px', marginLeft: width > 1100 ? '' : '-6px', marginRight: '-6px'}}/>}>Deposit</Button>
                    <Button className="sidebar-button" style={{fontSize: '10px', borderRadius: '6px', width: width > 1100 ? '90px' : '80px', border: '0px', color: '#fff'}} icon={<VerticalAlignTopOutlined style={{fontSize: '14px', marginLeft: width > 1100 ? '' : '-6px', marginRight: '-6px'}} />}>Withdraw</Button>
                  </div> */}
                </Card>
            </Col>
          </Row>
          
          <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', height: '60px', padding: '0 10px 0',}}>
            <Typography.Title level={4} className="coin-details-heading" style={{padding: '0 10px', height: 35}}>My Assets</Typography.Title>
            {/* <Button onClick={showModal} className="assets-add-button" style={{fontSize: '10px', borderRadius: '6px', width: '40px', border: '0px', color: '#fff',}} icon={<PlusOutlined style={{fontSize: '18px',}}/> }></Button> */}
            <PlusOutlined className='header-toggle-button' onClick={showModal} style={{fontSize: 16}}/>
          </div>
          
          {loading ? 
          <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', }}><Spin tip="Loading" /></Row> 
          : 
          <Row gutter={[10, 10]} className="sidebar-assets">
            {assets?.map((assets, index) => (
              <AssetCard 
                onDelete={() => handleDelete(assets._id)} 
                key={assets._id} 
                token={assets.token} 
                amount={assets.amount} 
                price={assets.price} 
              />
            ))}
            
          </Row>}
          { !assets ?
            <Col span={24} style={{textAlign: 'center', padding: 20, margin: 12, display: 'flex',flexDirection: 'column', alignItems: "center", justifyContent: 'center',height: 180, border: '2px dashed #fff', borderRadius: 10}}>
            <p style={{ fontSize: 12}}>Start tracking your assets by clicking the plus button</p>
            <FundViewOutlined  style={{ fontSize: 38}}/>
            </Col>
          :
          ''
          }
        </Sider>

        <Drawer style={{zIndex: '10000'}} title="Settings" placement="right" onClose={onCloseSettings} open={openSettings} className="drawer-settings">
          <Settings/>
        </Drawer>
        <Drawer style={{zIndex: '10000'}} title="Linked Cards" placement="right" onClose={onCloseCredits} open={openCredits} >
          <Credits/>
        </Drawer>
        <Drawer style={{zIndex: '10000'}} title="Messages" placement="right" onClose={onCloseChat} open={openChat} >
          <Chat/>
        </Drawer>
        <Drawer style={{zIndex: '10000'}} title="Notifications" placement="right" onClose={onCloseNotifications} open={openNotifications} >
          <Notifications/>
        </Drawer>
        <Modal 
          style={{width: '20px'}} 
          title="Add your assets" 
          open={isModalOpen} 
          onOk={handleOk} 
          onCancel={handleCancel}
        >
          <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px'}}>
            <Input
              style={{
                width: 290,
                height: 32,
              }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Number of tokens" 
            />

            <Input
              style={{
                width: 290,
                height: 32,
              }}
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="Average price" 
            />
            <Select
              style={{
                width: 290,
                height: 32,
              }}
              showSearch
              placeholder="Select a token"
              optionFilterProp="children"
              large
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={[
                {
                  value: 'apecoin',
                  label: 'apecoin',
                },
                {
                  value: 'aptos',
                  label: 'aptos',
                },
                {
                  value: 'arbitrum',
                  label: 'arbitrum',
                },
                {
                  value: 'binance',
                  label: 'binance',
                },
                {
                  value: 'bitcoin',
                  label: 'bitcoin',
                },
                {
                  value: 'cardano',
                  label: 'cardano',
                },
                {
                  value: 'ethereum',
                  label: 'ethereum',
                },
                {
                  value: 'litecoin',
                  label: 'litecoin',
                },
                {
                  value: 'optimism',
                  label: 'optimism',
                },
                {
                  value: 'polkadot',
                  label: 'polkadot',
                },
                {
                  value: 'polygon',
                  label: 'polygon',
                },
                {
                  value: 'solana',
                  label: 'solana',
                },
                {
                  value: 'sui',
                  label: 'sui',
                },
                {
                  value: 'tron',
                  label: 'tron',
                },
                {
                  value: 'xrp',
                  label: 'xrp',
                },
              ]}
            />
          </div>
      </Modal>
      {/* <Modal
  style={{ width: '20px' }}
  title={isCreatingAsset ? "Add your assets" : "Edit Asset"}
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
>
  {isModalOpen && (
    <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
      <Input
        style={{
          width: 290,
          height: 32,
        }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Number of tokens"
      />

      <Input
        style={{
          width: 290,
          height: 32,
        }}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Average price"
      />

      {isCreatingAsset && (
        <Select
          style={{
            width: 290,
            height: 32,
          }}
          showSearch
          placeholder="Select a token"
          optionFilterProp="children"
          large
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={[
            {
              value: 'apecoin',
              label: 'apecoin',
            },
            {
              value: 'aptos',
              label: 'aptos',
            },
            {
              value: 'arbitrum',
              label: 'arbitrum',
            },
            {
              value: 'binance',
              label: 'binance',
            },
            {
              value: 'bitcoin',
              label: 'bitcoin',
            },
            {
              value: 'cardano',
              label: 'cardano',
            },
            {
              value: 'ethereum',
              label: 'ethereum',
            },
            {
              value: 'litecoin',
              label: 'litecoin',
            },
            {
              value: 'optimism',
              label: 'optimism',
            },
            {
              value: 'polkadot',
              label: 'polkadot',
            },
            {
              value: 'polygon',
              label: 'polygon',
            },
            {
              value: 'solana',
              label: 'solana',
            },
            {
              value: 'sui',
              label: 'sui',
            },
            {
              value: 'tron',
              label: 'tron',
            },
            {
              value: 'xrp',
              label: 'xrp',
            },
          ]}
        />
      )}
    </div>
  )}
</Modal> */}
      </Layout>
  )
}

export default Homepage