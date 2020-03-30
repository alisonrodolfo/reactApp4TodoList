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
} from '../actions/types.js';

const initialState = {
  todolist: [],
};

const todolistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todolist: [action.item, ...state.todolist],
      };
    case TOGGLE_TODO:
      return {
        todolist: state.todolist.map(
          todo =>
            todo.key === action.key ? { ...todo, done: !todo.done } : todo
        ),
      };
    case DELETE_TODO:
      return {
        todolist: state.todolist.filter(todo => todo.key !== action.key),
      };
    case UPDATE_TODO:
      return {
        todolist: state.todolist.map(
          todo => (todo.key === action.item.key ? action.item : todo)
        ),
      };
    case LOAD_TODOLIST:
      return {
        todolist: action.todolist,
      };
    case LOAD_FROM_FIREBASE:
      return {
        todolist: action.todolist,
      };
    case LOGIN:
        return { ...state, user: action.payload }
    case SIGNUP:
        return { ...state, user: action.payload }
    case UPDATE_EMAIL:
            return { ...state, email: action.payload }
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload }
    case ERROR:
      return { ...state, error: action.payload }  
    
    default:
      return state;
  }
};

export default todolistReducer;
