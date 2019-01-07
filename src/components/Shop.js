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
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/shop',
            withCredentials: true
        }).then((res) => {

                this.setState({
                    products: res.data
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                this.props.history.push('/ss');
            }
        });
    };

    render() {
        return(
            <div>
                <ShopNavigation/>
                <h2>Магазин</h2>
                <table>
                    <thead>Товары</thead>
                    <tbody>
                    <tr>
                        <td>Оружие</td>
                        <td>
                            <section class="card">
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                                <div class="card--content"></div>
                            </section>
                        </td>
                    </tr>
                    <tr>
                        <td>Еда</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Лекарства</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Другое</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                хм а чё как это делать
            </div>
        );
    }
}

export default Shop;