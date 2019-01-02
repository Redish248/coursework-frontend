import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {SelectButton} from "primereact/components/selectbutton/SelectButton";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Calendar} from "primereact/components/calendar/Calendar";
import {Spinner} from "primereact/components/spinner/Spinner";
import {Button} from "primereact/components/button/Button";


class Step2 extends Component {
    render() {
        return(
            <div>
                <h3>Шаг {this.props.currentStep}</h3>
                <h5>Аватар:</h5>

                <h5>Пол:</h5>
                <SelectButton options={genderItems} />
                <h5>Дата рождения:</h5>
                <Calendar  monthNavigator={true} yearNavigator={true} yearRange="1980:2007" />
                <h5>Рост:</h5>
                <Spinner  min={100} max={210} />
                <h5>Вес:</h5>
                <Spinner min={20} max={100} />
                <p><Button onClick={this.props.nextStep} label="Вперёд"/></p>
                <p><Button onClick={this.props.previousStep} label="Назад"/></p>
            </div>
        );
    }
}
const genderItems = [
    {label: 'Мужской', value: 'false'},
    {label: 'Женский', value: 'true'},
];

export default Step2;