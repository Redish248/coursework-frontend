import React, { Component } from "react";
import * as axios from "axios";
import SockJsClient from "react-stomp";
import PointImg from "../../images/user.png";
import WeaponImg from "../../images/weapon.png"
import TributeImg from "../../images/tribute.png";

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
            direction: '',
            nick: '',
            gameId: 0
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
                    gameId: res.data.gameId
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


    onMessageWeaponReceive = (msg) => {
        this.updateWeaponLoc(msg);
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
            this.setState({
                curX: this.state.curX - 1
            });
            curX = this.state.curX - 1;
        }
        if (x > 400 && x < 500 && y > 300 && y < 400 && this.state.curX < Math.sqrt(this.state.map.length) - 3) {
            this.setState({
                curX: this.state.curX + 1
            });
            curX = this.state.curX + 1
        }
        if (x > 300 && x < 400 && y > 200 && y < 300 && this.state.curY > 4) {
            this.setState({
                curY: this.state.curY - 1
            });
            curY = this.state.curY - 1
        }
        if (x > 300 && x < 400 && y > 400 && y < 500 && this.state.curY < Math.sqrt(this.state.map.length) - 3) {
            this.setState({
                curY: this.state.curY + 1
            });
            curY = this.state.curY + 1
        }
        this.moveCanvas(curX, curY, true);
    };

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
            console.log(x + " " + y);
            img.onload = function () {
                ctx.drawImage(img, x - (curX - xStart + 1) * imgSize, y - (curY - yStart + 1) * imgSize, imgSize / 2, imgSize / 2);
            };
            img.src = WeaponImg;
        });
    }


    moveCanvas = (curX, curY, changeFlag) => {
        let imgSize = 100;
        let xStart = 4, yStart = 4;
        let loc = this.state.locations;
        const canvas = this.refs.map;
        const ctx = canvas.getContext("2d");
        let name = this.state.nick;
        this.state.map.forEach(function (element) {
            let img = new Image();
            let x = element.xcoordinate * imgSize;
            let y = element.ycoordinate * imgSize;
            img.onload = function () {
                ctx.drawImage(img, x - (curX - xStart) * imgSize, y - (curY - yStart) * imgSize, imgSize, imgSize);
            };
            img.src = "data:image/png;base64," + loc[element.locationId - 1].picture;
        });
        let userImg = new Image();
        userImg.onload = function () {
            ctx.drawImage(userImg, 330,330,40,40);
            ctx.fillStyle = "#FFF";
            ctx.font = "italic 15pt Arial";
            ctx.fillText(name, 315, 390);
        };
        userImg.src = PointImg;
        if (changeFlag) {
            this.move(curX, curY);
        }
        this.state.tributes.forEach(function (tribute) {
            if (tribute.x > (curX - xStart) && tribute.x < (curX + xStart) && tribute.y > (curY - yStart) && tribute.y < (curY + yStart)) {
                let tributesImg = new Image();
                tributesImg.onload = function () {
                    ctx.drawImage(tributesImg, 330 + (tribute.x - curX) * imgSize, 330 + (tribute.y - curY) * imgSize, 40, 40);
                };
                tributesImg.src = TributeImg;
            }
        });
        this.drawWeapon(curX, curY, this.state.weapons);
    };


    componentDidMount() {
        this.tributeInfo();
        this.getMap();
    }


    render() {
        return (
            <div>
                <canvas ref="map" width={700} height={700} onClick={this.onClickCanvas}/>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/tributesLocation"]}
                              onMessage={this.onMessageReceive}
                              debug={false}/>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/weaponsLocation"]}
                              onMessage={this.onMessageWeaponReceive}
                              debug={false}/>
            </div>
        );
    }
}

export default Map;