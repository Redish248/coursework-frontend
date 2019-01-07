import React, { Component } from "react";
import * as axios from "axios/index";

class CreateGameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: [] ,
            typeOfGame: '',
            numberOfTributes: 24,
            startDate: ''
        }
    }

    //TODO: всё через store передавать
    createGame = () => {
        let that = this;
        let formData = new FormData();
        formData.set('typeOfGame', this.state.typeOfGame);
        formData.set('arenaID', this.props.arenaID);
        formData.set('numberOfTributes', this.state.numberOfTributes.toString());
        formData.set('startDate', this.state.startDate);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/create_game',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    game: res.data
                });
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    render() {
        return (
            <div>
                форма для создания игры
            </div>
        );
    }
}

export default CreateGameForm;