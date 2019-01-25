import React, { Component } from "react";
import * as axios from "axios/index";
import "../../styles/WeaponsAndPresents.css";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import SockJsClient from "react-stomp";

class Weapons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weapons: [],
            weaponToDrop: [],
            game: [],
            defender: ''
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
            this.getTributeWeapons();
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    dropWeapon = () => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.state.game.gameId);
        formData.set('weapon', this.state.weaponToDrop.name);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/drop_weapon',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    weapons: res.data
                });
            this.createWeaponIcons();
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    /*addWeapon = () => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.state.game.gameId);
        formData.set('weapon', this.props.weaponToAdd.name);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/add_weapon',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    weapons: res.data
                });
            this.createWeaponIcons();
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };*/



    createWeaponIcons = () => {
        document.getElementById('weaponTable').innerHTML = "";
        this.state.weapons.forEach(function(element) {
            document.getElementById('weaponTable').innerHTML +=
                "<td>" +
                '<div class="iconDiv">' +
                "<p><img class='weaponImg' id='imgW" +element.weapon.weaponInGameId +"' src='' alt='' ></p>" +
                '<div class="tooltip1">' + element.weapon.name +'<span class="tooltiptext1">' +
                '<p>Радиус действия: ' + element.weapon.radiusOfAction +
                '</p><p>Тип: ' + element.weapon.typeOfWeapon +
                '</p><p>Урон: ' + element.weapon.damage +
                '</p></span></div>' +
                '</div>' +
                "</td>"

        });
        let that = this;
        this.state.weapons.forEach((element) => {
            document.getElementById("imgW" + element.weapon.weaponInGameId).src = "data:image/png;base64," + element.weapon.picture;
            document.getElementById("imgW" + element.weapon.weaponInGameId).onclick = () => {
                that.beat(element);
            }
        });
    };

    getTributeWeapons = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/game/get_tribute_weapons?gameId=' + this.state.game.gameId;
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    weapons: res.data
                });
                this.createWeaponIcons();
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    beat = (weapon) => {
        let that = this;
        let formData = new FormData();
        formData.set('tribute', this.state.defender);
        formData.set('weapon', weapon.weapon.name);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/beat',
            data: formData,
            withCredentials: true
        }).then((res) => {
               console.log('attacked')
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    onMessageReceive = (msg) => {
        //почему-то не работает
        /*this.takeWeapon(msg);
        this.createWeaponIcons();*/
        //поэтому опять запрос на все оружия
        this.getTributeWeapons();
    };

    takeWeapon = (msg) => {
        this.setState(prevState => ({
            weapons: [...prevState.weapons, msg]
        }));

    };

    componentDidMount() {
        this.getGame();
    }

    render() {
        return(
           <div>
               <h3>Моё оружие:</h3>
               <table>
                   <tbody>
                   <tr>
                      Ударить: &nbsp;
                       <InputText value={this.state.defender} onChange={this.handleChange('defender')} style={{width: 150}} placeholder="имя трибута"/>
                       <div id="weaponTable" style={{height: 170, width: 400, overflowX: 'scroll'}}/>
                   </tr>
                   </tbody>
               </table>
               <SockJsClient url='http://localhost:8080/ws' topics={["/user/queue/weapons"]}
                             onMessage={ this.onMessageReceive }
                             debug={ false }/>
           </div>
        );
    }
}

export default Weapons;