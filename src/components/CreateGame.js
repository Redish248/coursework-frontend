import React, { Component } from "react";
import * as axios from "axios/index";
import {Spinner} from "primereact/components/spinner/Spinner";
import {Calendar} from "primereact/components/calendar/Calendar";
import {Dropdown} from "primereact/components/dropdown/Dropdown";
import AdminNavigation from "./Navigation/AdminNavigation";
import {Button} from "primereact/components/button/Button";
import Notification from "./Notification";

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
        formData.set('length', this.props.length);
        formData.set('width', this.state.width);
        formData.set('startDate', this.state.date);
        formData.set('locationName', this.state.location);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/create_game',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    game: res.data
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    render() {

        let today = new Date();
        let month = today.getMonth();
        let nextMonth = (month === 11) ? 0 : month + 1;

        let maxDate = new Date();
        maxDate.setMonth(nextMonth);

        return(
            <div>
                <AdminNavigation/>
                <h2>Параметры игры:</h2>
                <p>Тип игры:</p>
                <Dropdown value={this.state.type} options={gameType} onChange={this.handleChange('type')} placeholder="Выберите тип игры"/>
                <p>Тип локации:</p>
                <Dropdown value={this.state.location} options={locationType} onChange={this.handleChange('location')} placeholder="Выберите локацию"/>
                <p>Ширина:</p>
                <Spinner min={0} max={10000} value={this.state.length} onChange={this.handleChange('length')}/>
                <p>Высота:</p>
                <Spinner min={0} max={10000} value={this.state.width} onChange={this.handleChange('width')}/>
                <p>Дата начала:</p>
                <Calendar  inline={true} dateFormat="dd/mm/yy" minDate={today} maxDate={maxDate} value={this.state.date} onChange={this.handleChange('date')}/>

                <p><Button label="Создать игру" onClick={this.createGame}/></p>
                <Notification/>
            </div>
        );
    }
}

const gameType = [
    {label: 'Обычная', value: 'true'},
    {label: 'Квартальная бойня', value: 'false'}
];

const locationType = [
    {label: 'Лес', value: 'Лес'},
    {label: 'Снежная', value: 'Снежная'},
    {label: 'Тропический лес', value: 'Тропический лес'},
    {label: 'Водная', value: 'Водная'},
    {label: 'Тайга', value: 'Тайга'}
];

export default CreateGame;