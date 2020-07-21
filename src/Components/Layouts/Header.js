import React from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    window.location = '/';
}

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
        };
    }

    closeNavBar = (event) => {
        this.setState({isNavOpen: false})
    }

    toggleNav() {
        this.setState({
        isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <div>
                <Navbar dark className="border-bottom border-white">
                    <NavbarBrand className="mr-auto">
                        <div onClick={() => window.open('https://mohitjain.now.sh', "_blank")}>Mohit Jain</div>
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/expenses' onClick={(event) => this.closeNavBar(event)}>
                                    <span className="fa fa-th-list"></span> Expenses</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/stats' onClick={(event) => this.closeNavBar(event)}>
                                    <span className="fa fa-pie-chart"></span> Stats</NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className="nav-link" to='/profile' onClick={(event) => this.closeNavBar(event)}>
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
}

export default Header;