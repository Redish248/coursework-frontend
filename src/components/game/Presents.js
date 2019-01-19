import React, { Component } from "react";
import * as axios from "axios/index";

class Presents extends Component {
    //TODO: web socket на получение подарка и обновление их

    constructor(props) {
        super(props);
        this.state = {
            presents: [],
            presentToDrop: []
        }
    }

    dropPresent = () => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.props.game.gameId);
        formData.set('present', this.state.presentToDrop.name);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/drop_present',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    presents: res.data
                })
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    //TODO: tooltip на тип, описание и восстановление чего и сколько
    createPresentIcons = () => {
        document.getElementById('presentTable').innerHTML = "";
        this.state.presents.forEach(function (element) {
            document.getElementById('presentTable').innerHTML +=
                "<td>" +
                "picture" +
                element.present.name +
                "</td>"
        });

    };

    render() {
        return(
            <div>
                <h3>Мои подарки</h3>
                <div id="presents" style={{height: 120, width: 320, backgroundColor: 'white', overflowX: 'scroll'}}>
                    <table>
                        <tbody>
                        <tr id="presentTable"/>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Presents;