import React, { Component } from "react";
import "../../styles/Home.css";
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";

export default class NavigationHome extends Component {

    render() {
        return (
            <div>
                <Navbar fixedTop inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Голодные игры
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="/">
                                На главную
                            </NavItem>
                            <NavItem eventKey={2} href="/gamehistory">
                                История игр
                            </NavItem>
                            <NavDropdown eventKey={3} title="что-то ещё" id="basic-nav-dropdown">
                                <MenuItem eventKey={3.1}>Action</MenuItem>
                                <MenuItem eventKey={3.2}>Another action</MenuItem>
                                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>Separated link</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/login">
                                Вход
                            </NavItem>
                            <NavItem eventKey={2} href="/signup">
                                Регистрация
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

