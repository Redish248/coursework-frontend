import React, { Component } from "react";
import "../styles/Home.css";
import NavigationHome from "./Navigation/NavigationHome";
import logo from '../images/logo.jpg'
import {Image} from "react-bootstrap";

export default class Home extends Component {

    render() {
        return (
            <div>
                <NavigationHome/>
                <p><Image src={logo}/></p>
                <div className="homeDiv">
                    <p>Добро пожаловать на Голодные игры!</p>
                    <p>какая-то инфа про игру</p>
                    <p>ещё что-то</p>
                </div>
            </div>
        );
    }
}

