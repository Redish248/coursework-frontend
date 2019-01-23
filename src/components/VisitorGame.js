import React, { Component } from "react";
import * as axios from "axios/index";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import UserNavigation from "./Navigation/TributeNavigation";
import {Modal} from "react-bootstrap";
import Shop from "./Shop";
import Notification from "./Notification";
import GameNavigation from "./Navigation/GameNavigation";

class VisitorGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            tribute: [],
            nick: '',
            show: false,
            game: []
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
                    game: res.data[0],
                });
            }
        ).catch(function (error) {
            console.log(error);
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    getTributeInfo = () => {
        let that = this;
        let url = 'http://localhost:8080/hungergames/trainings?nick=' + this.state.nick;
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    tribute: res.data
                });
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

    handleHide = () => {
      this.setState({
          show: false
      })
    };

    componentDidMount() {
        this.getGame();
    }

    render() {
        return (
            <div>
                <GameNavigation/>

                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} container={this} aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Магазин
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <Shop tribute={this.state.tribute}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide} label="Выйти"/>
                    </Modal.Footer>
                </Modal>

                <table>
                    <tbody>
                    <tr>
                        <td><canvas ref="map" width={700} height={600} /></td>
                        <td>
                            <h3>Отправить подарок трибуту:</h3>
                            <h4>Введите имя трибута:</h4>
                            <InputText value={this.state.nick} onChange={this.handleChange('nick')}/>
                            <br/>
                            <Button label="Перейти в магазин" onClick={() => this.setState({ show: true })}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Notification/>
            </div>
        );
    }
}

export default VisitorGame;