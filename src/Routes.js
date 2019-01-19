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
import VisitorGame from "./components/VisitorGame";
import GameTribute from "./components/game/GameTribute";
import AdminGame from "./components/AdminGame";
import CreateGame from "./components/CreateGame";

export default () =>
    <Switch>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/signup" exact component={RegPage}/>
        <Route path="/main" component={MainPage}/>
        <Route path="/home" component={UserLK}/>
        <Route path="/game" component={GameTribute}/>
        <Route path="/adminGame" component={AdminGame}/>
        <Route path="/gamehistory" component={GameHistory}/>
        <Route path="/createGame" component={CreateGame}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/visitorGame" component={VisitorGame}/>
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
    </Switch>;