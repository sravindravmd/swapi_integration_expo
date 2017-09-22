import { combineReducers } from 'redux';
import { ActionConst} from 'react-native-router-flux';
import AuthReaducer from './AuthReducer';
import searchReducer from '../reducers/SearchReducer';

const sceneReducer = (state = {}, {type, scene}) => {
    switch(type){
        case ActionConst.FOCUS:
            return { ...state, scene };
        default:
            return state;
    }
};
export default combineReducers({
    scene: sceneReducer,
    auth: AuthReaducer,
    search: searchReducer
});