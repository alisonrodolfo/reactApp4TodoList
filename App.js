import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Todolist from './containers/Todolist.js';
import EditTodo from './containers/EditTodo.js';
import Login from './containers/Login.js';
import { createStore, applyMiddleware } from 'redux';
import todolistReducer from './reducers';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';

const store = createStore(todolistReducer, applyMiddleware(logger, thunk));

var config = {
   apiKey: "AIzaSyC1uCuk7Vcjx3ZN0ddanASb5rRux5-o3fg",
  authDomain: "reactapp4-f9393.firebaseapp.com",
  databaseURL: "https://reactapp4-f9393.firebaseio.com",
  projectId: "reactapp4-f9393",
  storageBucket: "reactapp4-f9393.appspot.com",
  messagingSenderId: "883640258919",
  appId: "1:883640258919:web:e2c14b809b78b3e67a1fc2"
};



!firebase.apps.length ? firebase.initializeApp(config) : null;

const MainNav = createStackNavigator(
  {
    Todolist: {
      screen: Todolist,
    },
    Login: {
      screen: Login,
    },
    EditTodo: {
      screen: EditTodo,
      
    },
  },
  {
    initialRouteName: 'Login',
  }
);

const App = () => {
  return (
    <Provider store={store}>
      <MainNav />
    </Provider>
  );
};

export default App;
