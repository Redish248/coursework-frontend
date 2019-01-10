import React, { Component } from "react";
import ShopNavigation from "./Navigation/ShopNavigation";

import "../styles/Shop.css";
import * as axios from "axios/index";

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    getProducts = () => {
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/shop',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    products: res.data
                });
                this.createProductIcons();
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    componentDidMount() {
        this.getProducts();
    }

    createProductIcons() {
        this.state.products.forEach(function(element) {
            if (element.typeOfPresent === 'Еда') {
                document.getElementById("food").innerHTML +=
                    '<div>'+ element.name+'</div>'
            }
            if (element.typeOfPresent === 'Напиток') {
                document.getElementById("drink").innerHTML +=
                    '<div>'+ element.name+'</div>'
            }
            if (element.typeOfPresent === 'Лекарства') {
                document.getElementById("medicine").innerHTML +=
                    '<div>'+ element.name+'</div>'
            }
            if (element.typeOfPresent === 'Инструменты') {
                document.getElementById("tools").innerHTML +=
                    '<div>'+ element.name+'</div>'
            }
            if (element.typeOfPresent === 'Другое') {
                document.getElementById("other").innerHTML +=
                    '<div>'+ element.name+'</div>'
            }
        })
    }

    render() {
        return(
            <div>
                <ShopNavigation/>
                <h2>Магазин</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Еда</td>
                        <td>
                            <div id="food"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Напитки</td>
                        <td><div id="drink"/></td>
                    </tr>
                    <tr>
                        <td>Лекарства</td>
                        <td><div id="medicine"/></td>
                    </tr>
                    <tr>
                        <td>Инструменты</td>
                        <td><div id="tools"/></td>
                    </tr>
                    <tr>
                        <td>Другое</td>
                        <td><div id="other"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Shop;