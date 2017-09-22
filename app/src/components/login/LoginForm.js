/**
 * Created by ravindras on 18/09/17.
 */

import React, { Component } from 'react';
import { Card, CardSection, Input, Button, Spinner } from '../common';
import { connect } from 'react-redux';
import { UsernameChanged, passwordChanged, loginUser } from '../../actions';
import { View, Text } from 'react-native';

class LoginForm extends Component {

    onUserNameChange(text) {
        this.props.UsernameChanged(text);
    }
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }
    onLogin() {
        const { username, password } = this.props;
        this.props.loginUser({ username, password });
    }
    render() {
        return (
           <View style={{flex:1}}>
               {this.props.loading ?( <View style={{position:'absolute', left:0, right: 0, bottom: 0, top: 0, zIndex:9999}}>
                   <Spinner/>
               </View> ) : null }

               <Card>
                   <CardSection>
                       <Input
                           label="User Name"
                           placeholder="user name"
                           onChangeText={this.onUserNameChange.bind(this)}
                           value={this.props.username}
                       />
                   </CardSection>

                   <CardSection>
                       <Input
                           secureTextEntry
                           label="Password"
                           placeholder="password"
                           onChangeText={this.onPasswordChange.bind(this)}
                           value={this.props.password}
                       />
                   </CardSection>
                   <Text style={styles.errorTextStyle}>{this.props.error}</Text>

                   <CardSection>
                       <Button title="Login" onPress={this.onLogin.bind(this)}>Login</Button>
                   </CardSection>
               </Card>
           </View>


        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }

}

const mapStateToProps =({ auth })=> {

    const { username, password, loading, error } = auth;
    return {
        username,
        password,
        loading,
        error
    }
};

export default connect(mapStateToProps, { UsernameChanged, passwordChanged, loginUser })(LoginForm);