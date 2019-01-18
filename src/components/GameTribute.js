import React, { Component } from "react";
import * as axios from "axios/index";
import {ProgressBar} from "primereact/components/progressbar/ProgressBar";

class GameTribute extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            health: 100,
            hunger: 100,
            thirst: 100
        })
    }

    render() {
        return(
            <div>
                <div>Карта</div>
                <div>
                    <h3>Информация о трибуте</h3>
                    <p>Здоровье:</p>
                    <ProgressBar value={this.state.health}/>
                    <p>Голод:</p>
                    <ProgressBar value={this.state.hunger}/>
                    <p>Жажда:</p>
                    <ProgressBar value={this.state.thirst}/>
                </div>
                <div>Моё оружие</div>
                <div>Остальные вещи</div>
                <div>Чат</div>
            </div>
        );
    }
}

export default GameTribute;