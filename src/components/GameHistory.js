import React, { Component } from "react";
import UserNavigation from "./Navigation/UserNavigation";
import * as axios from "axios";

class GameHistory extends Component {
constructor(props) {
    super(props);
    this.state = {
        games: []
    }
}

    getGames = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/coursework/getgames',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    games: res.data
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                this.props.history.push('/ss');
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

    createGamesTable = () => {
        document.getElementById("gamesTable").innerText = "";
        this.state.games.forEach(function(element) {
            document.getElementById("gamesTable").innerHTML +=
                '<div> ' +
                '<table> ' +
                '<thead>Игра'+ element.id +'</thead> ' +
                '<tbody>' +
                '<tr><td>' +
                '<table><tr><td>Арена:</td><td>'+element.arena.name+'</td></tr>' +
                '<tr><td>Победитель:</td><td>'+element.tribute.user.name+'</td></tr>' +
                '<tr><td>Дата:</td><td>'+element.startDate+'</td></tr>' +
                '<tr><td>Длительность:</td><td>'+element.duration+'</td></tr>' +
                '<tr><td>Тип:</td><td>'+element.type+'</td></tr></table>' +
                '</td><td>тут картинка будет</td></tr>' +
                '</tbody>' +
                '</table> ' +
                '</div>'
        })
    }
}

export default GameHistory;