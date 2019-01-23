import React, { Component } from "react";
import {Button} from "primereact/components/button/Button";
import {InputText} from "primereact/components/inputtext/InputText";
import {Password} from "primereact/components/password/Password";
import {signUp3} from "../../actions/actions";
import {connect} from "react-redux";
import * as axios from "axios";
import {withRouter} from "react-router";

class Step3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            password: '',
            pass: ''
        }

    }

    //TODO: добавить изображение
    signUp = (event) => {
        let that = this;
        event.preventDefault();
        let formData = new FormData();
        formData.set('username', this.state.nick);
        formData.set('password', this.state.password);
        formData.set('sex', this.props.sex);
        formData.set('name', this.props.name);
        formData.set('surname', this.props.surname);
        formData.set('height', this.props.height);
        formData.set('weight', this.props.weight);
        formData.set('birthday', this.props.birthday);
        if (this.props.file !== null) {
            formData.append('file', this.props.file, this.props.file.name);
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/signup',
            data: formData,
            withCredentials: true
        }).then(response => {
            this.props.signUp3(this.state.nick);
            axios({
                method: 'post',
                url: 'http://localhost:8080/login',
                data: formData,
                withCredentials: true
            }).then(response => {
                    this.props.history.push('/home');
                }
            );
        }).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
            if ((error.response) && (error.response.status = 400)) {
                document.getElementById('error').innerText = "Такой пользователь уже есть!";
            }
        });
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
            <div className="step">
                <h2>Регистрация</h2>
                <h3>Шаг {this.props.currentStep}</h3>
                <h4>Ник:</h4>
                <InputText value={this.state.nick} onChange={this.handleChange('nick')}/>
                <h4>Пароль:</h4>
                <Password value={this.state.password} onChange={this.handleChange('password')}/>
                <h4>Подтвердите пароль:</h4>
                <Password  feedback={false} value={this.state.pass} onChange={(e) => {this.setState({pass: e.target.value}); this.checkPassword(e.target.value);}} />
                <div id="error"/>
                <p><Button label="Зарегистрироваться" onClick={this.signUp}/></p>
                <p><Button onClick={this.props.previousStep} label="Назад"/></p>
            </div>
        );
    }
}

function mapStateToProps(state)  {
    return {
        nick: state.nick,
        name: state.name,
        surname: state.surname,
        sex: state.sex,
        height: state.height,
        weight: state.weight,
        birthday: state.birthday,
        password: state.password,
        file: state.file
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp3 : (nick) => dispatch(signUp3(nick))
    }
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Step3));