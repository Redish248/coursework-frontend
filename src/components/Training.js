import React, { Component } from "react";
import * as axios from "axios/index";
import {ProgressBar} from "primereact/components/progressbar/ProgressBar";
import {Growl} from "primereact/components/growl/Growl";
import {Button} from "primereact/components/button/Button";

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
        }
    }

    improveSkill = (skillPercent) => {
        let that = this;
        let formData = new FormData();
        formData.set('name', this.props.train.name);
        formData.set('percent', skillPercent);
        axios({
            method: 'post',
            url: 'http://localhost:8080/hungergames/improveSkill',
            data: formData,
            withCredentials: true
        }).then((res) => {
                this.setState({
                    skill: res.data
                });
            this.props.finish();
            window.location.reload();
            }
        ).catch(function (error) {
            if (error === undefined || error.response === undefined) {
                that.props.history.push('/ss');
            }
        });
    };

    finishTrain = () => {
        this.improveSkill(this.state.percent);
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            let val = this.state.percent;
            val += 1;

            if(val >= 100) {
                val = 100;
                this.growl.show({severity: 'info', summary: 'Success', detail: 'Process Completed'});
                clearInterval(this.interval);
            }

            this.setState({
                percent: val
            });
        }, this.props.train.duration*1000);
    }

    componentWillUnmount () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    render() {
        return (
            <div>
                <p>Название тренировки: {this.props.train.name}</p>
                <p>Длительность: {this.props.train.duration} минут</p>
                <Growl ref={(el) => this.growl = el}/>
                <ProgressBar value={this.state.percent} style={{width: 500}}/>
                <Button label="Завершить" onClick={this.finishTrain} />
            </div>
        );
    }
}

export default Training;