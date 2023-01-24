import React,{ useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Layout } from "antd";
import { Chart, GlobalPage, Nft, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar, SignUp, LoginPage } from './components';
import LandingPage from "./components/LandingPage";
import { AuthContextProvider } from './context/AuthContext';


export default function App() {
    const history = useHistory();

  // const isAuth = Boolean(useSelector((state) => state.token));
  
  const auth = localStorage.getItem('token');
  console.log('auth', auth)

  return (
    <AuthContextProvider>
    <div className="app-container">
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/login">
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
            <Route exact path="/dashboard">
              {auth ? <Homepage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/global">
              {auth ? <GlobalPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/nft">
              {auth ? <Nft /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/chart">
              {auth ? <Chart /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/cryptocurrencies">
              {auth ? <Cryptocurrencies /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/crypto/:coinId">
              {auth ? <CryptoDetails /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/news">
              {auth ? <News /> : <Redirect to="/" />}
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
