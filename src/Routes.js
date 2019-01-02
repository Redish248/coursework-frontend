import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import RegPage1 from "./components/wizard/RegPage1";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import MainPage from "./components/MainPage";
import UserLK from "./components/UserLK";
import GameHistory from "./components/GameHistory";
import Shop from "./components/Shop";

export default () =>
    <Switch>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/signup" exact component={RegPage1}/>
        <Route path="/main" component={MainPage}/>
        <Route path="/home" component={UserLK}/>
        <Route path="/gamehistory" component={GameHistory}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
    </Switch>;