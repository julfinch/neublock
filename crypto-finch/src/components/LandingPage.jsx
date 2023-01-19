import React from 'react'
import { Hero, Companies, Trending, Footer } from '../scenes/landingPage';
import { Col, Layout } from 'antd';



const LandingPage = () => {
  return (
    <Layout style={{minHeight: '100vh',}}>
      <Hero/>
      <Companies/>
      <Trending/>
      <Footer/>
    </Layout>
  )
}

export default LandingPage