import React, { Component } from "react";
import TributeInfo from "./TributeInfo";
import Chat from "./Chat";
import Weapons from "./Weapons";
import Presents from "./Presents";
import Notification from "../Notification";
import * as axios from "axios/index";
import GameNavigation from "../Navigation/GameNavigation";

class GameTribute extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            tribute: [],
            game: [],
            weaponToAdd: [],
            tributeLocation: [],
            map: [],
            user: [],
        })
    }

    createMap = () => {
        this.state.trainings.forEach((element) => {

        })
    };

    addOnePart = () => {

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
                        <td><canvas ref="map" width={700} height={600} /></td>
                        <td>
                            <table>
                                <tbody>
                                <tr><td>
                                    <TributeInfo/>

                                </td></tr>
                                <tr><td id="weapons">
                                   <Weapons weaponToAdd={this.state.weaponToAdd}/>
                                </td></tr>
                                <tr><td id="presents">
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