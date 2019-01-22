import React, { Component } from "react";

import "../styles/Shop.css";
import * as axios from "axios/index";
import {Button} from "primereact/components/button/Button";

//TODO: потом сделать список всех трибутов, на которых можно нажать и отправить подарок
//а не вводить имя
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
            this.createFoodIcons();
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
        });

        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Еда') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    sendPresent(element, this.props.tribute, 1);
                }
            }
        });
    };

    createDrinkIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Напиток') ) {
                createProduct(element);
            }
        });

        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Напиток') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    sendPresent(element, this.props.tribute, 1);
                }
            }
        });
    };

    createMedicineIcons = () =>  {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Лекарства')  ) {
                createProduct(element);
            }
        });

        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Лекарства') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    sendPresent(element, this.props.tribute, 1);
                }
            }
        });
    };

    createToolsIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Инструменты')  ) {
                createProduct(element);
            }
        });

        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Инструменты') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    sendPresent(element, this.props.tribute, 1);
                }
            }
        });
    };

    createOthersIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Другое') ) {
                createProduct(element);
            }
        });

        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Другое') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    sendPresent(element, this.props.tribute, 1);
                }
            }
        });
    };


    render() {
        return(
            <div className="shop">
                <Button label="Еда" onClick={this.createFoodIcons}/>
                <Button label="Напитки" onClick={this.createDrinkIcons}/>
                <Button label="Лекарства" onClick={this.createMedicineIcons}/>
                <Button label="Инструменты" onClick={this.createToolsIcons}/>
                <Button label="Другое" onClick={this.createOthersIcons}/>
                <div id="products"/>
            </div>
        );
    }
}

export default Shop;

const createProduct = (element) => {
    document.getElementById("products").innerHTML +=

        '<div class="product"><table><tbody><tr>' +
        '<td>' +
        '<img class="shopImg" id="img'+ element.productId + '" src="" alt=""/>' +
        '</td><td>' +
        '<table class="infoProduct"><tbody>' +
        '<tr><td>Название:</td><td>' + element.name + '</td></tr>' +
        '<tr><td>Цена:</td><td>' + element.cost + '</td></tr>' +
        '<tr><td>Восстановление здоровья</td><td>' + element.healthRecovery + '</td></tr>' +
        '<tr><td>Описание:</td><td>' + element.description + '</td></tr>' +
        '</tbody></table>' +
        '</td></tr></tbody></table>' +
        '<button id="'+ element.productId + '">Купить</button>' +
        '</div> <br/> <br/>';

};

//TODO: количество подарков при отправке
const sendPresent = (product, tribute, count) => {
    //TODO: web socket for sending present
};
