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
            curY: 0
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


    render() {
        return(
            <div>
                Карта
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/tributesLocation"]}
                              onMessage={ this.onMessageReceive }
                              debug={ false }/>
            </div>
        );
    }
}

export default Map;