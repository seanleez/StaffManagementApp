import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="lg" className="fixed-top">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto d-flex align-items-center" href="/">
                            <span><i className="fa fa-id-card fa-2x" aria-hidden="true"></i></span>
                            <h5 className='d-inline-block mb-0 mx-2'>Staff Management App</h5>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/staff">
                                        {/* 'fa' class: leave off any style classes from your icons, 
                                        initially set to default to the solid style (font-weight = 900) */}
                                        <span className="fa fa-users fa-lg"></span> Staff
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/department">
                                        <span className="fa fa-th fa-lg"></span> Department
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/salary">
                                        <span className="fa fa-money fa-lg"></span> Salary
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header