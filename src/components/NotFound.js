import React, { Component} from 'react';
import "../styles/NotFound.css"
import {Button} from "primereact/components/button/Button";

 class NotFound extends Component{


    handlePrevPage = () => {
        this.props.history.push('/');
    };
    render() {
        return (
            <div className="NotFound">
                <h2>Такой страницы не существует</h2>
                <h2>Возможно, сервер не отвечает</h2>
                <Button label="На главную" onClick={this.handlePrevPage}/>

            </div>
        );
    }
}

export default NotFound;





        
