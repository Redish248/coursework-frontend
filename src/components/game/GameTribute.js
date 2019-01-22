import React, { Component } from "react";
import TributeInfo from "./TributeInfo";
import Chat from "./Chat";
import Weapons from "./Weapons";
import Presents from "./Presents";
import Notification from "../Notification";

class GameTribute extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            tribute: [],
            game: [],
            weaponToAdd: [],

        })
    }

    render() {
        return(
            <div>
                <h1>Режим игры</h1>
                <table>
                    <tbody>
                    <tr>
                        <td>Карта</td>
                        <td>
                            <table>
                                <tbody>
                                <tr><td><TributeInfo/></td></tr>
                                <tr><td><Weapons weaponToAdd={this.state.weaponToAdd} game={this.state.game}/></td></tr>
                                <tr><td><Presents game={this.state.game}/></td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr><td colSpan="2"><Chat/></td></tr>
                    </tbody>
                </table>
                <Notification/>
            </div>
        );
    }
}

export default GameTribute;