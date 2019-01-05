import React, { Component } from "react";
import UserNavigation from "./UserNavigation";
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
                <div>
                    тут будут все игры
                </div>
            </div>
        );
    }
}

export default GameHistory;