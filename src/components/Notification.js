import React, { Component } from "react";
import SockJsClient from 'react-stomp';
import {Growl} from 'primereact/growl';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onMessageReceive = (msg) => {
        let type, severity="info";
        switch (msg.type) {
            case "GAMESTART": type = "Начало игры"; break;
            case "GAMEOVER": type = "Конец игры"; break;
            case "HOOK": type = "Ловушка"; break;
            case "SELECTION": type = "Жатва"; break;
            case "PRESENT": type = "Подарок"; break;
            case "DEADTRIBUTE": type = "Павший трибут"; break;
            case "ATTACK": type = "Нападение"; severity = "error"; break;
            default : type = "Информация";
        }
        this.growl.show({sticky: true, severity: severity, summary: type, detail: msg.content});
    };

    render() {
        return (
            <div>
                {/*FIXME: first growl hidden under header*/}
                <Growl ref={(el) => this.growl = el}/>
                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/notification","/user/queue/notification"]}
                              onMessage={ this.onMessageReceive }
                              debug={ false }/>
            </div>
        );
    }
}

export default Notification;