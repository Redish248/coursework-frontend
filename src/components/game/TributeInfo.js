import React, { Component } from "react";
import {ProgressBar} from "primereact/components/progressbar/ProgressBar";
import SockJsClient from "react-stomp";

class TributeInfo extends Component {

    //TODO: сюда данные передавать надо
    constructor(props) {
        super(props);
        this.state = {
            health: 100,
            hunger: 100,
            thirst: 100
        }
    }

    onMessageReceive = (msg) => {

        this.setState({
            health: msg.health,
            hunger: msg.hunger,
            thirst: msg.thirst
        });
    };

    render() {
        return(
            <div>
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
                <SockJsClient url='http://localhost:8080/ws' topics={["/user/queue/health"]}
                              onMessage={ this.onMessageReceive }
                              debug={ false }/>
            </div>
        );
    }
}

export default TributeInfo;