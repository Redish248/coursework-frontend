import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {SelectButton} from "primereact/components/selectbutton/SelectButton";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Calendar} from "primereact/components/calendar/Calendar";
import {Spinner} from "primereact/components/spinner/Spinner";
import {Button} from "primereact/components/button/Button";
import {connect} from "react-redux";
import {signUp1, signUp2} from "../../actions/actions";
import RegPage1 from "./RegPage1";


class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: '',
            weight: 30,
            height: 150,
            birthday: new Date()
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    clickButton = () => {
        this.props.signUp2(this.props.sex, this.props.height, this.props.weight, this.props.birthday);
        this.props.goToStep(3);
    };

    render() {
        return(
            <div>
                <h3>Шаг {this.props.currentStep}</h3>
                <h5>Аватар:</h5>

                <h5>Пол:</h5>
                <SelectButton options={genderItems} value={this.props.sex} onChange={this.handleChange('sex')} />
                <h5>Дата рождения:</h5>
                <Calendar  monthNavigator={true} yearNavigator={true} yearRange="1980:2007" value={this.props.birthday} onChange={this.handleChange('birthday')}/>
                <h5>Рост:</h5>
                <Spinner  min={100} max={210} value={this.props.height} onChange={this.handleChange('height')} />
                <h5>Вес:</h5>
                <Spinner min={20} max={100} value={this.props.weight} onChange={this.handleChange('weight')}/>
                <p><Button onClick={this.clickButton} label="Вперёд"/></p>
                <p><Button onClick={this.props.previousStep} label="Назад"/></p>
            </div>
        );
    }
}
const genderItems = [
    {label: 'Мужской', value: 'false'},
    {label: 'Женский', value: 'true'},
];

function mapStateToProps(state)  {
    return {
        sex: state.sex,
        birthday: state.birthday,
        weight: state.weight,
        height: state.height
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp2 : (sex, height, weight, birthday) => dispatch(signUp2(sex, height, weight, birthday))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);