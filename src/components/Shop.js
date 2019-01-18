import React, { Component } from "react";
import ShopNavigation from "./Navigation/ShopNavigation";

import "../styles/Shop.css";
import * as axios from "axios/index";
import {Button} from "primereact/components/button/Button";

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
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

    createFoodIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Еда') ) {
                createProduct(element);
            }

        })
    };

    createDrinkIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Напиток') ) {
                createProduct(element);
            }

        })
    };

    createMedicineIcons = () =>  {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Лекарства')  ) {
                createProduct(element);
            }

        })
    };

    createToolsIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Инструменты')  ) {
                createProduct(element);
            }

        })
    };

    createOthersIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Другое') ) {
                createProduct(element);
            }

        })
    };


    render() {
        return(
            <div className="shop">
                <h2>Магазин</h2>

                <ShopNavigation/>
                <p>
                <Button label="Еда" onClick={this.createFoodIcons}/>
                <Button label="Напитки" onClick={this.createDrinkIcons}/>
                <Button label="Лекарства" onClick={this.createMedicineIcons}/>
                <Button label="Инструменты" onClick={this.createToolsIcons}/>
                <Button label="Другое" onClick={this.createOthersIcons}/>
                </p>
                <div id="products"/>
            </div>
        );
    }
}

export default Shop;

const createProduct = (element) => {
    document.getElementById("products").innerHTML +=
        '<div class="product"><table><tbody><tr>'+
        '<td>' +
        'картинка' +
        '</td><td>' +
        '<table class="infoProduct"><tbody>' +
        '<tr><td>Название:</td><td>' + element.name + '</td></tr>' +
        '<tr><td>Цена:</td><td>' + element.cost + '</td></tr>' +
        '<tr><td>Восстановление здоровья</td><td>' + element.healthRecovery + '</td></tr>' +
        '<tr><td>Описание:</td><td>' + element.description + '</td></tr>' +
        '</tbody></table>' +
        '</td></tr></tbody></table>' +
        '<button>Купить</button>' +
        '</div> <br/> <br/>'
}