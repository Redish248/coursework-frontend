import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import {Password} from "primereact/components/password/Password";
import NavigationHome from "./NavigationHome";


export default class LoginForm extends Component {
    render() {
        return(
            <div>
                <NavigationHome/>
                <p>Вход:</p>
                <p>Введите ник:</p>
                <InputText/>
                <p>Введите пароль:</p>
                <Password feedback={false}/>
                <p><Button label="Войти"/></p>
            </div>
        );
    }
}