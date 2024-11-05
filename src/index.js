import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  user: null,
  isAuthenticated: false,
  search: null,
  detail: null,
  tvdetail: null,
};

function reducer(state = initialState, action){
  switch(action.type){
    case 'get': return action.data;
    case 'search': return {...state,search:action.data};
    case 'detail': return action.data;
    case 'tvdetail': return action.data;
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.data, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
   }
   return state;
}

let store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}> 
      <App /> 
    </Provider>   
);