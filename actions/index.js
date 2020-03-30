import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  LOAD_TODOLIST,
  LOAD_FROM_FIREBASE,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  LOGIN,
  SIGNUP,
  ERROR
} from './types.js';
import * as firebase from 'firebase';

export const add = item => dispatch => {
  firebase
    .database()
    .ref('/users/' + firebase.auth().currentUser.uid + '/todolist')
    .push(item)
    .then(response =>
      dispatch({ type: 'ADD_TODO', item: { ...item, key: response.key } })
    );
};

export const del = key => dispatch => {
  firebase
    .database()
    .ref('/users/' + firebase.auth().currentUser.uid + '/todolist/' + key)
    .remove()
    .then(() => dispatch({ type: DELETE_TODO, key: key }));
};

export const toggle = item => dispatch => {
  firebase
    .database()
    .ref('/users/' + firebase.auth().currentUser.uid + '/todolist/' + item.key)
    .update({ done: !item.done })
    .then(() => dispatch({ type: TOGGLE_TODO, key: item.key }));
};

export const update = item => dispatch => {
  var key = item.key;
  delete item.key;
  firebase
    .database()
    .ref('/users/' + firebase.auth().currentUser.uid + '/todolist/' + key)
    .update({ ...item })
    .then(() => {
      item.key = key;
      dispatch({ type: 'UPDATE_TODO', item: item });
    });
};

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password
    }
}

// redux-thunk é um middleware que permite que as ações do Redux retornem operações assíncronas
// Uma thunk envolve uma expressão para atrasar sua avaliação.
export const loginThunk = () => {
    return async (dispatch, getState) => {
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(getState().email, getState().password)
            dispatch({ type: LOGIN, payload: response.user });
        } catch (e) {
          dispatch({ type: ERROR, payload: e });
        }
    }
}

// redux-thunk é um middleware que permite que as ações do Redux retornem operações assíncronas
export const signupThunk = () => {
    return async (dispatch, getState) => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(getState().email, getState().password);
            dispatch({ type: SIGNUP, payload: response.user });
        } catch (e) {
          dispatch({ type: ERROR, payload: e });
        }
    }
}

export const setError = erro => {
    return {
        type: ERROR,
        payload: erro
    }
}


export const load = todolist => {
  return {
    type: LOAD_TODOLIST,
    todolist: todolist,
  };
};

const loadFromFirebase = dispatch => {
  firebase
    .database()
    .ref('/users/' + firebase.auth().currentUser.uid + '/todolist')
    .once('value', snap => {
     // console.log(firebase.database);
      var todolist = [];
      snap.forEach(child => {
        todolist.unshift({
          key: child.key,
          ...child.val(),
        });
      });
      
      dispatch({ type: LOAD_FROM_FIREBASE, todolist: todolist });
    });
};

export const loadRemoteList = () => loadFromFirebase;
