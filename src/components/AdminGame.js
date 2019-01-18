import React, { Component } from "react";

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
            </div>
        );
    }
}

export default AdminGame;