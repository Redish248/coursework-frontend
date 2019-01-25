import React, {Component} from "react";
import {ProgressBar} from "primereact/components/progressbar/ProgressBar";
import SockJsClient from "react-stomp";
import * as axios from "axios";

class TributeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            health: 100,
            hunger: 100,
            thirst: 100
        }
    }

    onMessageReceive = (msg) => {

        this.setState({
            health: msg.health,
            hunger: msg.hunger,
            thirst: msg.thirst
        });
    };

    tributeHealth() {
        let that = this;
        axios({
            method: 'get',
            url: 'http://localhost:8080/hungergames/game/health',
            withCredentials: true
        }).then((res) => {
                this.setState({
                    health: res.data.health,
                    hunger: res.data.hunger,
                    thirst: res.data.thirst
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    }

    componentDidMount() {
        this.tributeHealth();
    }


    render() {
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <table>
                                <tbody>
                                <tr>
                                    <td>Здоровье:</td>
                                    <td><ProgressBar value={this.state.health}/></td>
                                    <td>Голод:</td>
                                    <td><ProgressBar value={this.state.hunger}/></td>
                                    <td>Жажда:</td>
                                    <td><ProgressBar value={this.state.thirst}/></td>
                                </tr>
                                </tbody></table>
                        </td>

                    </tr>
                    </tbody>
                </table>
                <SockJsClient url='http://localhost:8080/ws' topics={["/user/queue/health"]}
                              onMessage={this.onMessageReceive}
                              debug={false}/>
            </div>
        );
    }
}

export default TributeInfo;