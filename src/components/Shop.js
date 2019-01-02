import React, { Component } from "react";
import ShopNavigation from "./ShopNavigation";

import "../styles/Shop.css";

class Shop extends Component {
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