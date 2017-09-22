import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReaduxThunk from 'redux-thunk';
import reducers from './reducers';
import RouterComponent from './router/Router';


const App= ()=>{
    return (

        <Provider store={createStore(reducers, {}, applyMiddleware( ReaduxThunk) )}>
           <RouterComponent/>
        </Provider>

    );
};

export default App;