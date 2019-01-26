import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import {signUp1} from "../../actions/actions";
import {connect} from "react-redux";

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: ''
        }
    }

    clickButton = () => {
        if ((this.state.name === '') || (this.state.surname === '')) {
            document.getElementById('error1').innerText = "Введите данные!";
        } else {
            document.getElementById('error1').innerText = "";
            this.props.signUp1(this.state.name, this.state.surname);
            this.props.goToStep(2);
        }
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        return(
            <div className="step">
                <h2>Регистрация</h2>
                <h3>Шаг {this.props.currentStep}</h3>
                <h4>Имя:</h4>
                <InputText keyfilter={/[^\s]/} placeholder="имя" value={this.state.name} onChange={this.handleChange('name')}/>
                <h4>Фамилия:</h4>
                <InputText keyfilter={/[^\s]/} placeholder="фамилия" value={this.state.surname} onChange={this.handleChange('surname')}/>
                <div id="error1"/>
                <p><Button onClick={this.clickButton} label="Вперёд"/></p>
            </div>
        );
    }
}

function mapStateToProps(state)  {
    return {
        name: state.name,
        surname: state.surname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp1 : (name, surname) => dispatch(signUp1(name, surname))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);