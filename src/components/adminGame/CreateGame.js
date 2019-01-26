import React, {Component} from "react";
import * as axios from "axios/index";
import {Spinner} from "primereact/components/spinner/Spinner";
import {Calendar} from "primereact/components/calendar/Calendar";
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import AdminNavigation from "../Navigation/AdminNavigation";
import {Button} from "primereact/components/button/Button";
import Notification from "../Notification";
import {Messages} from 'primereact/messages';
import {Redirect} from "react-router";

class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            length: 0,
            width: 0,
            date: '',
            type: '',
            location: ''
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    createGame = () => {
        let that = this;
        let formData = new FormData();
        formData.set('typeOfGame', this.state.type);
        formData.set('length', this.state.length);
        formData.set('width', this.state.width);
        formData.set('startDate', this.state.date.getTime());
        formData.set('locationName', this.state.location);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/create_game',
            data: formData,
            withCredentials: true
        }).then((res) => {
                if (res.data.gameId === undefined) {
                    //FIXME: тоже под хедером не видно
                    this.messages.showAttack({sticky: true, severity: 'error', summary: 'Ошибка', detail: res.data});
                } else {
                    this.setState({
                        game: res.data
                    });
                }
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    render() {
        if (window.sessionStorage.getItem('auth') === 'true') {
            if (window.sessionStorage.getItem('status') === 'Распорядитель') {
                let today = new Date();
                let month = today.getMonth();
                let nextMonth = (month === 11) ? 0 : month + 1;

                let maxDate = new Date();
                maxDate.setMonth(nextMonth);

                return (
                    <div id="createGame">
                        <Messages style={{marginTop: 50}} ref={(el) => this.messages = el}></Messages>
                        <AdminNavigation/>
                        <h2>Параметры игры:</h2>
                        <table>
                            <tbody>
                            <tr>
                                <td>Тип игры:</td>
                                <td><Dropdown value={this.state.type} options={gameType}
                                              onChange={this.handleChange('type')}
                                              placeholder="Выберите тип игры"/></td>
                            </tr>
                            <tr>
                                <td>Тип локации:</td>
                                <td><Dropdown value={this.state.location} options={locationType}
                                              onChange={this.handleChange('location')} placeholder="Выберите локацию"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Ширина:</td>
                                <td><Spinner readonly min={10} max={50} value={this.state.length}
                                             onChange={this.handleChange('length')}/></td>
                            </tr>
                            <tr>
                                <td>Высота:</td>
                                <td><Spinner readonly min={10} max={50} value={this.state.width}
                                             onChange={this.handleChange('width')}/></td>
                            </tr>
                            </tbody>
                        </table>
                        <p>Дата начала:</p>
                        <Calendar inline={true} dateFormat="dd/mm/yy" minDate={today} maxDate={maxDate}
                                  value={this.state.date}
                                  onChange={this.handleChange('date')}/>

                        <p><Button label="Создать игру" onClick={this.createGame}/></p>
                        <Notification/>
                    </div>
                );
            } else {
                return <Redirect to="/home"/>
            }
        } else {
            return <Redirect to="/"/>
        }
    }
}

const gameType = [
    {label: 'Обычная', value: 'true'},
    {label: 'Квартальная бойня', value: 'false'}
];

const locationType = [
    {label: 'Лес', value: 'Лес'},
    {label: 'Пустыня', value: 'Пустыня'},
    {label: 'Тропический лес', value: 'Тропический лес'},
    {label: 'Водная', value: 'Водная'},
    {label: 'Горы', value: 'Горы'},
    {label: 'Равнина', value: 'Равнина'},
    {label: 'Болото', value: 'Болото'}
];

export default CreateGame;