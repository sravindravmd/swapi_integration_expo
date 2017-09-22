/**
 * Created by ravindras on 18/09/17.
 */

import { USER_NAME_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_PROGRESS } from '../types/types';

const INITIAL_STATE = {username: '', password: '', loading: false, user: null, error: ''};

export default (state = INITIAL_STATE,  {type, payload}) => {

    console.log('Type', type);

    switch (type) {

        case USER_NAME_CHANGED :
            return {...state, username: payload };

        case PASSWORD_CHANGED :
            return {...state, password: payload};

        case LOGIN_USER_SUCCESS :
            return {...state,...INITIAL_STATE, user: payload };

        case LOGIN_USER_FAIL :
            return {...state, error: payload, loading: false };

        case LOGIN_USER_PROGRESS :
            return { ...state, loading: payload };

        default:
            return state;
    }
}