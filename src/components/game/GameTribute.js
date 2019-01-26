import React, {Component} from "react";
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

    componentDidMount() {
        this.getUserInfo();
        this.getGame();
    }

    render() {
        return (
            <div>
                <GameNavigation/>
                <div id="gameTribute">
                    <table className="gameMain">
                        <tbody>
                        <tr>
                            <td colSpan="2" align="left">
                                <h2>Режим игры</h2>
                                <TributeInfo/>
                            </td>
                        </tr>
                        <tr>
                            <td><Map nick={this.state.nick} status="tribute"/></td>
                            <td valign="top" align="left">
                                <p>Вы: {this.state.user.nick}</p>
                                <Weapons weaponToAdd={this.state.weaponToAdd}/>
                                <Presents/>
                                <br/>
                                <Chat user={this.state.user}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <Notification isGamePage={true} history={this.props.history}/>
                </div>
            </div>
        );
    }
}

export default GameTribute;