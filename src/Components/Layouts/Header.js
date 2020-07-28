import React from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    window.location = '/';
}

const Header = () => {

    const [isNavOpen, toggleNav] = React.useState(false);

    return(
        <div>
            <Navbar dark className="border-bottom border-white">
                <NavbarBrand className="mr-auto">
                    <div onClick={() => window.open('https://mohitjain.now.sh', "_blank")}>Mohit Jain</div>
                </NavbarBrand>

                <NavbarToggler onClick={() => toggleNav(!isNavOpen)} />
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/expenses' 
                                onClick={() => toggleNav(!isNavOpen)}>
                                <span className="fa fa-th-list"></span> Expenses</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to='/stats' 
                                onClick={() => toggleNav(!isNavOpen)}>
                                <span className="fa fa-pie-chart"></span> Stats</NavLink>
                        </NavItem>
                        
                        <NavItem>
                            <NavLink className="nav-link" to='/profile' 
                                onClick={() => toggleNav(!isNavOpen)}>
                                <span className="fa fa-user-circle-o"></span> Profile</NavLink>
                        </NavItem>

                        <NavItem>
                            <div className="nav-link" onClick={(e) => handleLogout(e)}>
                                <span className="fa fa-sign-out"></span> Logout</div>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );

}

export default Header;