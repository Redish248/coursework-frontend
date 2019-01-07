import React, { Component } from "react";
import StepWizard from 'react-step-wizard';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import NavigationHome from "../Navigation/NavigationHome";

import "../../styles/RegPage.css";

export default class extends Component {
    render () {
        return (
            <div>
                <NavigationHome/>
                <StepWizard>
                    <Step1 />
                    <Step2 />
                    <Step3 />
                </StepWizard>
            </div>
        );
    }
}