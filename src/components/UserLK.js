import React, {Component} from "react";
import * as axios from "axios/index";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";
import {Button} from "primereact/components/button/Button";
import "../styles/UserLK.css";
import {Modal} from "react-bootstrap";
import {Password} from "primereact/components/password/Password";
import Training from "./Training";
import {Messages} from "primereact/components/messages/Messages";
import VisitorNavigation from "./Navigation/VisitorNavigation";
import AdminNavigation from "./Navigation/AdminNavigation";
import TributeNavigation from "./Navigation/TributeNavigation";
import Notification from "./Notification";
import {Redirect} from "react-router";

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
            password: '',
            newPassword: '',
            pass: '',
            show: false,
            showTr: false,
            showCurrentTrain: false,
            showTrainInfo: true,
            currentTrain: []
        }
    }

    checkPassword = (val) => {
        if (this.state.newPassword !== val) {
            document.getElementById('errorPass').innerText = "Пароли не совпадают!";
        } else {
            document.getElementById('errorPass').innerText = "";
        }
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleEnd = () => {
        this.setState({
            showTr: false,
            showTrainInfo: true,
        });
        if (this.state.showCurrentTrain) {
            this.setState({
                showCurrentTrain: false
            })
        }
    };

    handleShow = () => {
        this.setState({
            showTr: true,
        });
        this.getTrainings();
    };


    changePassword = () => {
        if ((this.state.newPassword !== this.state.pass) || (this.state.password === '') || (this.state.newPassword === '')) {
            document.getElementById('errorPass').innerText = "Проверьте данные!";
        } else {
            document.getElementById('errorPass').innerText = "";
            let that = this;
            let formData = new FormData();
            formData.set('password', this.state.password);
            formData.set('newPassword', this.state.newPassword);
            axios({
                method: 'post',
                url: 'http://localhost:8080/hungergames/edit_user',
                data: formData,
                withCredentials: true
            }).then((res) => {
                    this.setState({
                        user: res.data,
                        show: false,
                        password: '',
                        newPassword: '',
                        pass: ''
                    });
                }
            ).catch(function (error) {
                if (error === undefined || error.response === undefined) {
                    that.props.history.push('/ss');
                }

                if (error.response.status === 403) {
                    document.getElementById('errorPass').innerText = "Неверный пароль!";
                }
            });
        }

    };


    getSkills = () => {
        let that = this;
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
                that.props.history.push('/ss');
            }
        });
    };

    getTrainings = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/trainings?day=' + this.state.day;
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    trainings: res.data
                });
                this.createTrainIcons();
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });

    };

    createTrainIcons = () => {
        document.getElementById('finish').style.display = 'block';
        this.state.trainings.forEach((element) => {
            document.getElementById("train").innerHTML +=
                '<div class="newTrain"><table><tbody>' +
                '<tr><td class="trainName">Название:</td><td>' + element.name + '</td></tr>' +
                '<tr><td class="trainName">Навык:</td><td>' + element.skill.name + '</td></tr>' +
                '<tr><td class="trainName">Коэффициент:</td><td>' + element.coefficient + '</td></tr>' +
                '<tr><td class="trainName">Описание:</td><td>' + element.description + '</td></tr>' +
                '<tr><td class="trainName">Длительность:</td><td>' + element.duration + ' минут</td></tr>' +
                '<tr><td class="trainName">Цена:</td><td>' + element.cost + '</td></tr>' +
                '<tr><td rowspan="2"><button id="' + element.trainingId + '">Посетить</button></td></tr>' +
                '</tbody></table></div><br/>';
        });

        this.state.trainings.forEach((element) => {
            let button = document.getElementById(element.trainingId);
            button.onclick = function () {
                changeState(element);
                document.getElementById('finish').style.display = 'none';
            }
        });

        const changeState = (element) => {
            if (this.state.user.cash - element.cost >= 0) {
                this.setState({
                    showCurrentTrain: true,
                    showTrainInfo: false,
                    currentTrain: element
                });
            } else {
                this.messages.show({severity: 'error', summary: 'Ошибка!', detail: 'Недостаточно средств'});
            }
        }

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
                    this.setState({
                        sex: 'Женский'
                    })
                } else {
                    this.setState({
                        sex: 'Мужской'
                    })
                }
                document.getElementById('avatar').src = "data:image/png;base64," + this.state.user.picture;
                window.sessionStorage.setItem('status',res.data.status.name.toString());
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    componentDidMount() {
        if (window.sessionStorage.getItem('auth') === 'true') {
            this.getSkills();
            this.getUserInfo();
            this.setState({
                day: new Date().getDay(),
            });
        }
    }


    render() {
        if (window.sessionStorage.getItem('auth') === 'true') {
            let dateB = new Date(this.state.user.birthday);
            let date = dateB.getDate() + '-' + (dateB.getMonth() + 1) + '-' + dateB.getFullYear();
            return (
                <div className="userLK">
                    {
                        this.state.status === "Наблюдатель"
                            ? <VisitorNavigation/>
                            : null
                    }
                    {
                        this.state.status === "Распорядитель"
                            ? <AdminNavigation/>
                            : null
                    }
                    {
                        this.state.status === "Трибут"
                            ? <TributeNavigation/>
                            : null
                    }
                    <table id="mainTable">
                        <tbody>
                        <tr>
                            <td id="td1">
                                <div>
                                    <img id="avatar" src="" alt=""/>
                                </div>
                                <p>Ник: {this.state.user.nick} </p>
                            </td>
                            <td id="td2">
                                <p>Данные о пользователе:</p>
                                <table id="userDataTable">
                                    <tbody>
                                    <tr>
                                        <td className="user">Имя:</td>
                                        <td>{this.state.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Фамилия:</td>
                                        <td>{this.state.user.surname}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Пол:</td>
                                        <td>{this.state.sex}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Дата рождения:</td>
                                        <td>{date}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Рост:</td>
                                        <td>{this.state.user.height}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Вес:</td>
                                        <td>{this.state.user.weight}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Дистрикт:</td>
                                        <td>{this.state.district}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Статус:</td>
                                        <td>{this.state.status}</td>
                                    </tr>
                                    <tr>
                                        <td className="user">Баланс:</td>
                                        <td>{this.state.user.cash}</td>
                                    </tr>
                                    </tbody>
                                </table>

                            <div className="modal-container">
                                <Button bsstyle="primary" bssize="large" onClick={() => this.setState({show: true})}
                                        label="Сменить пароль"/>

                                <Modal show={this.state.show} onHide={() => this.setState({show: false})}
                                       container={this} aria-labelledby="contained-modal-title">
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title">
                                            Сменить пароль
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Старый пароль:</p>
                                        <Password value={this.state.password} onChange={this.handleChange('password')}/>
                                        <p>Новый пароль:</p>
                                        <Password value={this.state.newPassword}
                                                  onChange={this.handleChange('newPassword')}/>
                                        <p>Повторите пароль:</p>
                                        <Password value={this.state.pass} onChange={(e) => {
                                            this.setState({pass: e.target.value});
                                            this.checkPassword(e.target.value);
                                        }}/>
                                        <div id="errorPass"/>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={this.changePassword} label="Сохранить"/>
                                    </Modal.Footer>
                                </Modal>

                                    <br/>
                                    {
                                        this.state.status === 'Наблюдатель'
                                            ? <Button bsstyle="primary" bssize="large" onClick={this.handleShow}
                                                      label="Потренироваться"/>
                                            : null
                                    }
                                    <Modal show={this.state.showTr} onHide={() => this.setState({showTr: false})}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Тренировки</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Messages ref={(el) => this.messages = el}/>
                                            {
                                                this.state.showTrainInfo
                                                    ? <div id="train"/>
                                                    : null
                                            }
                                            {
                                                this.state.showCurrentTrain
                                                    ? <Training train={this.state.currentTrain} finish={() => {
                                                        document.getElementById('finish').click()
                                                    }}/>
                                                    : null
                                            }

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button id="finish" onClick={this.handleEnd} label="Закрыть"/>
                                        </Modal.Footer>
                                    </Modal>
                                </div>

                            </td>
                            <td id="td3">
                                <div id="resultSkill">
                                    <p>Мои навыки:</p>
                                    <center>
                                        <DataTable id="skillTable" value={this.state.skills}>
                                            <Column field="skill.name" header="Название"/>
                                            <Column field="levelOfSkill" header="Коэффициент владения"/>
                                        </DataTable>
                                    </center>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Notification/>
                </div>
            );
        } else {
            return <Redirect to="/"/>
        }
    }
}


export default UserLK;