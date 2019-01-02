import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";

class Step1 extends Component {
    render() {
        return(
          <div>
              <h3>Шаг {this.props.currentStep}</h3>
              <h5>Имя:</h5>
              <InputText placeholder="name"/>
              <h5>Фамилия:</h5>
              <InputText placeholder="surname"/>
              <p><Button onClick={this.props.nextStep} label="Вперёд"/></p>
          </div>
        );
    }
}

export default Step1;