import React, { Component } from "react";
import Notification from "../Notification";
import GameNavigation from "../Navigation/GameNavigation";
import * as axios from "axios/index";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import Map from "../game/Map";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";

class AdminGame extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            game: [],
            x: 0,
            y: 0,
            hookName: '',
            tributes: []
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    getGame = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/game/games_by_date?date=' + new Date().getTime();
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    game: res.data[0],
                });
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    createHook() {
        let that = this;
        let formData = new FormData();
        formData.set('gameId', this.state.game.gameId);
        formData.set('x', this.state.x);
        formData.set('y', this.state.y);
        formData.set('hookName', this.state.hookName);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/createHook',
            data: formData,
            withCredentials: true
        }).then((res) => {
                console.log(res.data)
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    getTributes = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/game/get_tributes_of_game';
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    tributes: res.data,
                });
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    componentDidMount() {
        this.getGame();
        this.getTributes();
    }

    //TODO: для ловушек надо кликать на карту, будет вылезать окно, там список ловушек. Выбираешь - она устанавливется
    render() {
        return(
            <div>
                <GameNavigation/>
                <h2>Режим игры:</h2>
                <table id="gameAdmin">
                    <tbody>
                    <tr>
                        <td><Map status="admin"/></td>
                        <td>
                            <h4>Создать ловушку:</h4>
                            <p>Название:</p>
                            <p><InputText value={this.state.hookName} onChange={this.handleChange('hookName')}/></p>
                            <p>Координата X:</p>
                            <p><InputText value={this.state.x} onChange={this.handleChange('x')}/></p>
                            <p>Координата Y:</p>
                            <p><InputText value={this.state.y} onChange={this.handleChange('y')}/></p>
                            <Button label="Создать" onCLick={this.createHook}/>
                            <br/><br/>
                            <div id="resultTributes" style={{width: 200, height: 250, overflowY: 'scroll', backgroundColor: 'white'}}>
                                <p>Список трибутов:</p>
                                <center>
                                    <DataTable id="tributeTable" value={this.state.tributes}>
                                        <Column field="user.nick" header="Имя"/>
                                    </DataTable>
                                </center>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Notification isGamePage={true} history={this.props.history}/>
            </div>
        );
    }
}

export default AdminGame;