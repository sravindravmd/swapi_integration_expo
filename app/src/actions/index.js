import { USER_NAME_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_PROGRESS } from '../types/types';
import service from '../services/Services';
import * as _ from 'lodash';
import { Actions, ActionConst } from 'react-native-router-flux';

export const UsernameChanged = ( text ) => {

    return {
        type: USER_NAME_CHANGED,
        payload: text
    }
};

export const passwordChanged = ( text ) => {

    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const loginUser = ({ username, password}) => {

    return ( dispatch ) => {
        dispatch({
            type: LOGIN_USER_PROGRESS,
            payload: true
        });

        if(username.length !== 0 || password.length !== 0 ) {
            service.login(username, password).then(function (data) {

                if(data.results.length === 0) {
                    loginUserFail(dispatch, 'User not available');
                } else {

                    let user =  _.find(data.results, (person) => {return _.lowerCase(_.trim(person.name)) === _.lowerCase(_.trim(username));});

                    if(!!user) {
                        console.log('Check user', user);

                        if(user.birth_year === password ) {
                            loginUserSuccess(dispatch, user );
                            Actions.search({type:ActionConst.REPLACE});
                        } else {
                            loginUserFail(dispatch, 'Invalid password');
                        }

                    } else {
                        loginUserFail(dispatch, 'User not available');
                    }
                }

            }).catch(error => {
                console.log('Error')
                loginUserFail(dispatch, 'Authentication failed');
            })
        } else {
            loginUserFail(dispatch, 'User Name and Password required');
        }



    }
};

const loginUserSuccess = (dispatch, user) => {

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
};

const loginUserFail = (dispatch, error) => {

    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error
    })
};

export * from './search';

