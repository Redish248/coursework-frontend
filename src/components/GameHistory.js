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
        console.log(this.state.games)
        document.getElementById("gamesTable").innerText = "";
        this.state.games.forEach(function(element) {
            document.getElementById("gamesTable").innerHTML +=
                '<div> ' +
                '<table> ' +
                '<thead>Игра '+ element.gameId +'</thead> ' +
                '<tbody>' +
                '<tr><td>' +
                '<table><tr><td>Арена:</td><td>'+element.arena.mainLocation.name+'</td></tr>' +
                '<tr><td>Дата:</td><td>'+element.startDate+'</td></tr>' +
                '<tr><td>Длительность:</td><td>'+element.duration+'</td></tr>' +
                '<tr><td>Тип:</td><td>'+element.typeOfGame+'</td></tr></table>' +
                '</td><td>тут картинка будет</td></tr>' +
                '</tbody>' +
                '</table> ' +
                '</div>'
        })
    }
}

export default GameHistory;