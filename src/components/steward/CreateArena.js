import React, { Component } from "react";
import * as axios from "axios/index";

class CreateArena extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arena: [] ,
            length: 200,
            width: 200,
            locationName: ''
        }
    }

    //TODO: через store передавать
    createGame = () => {
        let that = this;
        let formData = new FormData();
        formData.set('length', this.state.length.toString());
        formData.set('width', this.state.width.toString());
        formData.set('locationName', this.state.locationName);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/create_arena',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    arena: res.data
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
                форма для создания арены
            </div>
        );
    }
}

export default CreateArena;