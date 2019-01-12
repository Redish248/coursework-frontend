import React, { Component } from "react";
import UserNavigation from "./Navigation/UserNavigation";
import * as axios from "axios";

import "../styles/GameHistory.css";

class GameHistory extends Component {
constructor(props) {
    super(props);
    this.state = {
        games: []
    }
}

    getGames = () => {
    let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/games_history',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    games: res.data
                });
                this.createGamesTable();
            }
        ).catch(function (error) {
            console.log(error)
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };
    render() {
        return(
            <div>
                <UserNavigation/>
                <div id="gamesTable"/>
            </div>
        );
    }

    componentDidMount() {
        this.getGames();
    }

    createGamesTable = () => {
        document.getElementById("gamesTable").innerText = "";
        this.state.games.forEach(function(element) {
            let dateB = new Date(element.startDate);
            let date = dateB.getDate() + '-' + (dateB.getMonth()+ 1) + '-' +  dateB.getFullYear();
            let type;
            if (element.typeOfGame) {
                type = "Обычная";
            } else {
                type = "Квартальная бойня";
            }
            document.getElementById("gamesTable").innerHTML +=
                '<div class="game"> ' +
                '<p class="head">Игра '+ element.gameId +'</p> ' +
                '<table> ' +
                '<tbody>' +
                '<tr><td>' +
                '<table><tr>' +
                    '<tr><td class="head">Тип:</td><td>'+type+'</td></tr>' +
                    '<tr><td class="head">Арена:</td><td>'+element.arena.mainLocation.name+'</td></tr>' +
                    '<tr><td class="head">Дата:</td><td>'+date+'</td></tr>' +
                    '<tr><td class="head">Длительность:</td><td>'+element.duration+' дней</td></tr>' +
                    '<tr><td class="head">Распорядитель:</td><td>'+element.steward.nick+'</td></tr>' +
                '</table>' +
                '</td><td>тут картинка будет</td></tr>' +
                '</tbody>' +
                '</table> ' +
                '</div><br/><br/>'
        })
    }
}

export default GameHistory;