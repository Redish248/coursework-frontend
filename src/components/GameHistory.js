import React, { Component } from "react";
import UserNavigation from "./UserNavigation";

class GameHistory extends Component {
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