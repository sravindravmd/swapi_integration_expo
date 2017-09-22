/**
 * Created by ravindras on 19/09/17.
 */
import { SEARCH_TEXT_CLEAR, SEARCH_TEXT_CHANGE, SEARCH_RESULTS, SEARCH_IN_PROGRESS } from '../types/types';
import  * as _ from 'lodash';

const INITIAL_STATE ={ searchText:'', search_results: [], loading: false};

export default ( state = INITIAL_STATE , { type, payload }) => {

    switch (type) {

        case SEARCH_TEXT_CHANGE :
            return {...state, searchText: payload };

        case SEARCH_TEXT_CLEAR :
            return {...state, ...INITIAL_STATE };

        case SEARCH_RESULTS :

             let PayloadModified = _.map(Object.assign([], payload), (e)=> {
                e.population = _.toNumber(e.population);
                if(isNaN(e.population)){
                    e.population = 0;
                }
                return e;
             });
                 let maxDiameter  = _.maxBy(PayloadModified,'population');
                 let modified = _.map(Object.assign([], payload), (o)=>{

                     if(maxDiameter.population === o.population){
                         o.largerPlanet = true;
                         return o;
                     } else {
                         o.largerPlanet = false;
                         return o;
                     }


                 });
                return {...state, search_results: modified, loading: false };

        case SEARCH_IN_PROGRESS :

            return {...state, loading: true };

        default:
            return state;
    }
}