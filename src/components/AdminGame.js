import React, { Component } from "react";
import Notification from "./Notification";

class AdminGame extends Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {

        return(
            <div>
                а чё тут вообще
                Как у зрителя + вставка ловушек
                <Notification/>
            </div>
        );
    }
}

export default AdminGame;