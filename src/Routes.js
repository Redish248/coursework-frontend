import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import RegPage from "./components/wizard/RegPage";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import MainPage from "./components/MainPage";
import UserLK from "./components/UserLK";
import GameHistory from "./components/GameHistory";
import Shop from "./components/Shop";
import VisitorGame from "./VisitorGame";
import GameCalendar from "./components/GameCalendar";
import Chat from "./components/Chat";

export default () =>
    <Switch>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/signup" exact component={RegPage}/>
        <Route path="/main" component={MainPage}/>
        <Route path="/home" component={UserLK}/>
        <Route path="/gamehistory" component={GameHistory}/>
        <Route path="/calendar" component={GameCalendar}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/visitorgame" component={VisitorGame}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
    </Switch>;