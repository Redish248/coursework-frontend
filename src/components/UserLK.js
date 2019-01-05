import React, { Component } from "react";
import UserNavigation from "./UserNavigation";
import {connect} from "react-redux";
import * as axios from "axios/index";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";


 class UserLK extends Component {
     constructor(props) {
         super(props);
         this.state = {
             skills: [],
             trainings: [],
             games: [],
             user: [],
             day: 1
         }
     }

     getSkills = () => {
         axios({
             method: 'get',
             url: 'http://localhost:8080/hungergames/get_all_skills',
             withCredentials: true
         }).then((res) => {
                 this.setState({
                     skills: res.data
                 });

             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 this.props.history.push('/ss');
             }
         });
     };

     getTrainings = () => {
         axios({
             method: 'get',
             url: 'http://localhost:8080/hungergames/trainings',
             data: this.state.day,
             withCredentials: true
         }).then((res) => {
                 this.setState({
                     trainings: res.data
                 });
             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 this.props.history.push('/ss');
             }
         });
     };

     getUserInfo = () => {
         axios({
             method: 'get',
             url: 'http://localhost:8080/hungergames/personal_page',
             withCredentials: true
         }).then((res) => {
                 this.setState({
                     user: res.data
                 });
             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 this.props.history.push('/ss');
             }
         });
     };

    render() {
        return(
            <div>
                <UserNavigation/>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <img src="../../public/icon.ico"/>
                            <p>Ник: {this.props.nick} </p>
                        </td>
                        <td>
                            <table>
                                <thead>Данные о пользователе:</thead>
                                <tbody>
                                <tr>
                                    <td>Имя:</td>
                                    <td>{this.props.name}</td>
                                </tr>
                                <tr>
                                    <td>Фамилия:</td>
                                    <td>{this.props.surname}</td>
                                </tr>
                                <tr>
                                    <td>Пол:</td>
                                    <td>{this.props.sex}</td>
                                </tr>
                                <tr>
                                    <td>Дата рождения:</td>
                                    <td>{this.props.birthday}</td>
                                </tr>
                                <tr>
                                    <td>Рост:</td>
                                    <td>{this.props.height}</td>
                                </tr>
                                <tr>
                                    <td>Вес:</td>
                                    <td>{this.props.weight}</td>
                                </tr>
                                <tr>
                                    <td>Дистрикт:</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Статус:</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <p>Мои навыки:</p>
                            <div id="resultPoint">
                                <center>
                                    <DataTable id="skillTable" value={this.state.skills}>
                                        <Column field="x" header="Название"/>
                                        <Column field="y" header="Коэффициент владения"/>
                                    </DataTable>
                                </center>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Ближайшие игры и тренировки:</p>
                            Календарь
                        </td>
                    </tr>
                    </tbody>
                </table>
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
        password: state.password
    }
}

export default connect(mapStateToProps)(UserLK);