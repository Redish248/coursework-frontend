import React, { Component } from "react";
import * as axios from "axios/index";

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            training: [],
            percent: 0,
            skill: []
        }
    }


    //TODO: дописать связь с redux и повышение скилла
    improveSkill = () => {
        let that = this;
        let formData = new FormData();
        formData.set('name', this.state.training.name);
        formData.set('percent', this.state.percent.toString());
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/improveSkill',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    skill: res.data
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
                тренировка тут будет
            </div>
        );
    }
}

export default Training;