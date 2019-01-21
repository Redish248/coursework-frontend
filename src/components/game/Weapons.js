import React, { Component } from "react";
import * as axios from "axios/index";
import "../../styles/WeaponsAndPresents.css";

class Weapons extends Component {
    //FIXME: тут связь между weapon и weaponInGame плохо прописана
    //TODO: а отдельно ли это от игры?
    //FIXME: проверить названия полей таблиц у оружия и подарков
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

    createWeaponIcons = () => {
        document.getElementById('weaponTable').innerHTML = "";
        this.state.weapons.forEach(function(element) {
            document.getElementById('weaponTable').innerHTML +=
                "<td>" +
                "<img src={} >" +
                '<div class="tooltip1">' + element.weapon.name +'<span class="tooltiptext1">' +
                'Радиус действия: ' + element.radiusOfAction +
                'Тип: ' + element.typeOfWeapon +
                'Урон: ' + element.damage +
                '</span></div>' +
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