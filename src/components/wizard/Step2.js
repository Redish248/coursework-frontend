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
            sex: 'false',
            weight: 30,
            height: 150,
            birthday: new Date(),
            file: null
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    clickButton = () => {
        if (this.state.file.size >= 1048576 ) {
            document.getElementById('error2').innerText = "Размер файла не больше 1MB!";
        } else {
            if (this.state.file === null) {
                document.getElementById('error2').innerText = "Выберите изображение!";
            } else {
                document.getElementById('error2').innerText = "";
                this.props.signUp2(this.state.sex, this.state.height, this.state.weight, this.state.birthday.getTime(), this.state.file);
                this.props.goToStep(3);
            }
        }
    };

    _handleImageChange(e) {
        e.preventDefault();
            this.setState({
                file: e.target.files[0],

            });

    }

    render() {
        return(
            <div className="step">
                <h2>Регистрация</h2>
                <h3>Шаг {this.props.currentStep}</h3>
                <h4>Аватар:</h4>
                <h5>Файл должен весить меньше 1MB</h5>
                <input className="fileInput"
                       type="file"
                       onChange={(e)=>this._handleImageChange(e)} />
                <div id="error2"/>
                <h4>Пол:</h4>
                <SelectButton options={genderItems} value={this.state.sex} onChange={this.handleChange('sex')} />
                <h4>Дата рождения:</h4>
                <Calendar readonly dateFormat="dd/mm/yy" monthNavigator={true} yearNavigator={true} yearRange="1980:2007" value={this.state.birthday} onChange={this.handleChange('birthday')}/>
                <h4>Рост:</h4>
                <Spinner readonly  min={100} max={210} value={this.state.height} onChange={this.handleChange('height')} />
                <h4>Вес:</h4>
                <Spinner readonly min={20} max={100} value={this.state.weight} onChange={this.handleChange('weight')}/>
                <br/>
                <Button onClick={this.clickButton} label="Вперёд"/>
                <br/>
                <Button onClick={this.props.previousStep} label="Назад"/>
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
        file: state.file
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp2 : (sex, height, weight, birthday, file) => dispatch(signUp2(sex, height, weight, birthday, file))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);