import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";


export default class LoginForm extends Component {
    render() {
        return(
            <div>
                <p>Вход:</p>
                <p>Введите ник:</p>
                <InputText/>
                <p>Введите пароль:</p>
                <InputText/>
                <Button>Войти</Button>
            </div>
        );
    }
}