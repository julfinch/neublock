import React from 'react'
import { Image, Typography } from 'antd';
import logo from "../../images/logo.png";
import { Link, useLocation, useHistory } from 'react-router-dom';


const { Title } = Typography;

const Navbar = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const auth = localStorage.getItem('token');

    const handleDashboard = () => {
      history.push("/dashboard");
    };

  return (
    <>
        <div className="landing-nav">
            <Link to="/">
                <div className="landing-nav-logo">
                  { pathname === "/login" ? <></> : 
                    <Image
                      width={50}
                      src={logo}
                      preview={false}
                    />}
                    <Title level={2} style={{marginLeft: '10px'}} className="landing-footer-title">NeuBlock</Title>
                </div>
            </Link>
          <div className="landing-nav-item">
            <ul className="landing-nav-list">
              <a href="/">
                <li className="landing-nav-listItem">Homepage</li>
              </a>
              <li className="landing-nav-listItem">Products</li>
              <li className="landing-nav-listItem">Events</li>
            </ul>
          </div>
          {auth ?
          <Link to={"/dashboard"}>
          <button className="landing-nav-signin" onClick={handleDashboard}>
            Dashboard
          </button>
          </Link>
          : 
          <Link to={pathname === "/login" ? "/" : "/login"}>
          <button className="landing-nav-signin">
            {pathname === "/login" ? "Connect Wallet" : "Sign In"}
          </button>
          </Link>
          }
        </div>
    </>
  )
}

export default Navbar