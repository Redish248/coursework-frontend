import React, { Component } from "react";
import {SelectButton} from "primereact/components/selectbutton/SelectButton";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Calendar} from "primereact/components/calendar/Calendar";
import {Spinner} from "primereact/components/spinner/Spinner";
import {Button} from "primereact/components/button/Button";
import {connect} from "react-redux";
import {signUp2} from "../../actions/actions";


class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: '',
            weight: 30,
            height: 150,
            birthday: new Date(),
            file: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    clickButton = () => {
        this.props.signUp2(this.state.sex, this.state.height, this.state.weight, this.state.birthday, this.state.file);
        this.props.goToStep(3);
    };

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            this.setState({
                file: reader,

            });
        }

        reader.readAsArrayBuffer(file)

    }

    render() {
        return(
            <div className="step">
                <h2>Регистрация</h2>
                <h3>Шаг {this.props.currentStep}</h3>
                <h4>Аватар:</h4>
                <input className="fileInput"
                       type="file"
                       onChange={(e)=>this._handleImageChange(e)} />
                <h4>Пол:</h4>
                <SelectButton options={genderItems} value={this.state.sex} onChange={this.handleChange('sex')} />
                <h4>Дата рождения:</h4>
                <Calendar  dateFormat="dd/mm/yy" monthNavigator={true} yearNavigator={true} yearRange="1980:2007" value={this.state.birthday} onChange={this.handleChange('birthday')}/>
                <h4>Рост:</h4>
                <Spinner  min={100} max={210} value={this.state.height} onChange={this.handleChange('height')} />
                <h4>Вес:</h4>
                <Spinner min={20} max={100} value={this.state.weight} onChange={this.handleChange('weight')}/>
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
        height: state.height,
        file: state.imagePreviewUrl
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp2 : (sex, height, weight, birthday, file) => dispatch(signUp2(sex, height, weight, birthday, file))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);