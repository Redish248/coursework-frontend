import React, { Component } from "react";
import Notification from "../Notification";
import GameNavigation from "../Navigation/GameNavigation";
import * as axios from "axios/index";
import Map from "../game/Map";
import {DataTable} from "primereact/components/datatable/DataTable";
import {Column} from "primereact/components/column/Column";
import {Redirect} from "react-router";

class AdminGame extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            game: [],
            x: 0,
            y: 0,
            tributes: [],
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
        if (window.sessionStorage.getItem('auth') === 'true') {
            this.getGame();
            this.getTributes();
        }
    }

    render() {
        if (window.sessionStorage.getItem('auth') === 'true') {
            if (window.sessionStorage.getItem('status') === 'Распорядитель') {

                return(
            <div>
                <GameNavigation/>
                <h2>Режим игры:</h2>
                <table id="gameAdmin">
                    <tbody>
                    <tr>
                        <td><Map status="admin"/></td>
                        <td>
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
        )

            } else {
                return <Redirect to="/home"/>
            }
        } else {
            return <Redirect to="/"/>
        }
    }
}

export default AdminGame;