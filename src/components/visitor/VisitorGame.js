import React, { Component } from "react";
import * as axios from "axios/index";
import {Button} from "primereact/components/button/Button";
import {Modal} from "react-bootstrap";
import Shop from "../Shop";
import Notification from "../Notification";
import GameNavigation from "../Navigation/GameNavigation";
import MapVisitor from "./MapVisitor";

class VisitorGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
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
        let url = 'http://localhost:8080/hungergames/game/tribute_info?nick=' + this.state.nick;
        axios({
            method: 'get',
            url: url,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    tribute: res.data,
                    show: true
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
                        <td><MapVisitor/></td>
                        <td>
                            <h3>Отправить подарок трибуту:</h3>
                            <br/>
                            <Button label="Перейти в магазин" onClick={() => {this.setState({show: true})}}/>
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