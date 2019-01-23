import React, { Component } from "react";
import * as axios from "axios/index";
import "../../styles/WeaponsAndPresents.css";
import SockJsClient from "react-stomp";

class Presents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: [],
            presents: [],
            presentToDrop: [],
        }
    }

    getGame = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/game/games_by_date?date=' + new Date().getTime();
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    game: res.data,
                });
            this.onMessageReceive();
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    dropPresent = () => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.props.state.gameId);
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

    usePresent = (present) => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.props.state.gameId);
        formData.set('presentName', present);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/use_present',
            data: formData,
            withCredentials: true
        }).then((res) => {
            this.onMessageReceive();
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    createPresentIcons = () => {
        document.getElementById('presentTable').innerHTML = "";
        this.state.presents.forEach(function (element) {
            document.getElementById('presentTable').innerHTML +=
                "<td>" +
                "<img class='weaponImg' id='imgP" +element.sendingId +"' src='' alt='' >" +
                '<div class="tooltip1">' + element.product.name +'<span class="tooltiptext1">' +
                '<p>Тип: ' + element.product.typeOfPresent +
                '</p><p>Описание: ' + element.product.description +
                '</p><p>Восстанавливает: ' + element.product.typeOfRecovery +
                '</p><p>Коэффициент: ' + element.product.healthRecovery +
                '</p></span></div>' +
                "</td>"
        });
        this.state.presents.forEach((element) => {
            document.getElementById("imgP" + element.sendingId).src = "data:image/png;base64," + element.product.picture;

        });

    };

    //TODO: this.props.gameId in present
    onMessageReceive = (msg) => {
        console.log("Подарок прилетел))");
        let that = this;
        let url = 'http://localhost:8080/hungergames/game/get_tribute_presents?gameId=' + this.state.game.gameId;
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    presents: res.data
                });
                this.createPresentIcons();
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    componentDidMount() {
        this.getGame();
    }

    render() {
        return(
            <div>
                <h3>Мои подарки</h3>
                <div id="presents" style={{height: 170, width: 400, backgroundColor: 'white', overflowX: 'scroll'}}>
                    <table>
                        <tbody>
                        <tr id="presentTable"/>
                        </tbody>
                    </table>
                </div>
                <SockJsClient url='http://localhost:8080/ws' topics={["/user/queue/presents"]}
                              onMessage={ this.onMessageReceive }
                              debug={ false }/>
            </div>
        );
    }
}

export default Presents;