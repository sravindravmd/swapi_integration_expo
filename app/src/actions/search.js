/**
 * Created by ravindras on 19/09/17.
 */

import { SEARCH_TEXT_CHANGE, SEARCH_TEXT_CLEAR, SEARCH_RESULTS, SEARCH_IN_PROGRESS } from '../types/types';
import service from '../services/Services';

export const searchTextChanged = ( text ) => {

    return (dispatch) => {
        dispatch({
            type: SEARCH_TEXT_CHANGE,
            payload: text
        });

       if(text.length > 0){
           dispatch({
               type: SEARCH_IN_PROGRESS
           });
           service.search(text)
               .then((result) => {
                   console.log('Result of Search', result);
                   dispatch({
                       type: SEARCH_RESULTS,
                       payload: result.results
                   })

               })
               .catch(err => console.log('error', err));
       }  else {
           dispatch({
               type: SEARCH_TEXT_CLEAR
           })
       }

    }

};

export const searchTextClear = () => {
    return {
        type: SEARCH_TEXT_CLEAR
    }
};


