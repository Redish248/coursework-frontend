import React, { Component } from "react";
import "../../styles/Home.css";
import { Nav, Navbar, NavItem} from "react-bootstrap";
import * as axios from "axios/index";
import {signOut} from "../../actions/actions";
import {connect} from "react-redux";

class UserNavigation extends Component {

    handleLogOut = (event) => {
        axios.post('http://localhost:8080/logout')
            .then(res => {
                console.log('logout')
            }).catch((error)=> {
            if (error.response.status === 404) {
                this.props.signOut();
            }
        });

    };

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
                            <NavItem eventKey={3} href="/game">
                               Перейти в игру
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="/" onClick={this.handleLogOut}>
                                Выйти
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : (nick) => dispatch(signOut(nick))
    }
};

export default connect(null,mapDispatchToProps )(UserNavigation);

