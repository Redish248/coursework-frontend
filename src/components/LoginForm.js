import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import {Password} from "primereact/components/password/Password";
import NavigationHome from "./NavigationHome";
import {connect} from "react-redux";
import {signIn} from "../actions/actions";
import * as axios from "axios";

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
        this.props.signIn(this.state.nick);
        this.props.history.push('/home');
    };

     logIn = (event) => {
         event.preventDefault();
         let formData = new FormData();
         formData.set('username', this.state.nick);
         formData.set('password', this.state.password);
         axios({
             method: 'post',
             url: 'http://localhost:8080/login',
             data: formData,
             withCredentials: true
         }).then(response => {
                 sessionStorage.setItem('isAuthorised', 'true');
                 this.props.signIn(this.state.nick);
                 this.props.history.push('/home');

             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 this.props.history.push('/ss');
             }
             if (error.response.status === 401) {
                 document.getElementById('error').innerText += "Пользователь не существует!";
             }
         });
     };

    render() {
        return(
            <div>
                <NavigationHome/>
                <p>Вход:</p>
                <p>Введите ник:</p>
                <InputText value={this.state.nick} onChange={this.handleChange('nick')}/>
                <p>Введите пароль:</p>
                <Password feedback={false} value={this.state.password} onChange={this.handleChange('password')}/>
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