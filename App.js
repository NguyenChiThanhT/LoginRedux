import React,{Component} from 'react';
import Routers from './src/routers/router';
import {Provider} from 'react-redux';
import store from'./src/redux/Store';
export default  class App extends Component{
       render(){
           return(
               <Provider store={store}>
                   <Routers />
               </Provider>
           );
       }
}