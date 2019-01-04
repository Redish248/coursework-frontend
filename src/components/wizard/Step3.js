import React, { Component } from "react";
import {Button} from "primereact/components/button/Button";
import {InputText} from "primereact/components/inputtext/InputText";
import {Password} from "primereact/components/password/Password";
import {signUp3} from "../../actions/actions";
import {connect} from "react-redux";

class Step3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: '',
            pass: ''
        }
    }

    clickButton = () => {
        this.props.signUp3(this.props.nick);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    checkPassword = (val) => {
      if (this.state.password !== val) {
        document.getElementById('error').innerText = "Пароли не совпадают!";
      } else {
          document.getElementById('error').innerText = "";
      }
    };

    render() {
        return(
            <div>
                <h3>Шаг {this.props.currentStep}</h3>
                <h5>Ник:</h5>
                <InputText value={this.state.nick} onChange={this.handleChange('nick')}/>
                <h5>Пароль:</h5>
                <Password value={this.state.password} onChange={this.handleChange('password')}/>
                <h5>Подтвердите пароль:</h5>
                <Password  feedback={false} value={this.state.pass} onChange={(e) => {this.setState({pass: e.target.value}); this.checkPassword(e.target.value);}} />
                <div id="error"/>
                <p><Button label="Зарегистрироваться" onClick={this.clickButton}/></p>
                <p><Button onClick={this.props.previousStep} label="Назад"/></p>
            </div>
        );
    }
}

function mapStateToProps(state)  {
    return {
        nick: state.nick
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp3 : (nick) => dispatch(signUp3(nick))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Step3);