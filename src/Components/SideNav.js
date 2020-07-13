import React from 'react';
import { Link } from 'react-router-dom';

const handleLogout = (event) => {
  event.preventDefault();
  localStorage.removeItem('login');
  localStorage.removeItem('user');
  window.location = '/';
}

const SideNav = () => {

    return(
        <nav className="navbar">
            <ul className="navbar-nav">
              <li className="logo">
                <Link to='/expenses' className="nav-link">
                  <span className="link-text logo-text">Expenser</span>
                  <i className="fa fa-money" aria-hidden="true"></i>
                </Link>
              </li>
        
              <li className="nav-item">
                <Link to='/expenses' className="nav-link">
                    <i className="fa fa-th-list" />
                  <span className="link-text">Expenses</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/stats' className="nav-link">
                    <i className="fa fa-pie-chart" />
                  <span className="link-text">Stats</span>
                </Link>
              </li>

              {/*
              <li className="nav-item">
                <Link to='/profile' className="nav-link">
                    <i className="fa fa-user-circle-o primary" aria-hidden="true"></i>
                  <span className="link-text">Profile</span>
                </Link>
              </li>
              */}
        
              <li className="nav-item">
                <div onClick={(e) => handleLogout(e)} className="nav-link">
                    <i className="fa fa-sign-out" />
                <span className="link-text">Logout</span>
                </div>
              </li>
            </ul>
          </nav>
    )
}

export default SideNav;