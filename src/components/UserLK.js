import React, { Component } from "react";
import UserNavigation from "./Navigation/UserNavigation";
import {connect} from "react-redux";
import * as axios from "axios/index";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";
import {Button} from "primereact/components/button/Button";
import "../styles/UserLK.css";
import {ButtonToolbar, Modal, ModalBody, ModalFooter, ModalHeader, OverlayTrigger, Popover} from "react-bootstrap";
import {Password} from "primereact/components/password/Password";


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
             modal: false,
             password: '',
             newPassword: ''
         }
     }


     handleChange = name => event => {
         this.setState({
             [name]: event.target.value,
         });
     };


     handleHide = () => {
         let that = this;
         let formData = new FormData();
         formData.set('password', this.props.password);
         formData.set('newPassword', this.props.newPassword);
         axios({
             method: 'post',
             url: 'http://localhost:8080/hungergames/edit_user',
             data: formData,
             withCredentials: true
         }).then((res) => {
                 this.setState({
                     user: res.data
                 });

             //this.setState({show: false});
             }
         ).catch(function (error) {
             if (error === undefined || error.response === undefined) {
                 that.props.history.push('/ss');
             }

             if (error.status === 403) {
                 console.log('kek')
             }
         });

     };


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

     componentDidMount() {
        this.getSkills();
        this.getUserInfo();
     }


    render() {
        let dateB = new Date(this.state.user.birthday);
        let date = dateB.getDate() + '-' + (dateB.getMonth()+ 1) + '-' +  dateB.getFullYear();
        return(
            <div className="userLK">
                <UserNavigation/>
                <table id="mainTable">
                    <tbody>
                    <tr>
                        <td>
                            <img src={""} alt=""/>
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
                                    <td>{date}</td>
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

                            <div className="modal-container" style={{ height: 200 }}>
                                <Button
                                    bsStyle="primary"
                                    bsSize="large"
                                    onClick={() => this.setState({ show: true })}
                                    label="Сменить пароль"
                                />

                                <Modal
                                    show={this.state.show}
                                    onHide={this.handleHide}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">
                                            Сменить пароль
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                       <p>Старый пароль:</p>
                                        <Password value={this.state.password} onChange={this.handleChange('password')}/>
                                        <p>Новый пароль:</p>
                                        <Password value={this.state.newPassword} onChange={this.handleChange('newPassword')}/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.handleHide} label="Сохранить"/>
                                    </Modal.Footer>
                                </Modal>
                            </div>

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

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}



export default UserLK;