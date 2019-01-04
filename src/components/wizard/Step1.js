import React, { Component } from "react";
import {InputText} from "primereact/components/inputtext/InputText";
import {Button} from "primereact/components/button/Button";
import {signUp1} from "../../actions/actions";
import {connect} from "react-redux";

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: ''
        }
    }

    clickButton = () => {
        this.props.signUp1(this.state.name, this.state.surname);
        this.props.goToStep(2);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        return(
            <div>
                <h3>Шаг {this.props.currentStep}</h3>
                <h5>Имя:</h5>
                <InputText placeholder="name" value={this.state.name} onChange={this.handleChange('name')}/>
                <h5>Фамилия:</h5>
                <InputText placeholder="surname" value={this.props.surname} onChange={this.handleChange('surname')}/>
                <p><Button onClick={this.clickButton} label="Вперёд"/></p>
            </div>
        );
    }
}

function mapStateToProps(state)  {
    return {
        name: state.name,
        surname: state.surname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp1 : (name, surname) => dispatch(signUp1(name, surname))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);