import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import {Password} from "primereact/components/password/Password";
import NavigationHome from "./Navigation/NavigationHome";
import {connect} from "react-redux";
import {signIn} from "../actions/actions";
import * as axios from "axios";
import "../styles/RegPage.css";

 class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    clickButton = () => {
        if ((this.state.nick === '') || (this.state.password === '')) {
            document.getElementById('errorL').innerText = "Введите данные!";
        } else {
            document.getElementById('errorL').innerText = "";
            let that = this;
            let formData = new FormData();
            formData.set('username', this.state.nick);
            formData.set('password', this.state.password);
            axios({
                method: 'post',
                url: 'http://localhost:8080/login',
                data: formData,
                withCredentials: true
            }).then(response => {
                    if (response !== undefined) {
                        this.props.signIn(this.state.nick);
                        this.props.history.push('/home');
                        console.log('login')
                    }
                }
            ).catch(function (error) {
                if (error === undefined || error.response === undefined) {
                    that.props.history.push('/ss');
                }
                if (error.response.status === 401) {
                    document.getElementById('errorL').innerText = "Неверный логин или пароль!";
                }
            });
        }
     };

    render() {
        return(
            <div className="step">
                <NavigationHome/>
                <h2>Вход:</h2>
                <div id="errorL"/>
                <h4>Введите ник:</h4>
                <InputText keyfilter={/[^\s]/} value={this.state.nick} onChange={this.handleChange('nick')}/>
                <h4>Введите пароль:</h4>
                <Password keyfilter={/[^\s]/} feedback={false} value={this.state.password} onChange={this.handleChange('password')}/>
                <p><Button label="Войти" onClick={this.clickButton}/></p>
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
        signIn : (nick) => dispatch(signIn(nick))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);