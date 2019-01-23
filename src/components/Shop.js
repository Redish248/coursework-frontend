import React, { Component } from "react";

import "../styles/Shop.css";
import * as axios from "axios/index";
import {Button} from "primereact/components/button/Button";
import {InputText} from "primereact/components/inputtext/InputText";

//TODO: потом сделать список всех трибутов, на которых можно нажать и отправить подарок
//а не вводить имя
class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            nick: '',
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
        let pr = this;
        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Еда') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    pr.sendPresent(element, 1);
                }
            }
        });
    };

    sendPresent = (product, count) => {
        let formData = new FormData();
        formData.set('nick', this.state.nick);
        formData.set('presentID', product.productId.toString());
        formData.set('quantity', count.toString());
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/send_present',
            data: formData,
            withCredentials: true
        }).then((res) => {
                console.log("Доставлено!")
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                console.log("Ошибка при отправке подарка")
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
        let pr = this.state;
        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Напиток') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    pr.sendPresent(element, 1);
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
        let pr = this.state;
        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Лекарства') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    pr.sendPresent(element, 1);
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

        let pr = this.state;
        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Инструменты') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    pr.sendPresent(element, 1);
                }
            }
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createOthersIcons = () => {
        document.getElementById("products").innerHTML = "";
        this.state.products.forEach(function(element) {
            if ((element.typeOfPresent === 'Другое') ) {
                createProduct(element);
            }
        });
        let pr = this.state;

        this.state.products.forEach((element) => {
            if ((element.typeOfPresent === 'Другое') ) {
                document.getElementById("img" + element.productId).src = "data:image/png;base64," + element.picture;
                let button = document.getElementById(element.productId);
                button.onclick = function () {
                    pr.sendPresent(element, 1);
                }
            }
        });
    };

    render() {
        return(
            <div className="shop">
                Введите имя трибута:
                <InputText value={this.state.nick} onChange={this.handleChange('nick')}/>
                <Button className="ok" label="Ок" onClick={this.getTributeInfo}/>
                <Button className="menuButton" label="Еда" onClick={this.createFoodIcons}/>
                <Button className="menuButton" label="Напитки" onClick={this.createDrinkIcons}/>
                <Button className="menuButton" label="Лекарства" onClick={this.createMedicineIcons}/>
                <Button className="menuButton" label="Инструменты" onClick={this.createToolsIcons}/>
                <Button className="menuButton" label="Другое" onClick={this.createOthersIcons}/>
                <div id="products"/>

            </div>
        );
    }
}

export default Shop;

const createProduct = (element) => {
    document.getElementById("products").innerHTML +=

        '<div class="product"><table id="productsT"><tbody><tr>' +
        '<td>' +
        '<img class="shopImg" id="img'+ element.productId + '" src="" alt=""/>' +
        '</td><td>' +
        '<table class="infoProduct"><tbody>' +
        '<tr><td class="productName">Название:</td><td>' + element.name + '</td></tr>' +
        '<tr><td class="productName">Цена:</td><td>' + element.cost + '</td></tr>' +
        '<tr><td class="productName">Восстановление здоровья</td><td>' + element.healthRecovery + '</td></tr>' +
        '<tr><td class="productName">Описание:</td><td>' + element.description + '</td></tr>' +
        '</tbody></table>' +
        '</td></tr></tbody></table>' +
        '<button class="buy" id="'+ element.productId + '">Купить</button>' +
        '</div> <br/> <br/>';

};

//TODO: количество подарков при отправке
const sendPresent = (product, tribute, count) => {
    console.log(tribute)
    let formData = new FormData();
    formData.set('tributeID', tribute.tributeId.toString());
    formData.set('presentID', product.productId.toString());
    formData.set('quantity', count.toString());
    axios({
        method: 'post',
        url: 'http://localhost:8080/hungergames/game/send_present',
        data: formData,
        withCredentials: true
    }).then((res) => {
           console.log("Доставлено!")
        }
    ).catch(function (error) {
        if (error === undefined || error.response === undefined) {
           console.log("Ошибка при отправке подарка")
        }
    });
};
