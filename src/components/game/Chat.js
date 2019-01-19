import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello'
        };
        this.socket = new WebSocket('ws://localhost:8080');
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    emit() {
        this.setState(prevState => ({
            open: !prevState.open
        }));
        this.socket.send("It worked!")
    }

    componentDidMount() {
        this.socket.onopen = () => this.socket.send(JSON.stringify({name: 'ira', message: this.state.message}));
        this.socket.onmessage = ({data}) => console.log(data);
    }

    render() {
        return(
            <div>
                <h3>Чат:</h3>
                <div id="msg" style={{height: 200, width: 1000, backgroundColor: 'white', overflowY: 'scroll'}}/>
                <p><InputText value={this.state.message} onChange={this.handleChange('message')}/></p>

                <Button label="Отправить" onClick={this.emit} />
            </div>
        );
    }
}

export default Chat;