import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Typography, Space } from "antd";
import { Chart, GlobalPage, Nft, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar, SignUp, LoginPage } from './components';
import { AuthContextProvider } from './context/AuthContext';


export default function App() {
  return (
    <AuthContextProvider>
    <div className="app-container">
      <Route exact path="/">
        <LoginPage />
      </Route>
    <div className="app">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/home">
              <Homepage />
            </Route>
            <Route exact path="/global">
              <GlobalPage />
            </Route>
            <Route exact path="/nft">
              <Nft />
            </Route>
            <Route exact path="/chart">
              <Chart />
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Layout>
      {/*
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021 
            <Link to="/">
              Crypto Finch Inc.
            </Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
      </div>
      */}
      </div>
    </div>
    </div>
    </AuthContextProvider>
  );
}
