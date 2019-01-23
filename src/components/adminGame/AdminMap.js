import React, { Component } from "react";
import * as axios from "axios";
import SockJsClient from "react-stomp";
import HereImg from "../../images/here.png"

class AdminMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            map: [],
            weapons: [],
            tributes: [],
            curX: 4,
            curY: 4,
            direction: ''
        }

    }

    move() {
        let that = this;
        let formData = new FormData();
        formData.set('nick', this.props.nick);
        formData.set('x', this.state.curX);
        formData.set('y', this.state.curY);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/get_map',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    weapons: res.data
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    onMessageReceive = (msg) => {
        let r = 3;
        let newTributes = [];
        this.state.tributes.forEach(function (item) {
            if (item.nick !== msg.nick) {
                newTributes[newTributes.length - 1] = item;
            }
        });
        if (msg.x >= (this.state.curX - r) && msg.x <= (this.state.curX + r) && msg.y >= (this.state.curY - r) && msg.y <= (this.state.curY + r)) {
            this.setState(prevState => ({
                tributes: [...prevState.messages, msg]
            }));
        }
    };

    onClickCanvas = (e) => {
        let x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY;
        if (x > 200 && x < 300 && y > 300 && y < 400 && this.state.curX > 4) {
            this.setState({
                curX: this.state.curX - 1
            });
            this.moveCanvas(this.state.curX - 1, this.state.curY);
        }
        if (x > 400 && x < 500 && y > 300 && y < 400 && this.state.curX < Math.sqrt(this.state.map.length) - 3) {
            this.setState({
                curX: this.state.curX + 1
            });
            this.moveCanvas(this.state.curX + 1, this.state.curY);
        }
        if (x > 300 && x < 400 && y > 200 && y < 300 && this.state.curY > 4) {
            this.setState({
                curY: this.state.curY - 1
            });
            this.moveCanvas(this.state.curX, this.state.curY - 1);
        }
        if (x > 300 && x < 400 && y > 400 && y < 500 && this.state.curY < Math.sqrt(this.state.map.length) - 3) {
            this.setState({
                curY: this.state.curY + 1
            });
            this.moveCanvas(this.state.curX, this.state.curY + 1);
        }
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
                    locations: res.data.location
                });

                this.moveCanvas(this.state.curX, this.state.curY);
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    moveCanvas = (curX, curY) => {
        let imgSize = 100;
        let xStart = 4, yStart = 4;
        let loc = this.state.locations;
        const canvas = this.refs.map;
        const ctx = canvas.getContext("2d");
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
        };
        userImg.src = HereImg;

    };

    componentDidMount() {
        this.getMap();
    }


    render() {
        return (
            <div>
                <canvas ref="map" width={700} height={700} onClick={this.onClickCanvas}/>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/tributesLocation"]}
                              onMessage={this.onMessageReceive}
                              debug={false}/>
            </div>
        );
    }
}

export default AdminMap;