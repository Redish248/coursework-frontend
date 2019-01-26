import React, { Component } from "react";
import SockJsClient from 'react-stomp';
import {Growl} from 'primereact/growl';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            content: '',
            title: ''
        };
    }

    onMessageReceive = (msg) => {
        let type, severity="info", sticky = false;
        switch (msg.type) {
            case "GAMESTART": type = "Начало игры"; break;
            case "GAMEOVER": type = "Конец игры"; break;
            case "HOOK": type = "Ловушка"; break;
            case "SELECTION": type = "Жатва"; sticky = true; break;
            case "PRESENT": type = "Подарок"; break;
            case "DEADTRIBUTE": type = "Павший трибут"; break;
            case "ATTACK": type = "Нападение"; severity = "error"; sticky = true; break;
            case "SUCCESSATTACK": type = "Нападение"; severity = "success"; break;
            default : type = "Информация";
        }
        if (type==="Конец игры"){
            this.setState({
                showAttack: true,
                content: msg.content,
                title: type
            })
        } else {
            console.log(msg);
            this.growl.show({sticky: sticky, severity: severity, summary: type, detail: msg.content});
        }
    };

    onHide = (e) => {
        this.setState({
            showAttack: false
        });
        if (this.props.isGamePage){
            this.props.history.push("/home");
        }
    };

    render() {
        const footer = (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={this.onHide} />
            </div>
        );
        return (
            <div>
                <Growl style={{marginTop: 50}} ref={(el) => this.growl = el}/>
                <Dialog header={this.state.title} footer={footer} visible={this.state.show} modal={true} onHide={this.onHide}>
                    {this.state.content}
                </Dialog>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/notification","/user/queue/notification"]}
                              onMessage={ this.onMessageReceive }
                              debug={ false }/>
            </div>
        );
    }
}

export default Notification;