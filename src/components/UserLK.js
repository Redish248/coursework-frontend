import React, { Component } from "react";
import UserNavigation from "./Navigation/UserNavigation";
import {connect} from "react-redux";
import * as axios from "axios/index";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";
import {Button} from "primereact/components/button/Button";
import "../styles/UserLK.css";
import {Modal, OverlayTrigger} from "react-bootstrap";


 class UserLK extends Component {
     constructor(props) {
         super(props);
         this.state = {
             skills: [],
             trainings: [],
             games: [],
             user: [],
             district: '',
             status: '',
             sex: '',
             day: 2,
             show: false
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
         let formData = new FormData();
         formData.set('day', this.state.day.toString());
         axios({
             method: 'get',
             url: 'http://localhost:8080/hungergames/trainings',
             data: formData,
             withCredentials: true
         }).then((res) => {
             console.log(res.data)
             this.setState({
                 trainings: res.data
             });
             }
         ).catch(function (error) {
             console.log(error);
             if (error === undefined || error.response === undefined) {
                 this.props.history.push('/ss');
             }
         });
     };

     getUserInfo = () => {
         let that = this;
         axios({
             method: 'get',
             url: 'http://localhost:8080/hungergames/personal_page',
             withCredentials: true
         }).then((res) => {
                 this.setState({
                     user: res.data,
                     district: res.data.district.name,
                     status: res.data.status.name
                 });
                 if (this.state.user.sex) {
                     this.setState ({
                         sex: 'Женский'
                     })
                 } else {
                     this.setState ({
                         sex: 'Мужской'
                     })
                 }
             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 that.props.history.push('/ss');
             }
         });
     };

     editUserSend = () => {
         let that = this;
         let formData = new FormData();
         formData.set('password', this.props.password);
         axios({
             method: 'post',
             url: 'http://localhost:8080/hungergames/edit_user',
             data: formData,
             withCredentials: true
         }).then((res) => {
                 this.setState({
                     user: res.data
                 });
             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 that.props.history.push('/ss');
             }
         });
     };

     handleClose() {
         this.setState({ show: false });
     }

     editUser() {
         this.setState({ show: true });
     }

     componentDidMount() {
        this.getSkills();
        this.getUserInfo();
     }

    render() {
        return(
            <div className="userLK">
                <UserNavigation/>
                <table id="mainTable">
                    <tbody>
                    <tr>
                        <td>
                            <img src="../../public/icon.ico" alt=""/>
                            <p>Ник: {this.state.user.nick} </p>
                        </td>
                        <td>
                            <p>Данные о пользователе:</p>
                            <table id="userDataTable">
                                <tbody>
                                <tr>
                                    <td>Имя:</td>
                                    <td>{this.state.user.name}</td>
                                </tr>
                                <tr>
                                    <td>Фамилия:</td>
                                    <td>{this.state.user.surname}</td>
                                </tr>
                                <tr>
                                    <td>Пол:</td>
                                    <td>{this.state.sex}</td>
                                </tr>
                                <tr>
                                    <td>Дата рождения:</td>
                                    <td>{this.state.user.birthday}</td>
                                </tr>
                                <tr>
                                    <td>Рост:</td>
                                    <td>{this.state.user.height}</td>
                                </tr>
                                <tr>
                                    <td>Вес:</td>
                                    <td>{this.state.user.weight}</td>
                                </tr>
                                <tr>
                                    <td>Дистрикт:</td>
                                    <td>{this.state.district}</td>
                                </tr>
                                <tr>
                                    <td>Статус:</td>
                                    <td>{this.state.status}</td>
                                </tr>
                                </tbody>
                            </table>
                            <Button onClick={this.editUser} label="Сменить пароль"/>
                        </td>
                        <td>
                            <p>Мои навыки:</p>
                            <div id="resultSkill">
                                <center>
                                    <DataTable id="skillTable" value={this.state.skills}>
                                        <Column field="skill.name" header="Название"/>
                                        <Column field="levelOfSkill" header="Коэффициент владения"/>
                                    </DataTable>
                                </center>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Ближайшие игры и тренировки:</p>
                            Календарь

                            <Modal show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                   <div>kek</div>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default UserLK;