import React, { Component } from "react";
import UserNavigation from "./Navigation/TributeNavigation";
import * as axios from "axios";

import "../styles/GameHistory.css";
import Notification from "./Notification";
import {Redirect} from "react-router";

class GameHistory extends Component {
constructor(props) {
    super(props);
    this.state = {
        games: [],
        winner: []
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
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    render() {
        if (window.sessionStorage.getItem('auth') === 'true') {
            return (
                <div>
                    <UserNavigation/>
                    <div id="gamesTable"/>
                    <Notification/>
                </div>
            );
        } else {
            return <Redirect to="/"/>
        }
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('auth') === 'true') {
            this.getGames();
        }
    }

    getWinner = (element) => {
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/gameWinner?gameId=' + element.gameId,
            withCredentials: true
        }).then((res) => {
            let dateB = new Date(element.startDate);
            let date = dateB.getDate() + '-' + (dateB.getMonth()+ 1) + '-' +  dateB.getFullYear();
            let type;
            if (element.typeOfGame) {
                type = "Обычная";
            } else {
                type = "Квартальная бойня";
            }
            let winner = '';
            if (res.data.user !== undefined) {
                winner = res.data.user.nick;
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
                '<tr><td class="head">Победитель:</td><td>'+ winner +'</td></tr>' +
                '</table>' +
                '</td><td><img class="gameHistImg" id="'+ element.gameId + '" src="data:image/png;base64,' + element.arena.mainLocation.picture +'" alt=""/></td></tr>' +
                '</tbody>' +
                '</table> ' +
                '</div><br/><br/>';
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    createGamesTable = () => {
        document.getElementById("gamesTable").innerText = "";
        let that = this;
        this.state.games.forEach(function(element) {
           that.getWinner(element);
        });

    }
}

export default GameHistory;
