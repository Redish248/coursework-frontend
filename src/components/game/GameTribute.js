import React, { Component } from "react";
import TributeInfo from "./TributeInfo";
import Chat from "./Chat";
import Weapons from "./Weapons";
import Presents from "./Presents";
import Notification from "../Notification";
import * as axios from "axios/index";
import GameNavigation from "../Navigation/GameNavigation";
import Map from "./Map";

class GameTribute extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            tribute: [],
            game: [],
            weaponToAdd: [],
            user: [],
        })
    }

    getUserInfo = () => {
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/personal_page',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    user: res.data,
                    show: true
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
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

    getVisibleMap = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/get_map?tributeLocation=' + this.state.tributeLocation;
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    map: res.data
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
        this.getUserInfo();
        this.getGame();
    }

    render() {
        return(
            <div>
                <GameNavigation/>
                <h1>Режим игры</h1>
                <table>
                    <tbody>
                    <tr>
                        <td><Map nick={this.state.nick}/></td>
                        <td>
                            <table>
                                <tbody>
                                <tr><td>
                                    <p>Ваш ник: {this.state.user.nick}</p>
                                    <TributeInfo/>
                                </td></tr>
                                <tr><td >
                                   <Weapons weaponToAdd={this.state.weaponToAdd}/>
                                </td></tr>
                                <tr><td >
                                   <Presents/>
                                </td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr><td colSpan="2"><Chat user={this.state.user}/></td></tr>
                    </tbody>
                </table>
                <Notification/>
            </div>
        );
    }
}

export default GameTribute;