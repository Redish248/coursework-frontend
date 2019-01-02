import React, { Component } from "react";
import "../styles/Home.css";
import { Nav, Navbar, NavItem} from "react-bootstrap";

export default class UserNavigation extends Component {

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
                            <NavItem eventKey={1} href="/home">
                                Моя страница
                            </NavItem>
                            <NavItem eventKey={2} href="/gamehistory">
                                История игр
                            </NavItem>
                            <NavItem eventKey={3} href="/training">
                                Тренировка
                            </NavItem>
                            <NavItem eventKey={4} href="/settings">
                                Настройки
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/login">
                                Выйти
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

