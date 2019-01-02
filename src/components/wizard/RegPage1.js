import React, { Component } from "react";
import StepWizard from 'react-step-wizard';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default class extends Component {
    render () {
        return (
            <div>
                <h1>Введите данные:</h1>
                <StepWizard>
                    <Step1/>
                    <Step2/>
                    <Step3/>
                </StepWizard>
            </div>
        );
    }
}