import React, { Component } from "react";
import SockJsClient from 'react-stomp';
import { TalkBox } from "react-talk";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientConnected: false,
            messages: []
        };
    }

    onMessageReceive = (msg) => {
        let message = {
            authorId: msg.sender,
            author: msg.sender,
            message: msg.content,
            timestamp: msg.time
        };
        this.setState(prevState => ({
            messages: [...prevState.messages, message]
        }));
    };

    sendMessage = (msg) => {
        //"sender" must be name of user
        try {
            let usrMsg = {
                content: msg,
                sender: "anon",
                time: new Date().getTime()
            };
            this.clientRef.sendMessage("/app/hungergames/chat", JSON.stringify(usrMsg));
            return true;
        } catch(e) {
            return false;
        }
    };

    render() {
        return (
            <div>
                {/*тут в штуках с user тоже надо вставить ник*/}
                <TalkBox topic="Чат" currentUserId='anon'
                         currentUser='anon' messages={ this.state.messages }
                         onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>


                <SockJsClient url='http://localhost:8080/ws' topics={["/topic/chat"]}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                              debug={ false }/>
            </div>
        );
    }
}

export default Chat;