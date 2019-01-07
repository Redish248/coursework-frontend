import React, { Component } from "react";
import * as axios from "axios/index";

class VisitorGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0
        }
    }

    //TODO: доделать позже и связать с redux
    sendPresent = () => {
        let that = this;
        let formData = new FormData();
        formData.set('tributeID', this.props.tributeID);
        formData.set('presentID', this.props.presentID);
        formData.set('quantity', this.state.quantity);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/send_present',
            data: formData,
            withCredentials: true
        }).then((res) => {
               //
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
                игра для наблюдателя
            </div>
        );
    }
}

export default VisitorGame;