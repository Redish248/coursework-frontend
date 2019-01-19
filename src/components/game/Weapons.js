import React, { Component } from "react";
import * as axios from "axios/index";

class Weapons extends Component {
    //FIXME: тут связь между weapon и weaponInGame плохо прописана
    //TODO: а отдельно ли это от игры?
    constructor(props) {
        super(props);
        this.state = {
            weapons: [],
            weaponToDrop: []
        }
    }

    dropWeapon = () => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.props.game.gameId);
        formData.set('weapon', this.state.weaponToDrop.name);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/drop_weapon',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    weapons: res.data
                })
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    addWeapon = () => {
        let that = this;
        let formData = new FormData();
        formData.set('game', this.props.game.gameId);
        formData.set('weapon', this.props.weaponToAdd.name);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/add_weapon',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    weapons: res.data
                })
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    //TODO: tooltip на радиус действия, тип и урон
    createWeaponIcons = () => {
        document.getElementById('weaponTable').innerHTML = "";
        this.state.weapons.forEach(function(element) {
            document.getElementById('weaponTable').innerHTML +=
                "<td>" +
                "<img src={} >" +
                element.weapon.name +
                "</td>"

        });
    };

    render() {
        return(
           <div>
               <h3>Моё оружие</h3>
               <table>
                   <tbody>
                   <tr id="weaponTable"/>
                   </tbody>
               </table>
           </div>
        );
    }
}

export default Weapons;