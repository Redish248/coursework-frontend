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

    getPoints = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/lab4/getgames',
            withCredentials: true
        }).then((res) => {
                res.data.forEach(function(i) {
                    i.x = Math.ceil(i.x*100)/100;
                    i.y = Math.ceil(i.y*100)/100;
                });
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