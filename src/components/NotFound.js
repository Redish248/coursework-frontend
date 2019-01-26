import React, { Component} from 'react';
import "../styles/NotFound.css"
import {Button} from "primereact/components/button/Button";

 class NotFound extends Component{


    handlePrevPage = () => {
        if (window.sessionStorage.getItem('auth') === 'true') {
            this.props.history.push('/home');
        } else {
            this.props.history.push('/');
        }
    };
    render() {
        return (
            <div className="NotFound">
                <h2>Такой страницы не существует</h2>
                <h2>Возможно, сервер не отвечает</h2>
                <iframe src="https://giphy.com/embed/XgDozI2ewprHO" width="300" height="300" frameBorder="1" class="giphy-embed" allowFullScreen></iframe><p>
                <a href="https://giphy.com/gifs/pusheen-XgDozI2ewprHO"></a></p>
                <Button label="На главную" onClick={this.handlePrevPage}/>

            </div>
        );
    }
}

export default NotFound;





        
