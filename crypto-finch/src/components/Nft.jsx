import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Col, Row, Input, Tabs,Divider, Layout, Typography, Card, Select, Button, Image } from 'antd';
import { PlayCircleOutlined, FormOutlined } from '@ant-design/icons';
import { SiDiscord, SiTwitter } from 'react-icons/si';
import { BsGlobe, BsFillPersonCheckFill, BsCardImage, BsPiggyBank } from 'react-icons/bs';
import na from "../images/NA.jpg";
import nft_heading_bg from "../images/home_bg2.jpg";
import {  openseaSlugs } from "../images/dummy";
import Loader from './Loader';
import { useGetNftsQuery,useGetSlugAssetsQuery, useGetSlugsQuery, useGetCollectionsQuery } from '../services/nftApi';
import { useGetWebitQuery } from '../services/webitApi';
import useWindowSize from "../hooks/useWindowSize";

const { Header, Content } = Layout;
const { Search } = Input;

const Nft = () => {
  const { width } = useWindowSize();
    const { data: openseaList, isFetching } = useGetNftsQuery();
    const [opensea, setOpensea] = useState();

    const { data: slugs } = useGetSlugsQuery();
    /*Initial search inside setCollectionSlug is doodles-official. The value inside collectionSlug now is the string "doodles-official" as our slug */
    const [collectionSlug, setCollectionSlug] = useState('doodles-official');
    /*We then pass the value of collectionSlug inside "useGetCollectionsQuery", it will be processed by RTK then gives us back its in-depth data inside "nftCollections" */
    const { data: nftCollections } = useGetCollectionsQuery({collectionSlug});
    
    const { data: slugAssets } = useGetSlugAssetsQuery({collectionSlug});

    const [nftSearch, setNftSearch] = useState('');
    const { data: nftSearchResults } = useGetWebitQuery({ nftSearch });
    const nftWebitSearch = nftSearchResults?.data;
    
    useEffect(() => {
      setDataSlugAssets(slugAssets?.assets);;
    }, [slugAssets]);

    const [dataSlugAssets, setDataSlugAssets] = useState();
    
    useEffect(() => {
        setOpensea(openseaList?.assets);;
      }, [openseaList]);
    
      

    if (isFetching) return <Loader />;
  return (
      <Layout className="homepage-container" style={{minHeight: '100vh',}}>
        {/* MAIN */}
        <Layout>
            <Header className="header-container">
                <Row >
                    <Col span={10} offset={7}>
                        <Search
                            placeholder="Search any NFTs..."
                            allowClear
                            size="small"
                            style={{width: '100%',}}
                            onChange={(e) => setNftSearch(e.target.value.toLowerCase())}
                        />
                    </Col>
                </Row>
            </Header>
          
          <Content className="main-container">
            <Row gutter={[15, 15]}>
              
              {/* MAIN - NFT COLLECTION */}
              { !nftWebitSearch ?
              <Col span={24} className="nft-collection-wrapper">
                <Typography.Title level={4} className="nft-title-heading">NFT Gallery</Typography.Title>
                <Tabs defaultActiveKey="1" className="nft-tabs">
                <Tabs.TabPane tab="Featured" key="1">
                {/* MAIN - HEADER CARD */}
                <Card className="nft-heading-card" style={{position: 'relative'}}>
                  <Row style={{display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '2'}}>
                    <Typography.Title level={3} className="main-heading-title">One Stop NFT Marketplace</Typography.Title>
                    <p style={{fontSize: '12px', color: '#fff', lineHeight: '1', marginTop: '-6px'}}>Discover limited-edition digital artwork</p>
                    <p style={{fontSize: '12px', color: '#fff', lineHeight: '1', marginTop: '-6px', marginBottom: '15px'}}>Create, sell and collect yours now!</p>
                    <Row>
                    <Button className="heading-explore-button" style={{ fontSize: '11px', color: '#fff',borderRadius: '6px', marginRight: '10px', border: '0px'}}><FormOutlined />Start Creating</Button>
                    <Button type="ghost" style={{ fontSize: '11px',borderRadius: '6px', color: '#fff'}}><PlayCircleOutlined />Learn How</Button>
                    </Row>
                  </Row>
                  <img src={nft_heading_bg} alt="header background" className="main-heading-card-bg"/>
                </Card>

                    <Row gutter={[24, 24]}>
                      {opensea?.map((opensea) => (
                      <Col xl={4} lg={6} key={opensea.id}>
                        <Card 
                        className="my-nft-collection" 
                        hoverable 
                        style={{
                          width: width > 1100 ? 155 : 180, 
                          height:  width > 1100 ? 220 : 235, 
                          position: 'relative' }} 
                        cover={<img 
                          alt={opensea.image_url} src={opensea.image_url || na} 
                          style={{
                            border: '1px solid transparent',
                            borderRadius: '15px 15px 0 0', 
                            maxWidth: width > 1100 ? 170 : 182, 
                            maxHeight: 167,
                          }}
                        />
                        }>
                        
                        <p style={{fontSize: '12px', fontWeight: '500', color: 'cyan'}}>{opensea?.name || 'N/A'}</p>
                        <p style={{fontWeight: '200',marginTop: '-5px'}}>ID #: <span style={{fontWeight: '500'}}>{opensea.id}</span></p>
                        
                        <div className="nft-collection-data" style={{ width: '155px', height: '500px', position: 'absolute', top: '0px', left: '0px', bottom: '0px', right: '0px'}}></div>
                        <div className="nft-buy-button">
                          <span>BUY</span>
                        </div>
                        </Card>
                      </Col>
                      ))}
                    </Row>
                  </Tabs.TabPane>
                
                  <Tabs.TabPane tab="Discover Collections" key="2">
                    <Row gutter={[24, 24]}>
                      <Col span={24} offset={14} >
                        <Select
                          showSearch
                          style={{width: width > 1100 ? '420px' : '320px'}}
                          className="select-news"
                          placeholder="Select a collection"
                          optionFilterProp="children"
                          onChange={(value) => setCollectionSlug(value)}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                          <Option value="doodles-official">Doodles Official</Option>
                          {openseaSlugs?.map((collection) => <Option value={collection.slug}>{collection.title}</Option>)}
                        </Select>
                      </Col>

                      {/* MAIN - HEADER CARD */}
                        <div style={{position: 'relative', height: '300px', width: '100%',}}>
                        <Card className="nft-discover-heading-card" cover={<img alt="example" src={nftCollections?.collection.banner_image_url} style={{height: '100%'}}/>} >
                        </Card>
                        <Image width={200} src={nftCollections?.collection.image_url} style={{position: 'absolute', bottom: '0', left: '40px', border: '8px solid #fff', borderRadius: '15px'}}/>
                        </div>
                        <div style={{padding: '40px',}}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                          <Typography.Title level={2} >{nftCollections?.collection.name}</Typography.Title>
                          <div>
                            <a href={nftCollections?.collection.external_url} target="_blank" rel="noreferrer" style={{marginLeft: '20px'}}><BsGlobe size={21}/></a>
                            <a href={nftCollections?.collection.discord_url} target="_blank" rel="noreferrer" style={{marginLeft: '20px'}}><SiDiscord size={21}/></a>
                            <a href={`https://www.twitter.com/${nftCollections?.collection.twitter_username}`} target="_blank" rel="noreferrer" style={{marginLeft: '20px'}}><SiTwitter size={21}/></a>
                          </div>
                        </div>
                          <p>{nftCollections?.collection.description}</p> 

                          <Card style={{background: 'transparent', border: '3px solid cyan'}}>
                          <Row gutter={[16, 16]} className="nft-collection-stats">
                            <Col span={4}>
                              <div> 
                                <p>{nftCollections?.collection.stats.floor_price} <img style={{width: 15}} src={nftCollections?.collection.payment_tokens[0].image_url} /></p>                                
                                <p>floor price</p>
                              </div>
                            </Col>
                            <Col span={4}>
                              <div> 
                                <p>{millify(nftCollections?.collection.stats.total_volume)} <img style={{width: 15}} src={nftCollections?.collection.payment_tokens[0].image_url}  /></p>                                 
                                <p>volume</p>
                              </div>
                            </Col>
                            <Col span={4}>
                              <div> 
                                <p style={{padding: '12px 0'}}>{millify(nftCollections?.collection.stats.market_cap)} </p>                                 
                                <p>market cap</p>
                              </div>
                            </Col>
                            <Col span={4}>
                              <div> 
                              <p>{millify(nftCollections?.collection.stats.average_price)} <img style={{width: 15}} src={nftCollections?.collection.payment_tokens[0].image_url}  /></p>                                 
                                <p>avg price</p>
                              </div>
                            </Col>
                            <Col span={4}>
                              <div> 
                              <p style={{padding: '12px 0'}}>{nftCollections?.collection.stats.total_supply} </p>                                 
                                <p>items</p>
                              </div>
                            </Col>
                            <Col span={4}>
                              <div> 
                              <p style={{padding: '12px 0'}}>{nftCollections?.collection.stats.num_owners}</p>                                 
                                <p>unq owners</p>
                              </div>
                            </Col>
                          </Row>
                          </Card>
                          <Divider/>

                          <Row gutter={[24, 24]} style={{paddingTop: '20px'}}>
                            {dataSlugAssets && dataSlugAssets?.map((slugAssets, i) => (
                            slugAssets.image_url ? <Col xl={4} lg={6} key={i}>
                              <Card className="my-nft-collection" hoverable style={{minWidth: 155, height: width > 1100 ? 220 : 230 , position: 'relative'  }} cover={<img alt={slugAssets.image_url} src={slugAssets.image_url || na} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0', maxWidth: 170, maxHeight: 167,}}/>}>
                              <p style={{fontSize: '12px', fontWeight: '500', color: 'cyan'}}>{slugAssets.name || 'N/A'}</p>
                              <p style={{fontWeight: '200',marginTop: '-5px'}}>ID #: <span style={{fontWeight: '500'}}>{slugAssets.id}</span></p>
                              <div className="nft-collection-data" style={{ width: '155px',height: '500px', position: 'absolute', top: '0px', left: '0px', bottom: '0px'}}></div>
                              <div className="nft-buy-button">
                                <span>BUY</span>
                              </div>
                              </Card>
                            </Col> : null
                            ))}
                          </Row>
                        </div>
                      
                    </Row>
                  </Tabs.TabPane>
                </Tabs>
              </Col>
              :
              <Col span={24} className="nft-collection-wrapper">
                    <Row gutter={ width > 1100 ? [24, 24] : [8, 24]}>
                      {nftSearchResults.data.results.map((webit) => (
                      <a href={webit.website} target="_blank" rel="noreferrer">
                        <Col xl={4} lg={6} key={webit.name}>
                            <Card className="my-nft-collection" hoverable style={{width: 187, height: 287 }} cover={<img alt={webit.name} src={webit.image || N/A} style={{border: '1px solid transparent',borderRadius: '15px 15px 0 0', maxWidth: 193, maxHeight: 171}}/>}>
                            <p style={{fontSize: '12px', fontWeight: '500', color: 'cyan'}}>{webit.name || 'N/A'}</p>
                            <p style={{fontWeight: '560',marginTop: '-5px', wordWrap: 'break-word'}}>ADDRESS: <span style={{fontWeight: '200'}}>{webit.address || 'N/A'}</span></p>
                            <p style={{fontWeight: '560',marginTop: '-5px'}}>CHAIN: <span style={{fontWeight: '200'}}>{webit.chain || 'N/A'}</span></p>
                            <p style={{fontWeight: '560',marginTop: '-5px', wordWrap: 'break-word'}}>SITE: <span style={{fontWeight: '200'}}>{webit.website.length > 27 ? `${webit.website.substring(0, 27)}...` : webit.website || 'N/A'}</span></p>
                            </Card>
                        </Col>
                      </a>
                      ))}
                    </Row>
              </Col>
              }
            </Row>
          </Content>
        </Layout>
      </Layout>
  )
}

export default Nft