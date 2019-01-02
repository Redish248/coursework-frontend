import React, { Component } from "react";
import {Button} from "primereact/components/button/Button";
import {InputText} from "primereact/components/inputtext/InputText";
import {Password} from "primereact/components/password/Password";

class Step3 extends Component {
    render() {
        return(
            <div>
                <h3>Шаг {this.props.currentStep}</h3>
                <h5>Ник:</h5>
                <InputText/>
                <h5>Пароль:</h5>
                <Password/>
                <h5>Подтвердите пароль:</h5>
                <Password/>
                <p><Button>Зарегистрироваться</Button></p>
                <p><button onClick={this.props.previousStep}>Назад</button></p>
            </div>
        );
    }
}

export default Step3;