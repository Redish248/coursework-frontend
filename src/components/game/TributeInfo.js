import React, { Component } from "react";
import {ProgressBar} from "primereact/components/progressbar/ProgressBar";

class TributeInfo extends Component {

    //TODO: web socket и сюда данные передавать надо
    constructor(props) {
        super(props);
        this.state = {
            health: 100,
            hunger: 100,
            thirst: 100
        }
    }

    render() {
        return(
            <table>
                <tbody>
                <tr><td>Информация о трибуте</td></tr>
                <tr><td>Здоровье:</td></tr>
                <tr><td><ProgressBar value={this.state.health}/></td></tr>
                <tr><td>Голод:</td></tr>
                <tr><td><ProgressBar value={this.state.hunger}/></td></tr>
                <tr><td>Жажда:</td></tr>
                <tr><td><ProgressBar value={this.state.thirst}/></td></tr>
                </tbody>
            </table>
        );
    }
}

export default TributeInfo;