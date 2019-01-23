import React, { Component } from "react";
import * as axios from "axios";
import SockJsClient from "react-stomp";

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            locations: [],
            map: [],
            weapons: [],
            tributes: [],
            curX: 0,
            curY: 0,
            direction: ''
        }

    }

    getLocations(){
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/locations',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    locations: res.data
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    //чую ерунда написана
    move(){
        let that = this;
        let formData = new FormData();
        formData.set('nick', this.props.nick);
        formData.set('x', this.state.curX);
        formData.set('y', this.state.curY);
        formData.set('gameId', this.props.game.gameId);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/game/get_map',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    map: res.data.area,
                    weapons: res.data.weapons
                });
                this.map.forEach(function(item){
                    item.locationId = this.locations[item.locationId-1];
                })
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    onMessageReceive = (msg) => {
        let r=4;
        //sleeeeep
    };

    onClickCanvas = (e) => {
        if (e.nativeEvent.offsetX < 350) {
            this.setState({
                direction: 'left'
            })
        }
        if (e.nativeEvent.offsetY  < 350) {
            this.setState({
                direction: 'bottom'
            })
        }
        if (e.nativeEvent.offsetX > 350) {
            this.setState({
                direction: 'right'
            })
        }
        if (e.nativeEvent.offsetY  > 350) {
            this.setState({
                direction: 'top'
            })
        }
        this.moveCanvas();
    };

    getMap = () => {
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/game_start_pack',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    map: res.data[0],
                    locations: res.data[1]
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    drawMap = () => {
        let loc = this.state.locations;
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        let x = 0;
        let y = 0;
        this.state.map.forEach(function(element) {
            let img = new Image;
            img.onload=function(){
              ctx.drawImage(img,x,y)
            };
            img.src = "data:image/png;base64," + loc[element.locationId-1];
            x = element.xCoordinate * 200;
            y = element.yCoordinate * 200;
        })
    };

    moveCanvas = () => {
        
    };


    render() {
        return(
            <div>
                <canvas ref="map" width={700} height={700} onClick={this.onClickCanvas} />
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/tributesLocation"]}
                              onMessage={ this.onMessageReceive }
                              debug={ false }/>
            </div>
        );
    }
}

export default Map;