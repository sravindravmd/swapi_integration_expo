/**
 * Created by ravindras on 18/09/17.
 */

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from '../components/login/LoginForm';
import Search from '../components/search/Search';
import { connect } from 'react-redux';
const Scenes = Actions.create(
    <Scene key="root">
        <Scene key="login" component={LoginForm} title="Login" />
        <Scene key="search" component={Search} title="Search" />
    </Scene>
);

const ConnectedRouter = connect()(Router);

const RouterComponent = () => {
    return (
       <ConnectedRouter scenes={Scenes} />
    );
};

export  default RouterComponent;