import React, { Component } from "react";
import * as axios from "axios";
import SockJsClient from "react-stomp";
import PointImg from "../../images/user.png";
import WeaponImg from "../../images/weapon.png"
import TributeImg from "../../images/tribute.png";
import Here from "../../images/here.png";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

import "../../styles/GameTribute.css"

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            map: [],
            weapons: [],
            tributes: [],
            curX: 4,
            curY: 4,
            nick: '',
            picture: '',
            defending: '',
            show: false
        }

    }

    tributeInfo(){
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/tribute',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    nick: res.data.user.nick,
                    curX: res.data.locationX,
                    curY: res.data.locationY,
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    move(curX, curY) {
        let that = this;
        let formData = new FormData();
        formData.set('nick', '');
        formData.set('x', curX);
        formData.set('y', curY);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/move',
            data: formData,
            withCredentials: true
        }).then((res) => {
                //ok
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    onMessageReceive = (msg) => {
        this.updateTributeLoc(msg);
        this.moveCanvas(this.state.curX, this.state.curY, false)

    };

    updateTributeLoc = (msg) => {
        let index = -1;
        if (msg.nick!==this.state.nick) {
            for (let i = 0; i < this.state.tributes.length; i++) {
                if (this.state.tributes[i].nick === msg.nick) {
                    index = i;
                }
            }
            let newState = this.state.tributes;
            if (index === -1) {
                this.setState(prevState => ({
                    tributes: [...prevState.tributes, msg]
                }));
                newState[newState.length] = msg;
            } else {
                newState[index] = msg;
                this.setState({
                    tributes: newState
                });
            }
        }
    };

    addWeaponLoc = (msg) => {
        let index = -1;
        if (msg.nick!==this.state.nick) {
            for (let i = 0; i < this.state.weapons.length; i++) {
                if (this.state.weapons[i].nick === msg.nick) {
                    index = i;
                }
            }
            let newState = this.state.weapons;
            if (index === -1) {
                this.setState(prevState => ({
                    weapons: [...prevState.weapons, msg]
                }));
                newState[newState.length] = msg;
            } else {
                newState[index] = msg;
                this.setState({
                    weapons: newState
                });
            }
        }
    };


    onMessageWeaponDelReceive = (msg) => {
        this.updateWeaponLoc(msg);
        this.moveCanvas(this.state.curX, this.state.curY, false)
    };

    onMessageWeaponAddReceive = (msg) => {
        this.addWeaponLoc(msg);
        this.moveCanvas(this.state.curX, this.state.curY, false)
    };

    updateWeaponLoc = (msg) => {
        let index = 0;
        let newState = [];
        for (let i = 0; i < this.state.weapons.length; i++) {
            if (this.state.weapons[i].nick !== msg.nick) {
                newState[index] = this.state.weapons[i];
                index++;
            }
        }
        this.setState({
            weapons: newState
        });
    };


    onClickCanvas = (e) => {
        let x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY;
        let curX = this.state.curX, curY = this.state.curY;
        if (x > 200 && x < 300 && y > 300 && y < 400 && this.state.curX > 4) {
            curX = this.state.curX - 1;
        }
        if (x > 400 && x < 500 && y > 300 && y < 400 && this.state.curX < Math.sqrt(this.state.map.length) - 3) {
            curX = this.state.curX + 1
        }
        if (x > 300 && x < 400 && y > 200 && y < 300 && this.state.curY > 4) {
            curY = this.state.curY - 1
        }
        if (x > 300 && x < 400 && y > 400 && y < 500 && this.state.curY < Math.sqrt(this.state.map.length) - 3) {
            curY = this.state.curY + 1
        }
        this.isTributesInCell(curX, curY);
    };

    isTributesInCell(curX, curY){
        let rival, foundFlag = false;
        this.state.tributes.forEach(function (tribute) {
            if (tribute.x===curX && tribute.y===curY){
                foundFlag = true;
                rival = tribute.nick;
            }
        });
        if (foundFlag){
            this.setState({
                show: true,
                defending: rival
            });
        } else {
            this.setState({
                curX: curX,
                curY: curY
            });
            this.moveCanvas(curX, curY, true);
        }
    }

    getMap = () => {
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/game_start_pack',
            withCredentials: true
        }).then((res) => {
            this.setState({
                map: res.data.area,
                locations: res.data.location,
            });
            res.data.tributes.forEach(function (item) {
                that.updateTributeLoc(item);
            });
            res.data.weapons.forEach(function (item) {
                that.addWeaponLoc(item);
            });

                this.moveCanvas(this.state.curX, this.state.curY, true);
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    drawWeapon(curX, curY, weapons){
        let imgSize = 100;
        let xStart = 4, yStart = 4;
        const canvas = this.refs.map;
        const ctx = canvas.getContext("2d");
        weapons.forEach(function (element) {
            let img = new Image();
            let x = element.x * imgSize;
            let y = element.y * imgSize;
            img.onload = function () {
                ctx.drawImage(img, x - (curX - xStart + 1) * imgSize, y - (curY - yStart + 1) * imgSize, imgSize / 2, imgSize / 2);
            };
            img.src = WeaponImg;
        });
    }


    moveCanvas = (curX, curY, changeFlag) => {
        let imgSize = 100, xStart = 4, yStart = 4;
        let st = this.state;
        let loc = this.state.locations;
        const canvas = this.refs.map;
        const ctx = canvas.getContext("2d");
        let name = this.state.nick;
        this.state.map.forEach(function (element) {
            let img = new Image();
            let x = element.xcoordinate * imgSize;
            let y = element.ycoordinate * imgSize;
            img.onload = function () {
                ctx.clearRect(x - (curX - xStart) * imgSize, y - (curY - yStart) * imgSize, imgSize, imgSize);
                ctx.drawImage(img, x - (curX - xStart) * imgSize, y - (curY - yStart) * imgSize, imgSize, imgSize);
            };
            img.src = "data:image/png;base64," + loc[element.locationId - 1].picture;
        });
        let userImg = new Image();
        userImg.onload = function () {
            ctx.drawImage(userImg, 310,310,70,70);
            ctx.fillStyle = "#FFF";
            ctx.font = "italic 15pt Arial";
            ctx.fillText(name, 315, 390);
        };
        userImg.src = this.state.picture;
        if (changeFlag && this.props.status==="tribute") {
            this.move(curX, curY);
        }
        this.state.tributes.forEach(function (tribute) {
            if (tribute.x > (curX - xStart) && tribute.x < (curX + xStart) && tribute.y > (curY - yStart) && tribute.y < (curY + yStart)) {
                let tributesImg = new Image();
                tributesImg.onload = function () {
                    ctx.drawImage(tributesImg, 310 + (tribute.x - curX) * imgSize, 310 + (tribute.y - curY) * imgSize, 70, 70);
                    ctx.fillStyle = "#FFF";
                    ctx.font = "italic 14pt Arial";
                    ctx.fillText(tribute.nick,  310 + (tribute.x - curX) * imgSize, 390 + (tribute.y - curY) * imgSize);
                };
                tributesImg.src = TributeImg;
            }
        });
        this.drawWeapon(curX, curY, this.state.weapons);
    };


    beat = (defender) => {
        let that = this;
        let formData = new FormData();
        formData.set('tribute', defender);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/beat',
            data: formData,
            withCredentials: true
        }).then((res) => {
                console.log('attack')
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    componentDidMount() {
        if (this.props.status==="tribute") {
            this.setState({
                picture: PointImg
            });
            this.tributeInfo();
        } else {
            this.setState({
                picture: Here
            });
        }
        this.getMap();
    }

    onAgree = (e) => {
        this.onHide(e);
        this.beat(this.state.defending);
    };

    onHide = (e) => {
        this.setState({
            show: false
        });
    };

    render() {
        const footer = (
            <div>
                <Button label="Да" icon="pi pi-check" onClick={this.onAgree} />
                <Button label="Нет" icon="pi pi-times" onClick={this.onHide} />
            </div>
        );
        return (
            <div>
                <canvas id="maps" ref="map" width={700} height={700} onClick={this.onClickCanvas}/>
                <Dialog header="Атака" footer={footer} visible={this.state.show} modal={true} onHide={this.onHide}>
                    Напасть на {this.state.defending}?
                </Dialog>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/tributesLocation"]}
                              onMessage={this.onMessageReceive}
                              debug={false}/>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/weaponsDelLocation"]}
                              onMessage={this.onMessageWeaponDelReceive}
                              debug={false}/>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/weaponsAddLocation"]}
                              onMessage={this.onMessageWeaponAddReceive}
                              debug={false}/>
            </div>
        );
    }
}

export default Map;