import { connect } from 'react-redux';
import Todolist from '../screens/Todolist.js';
import { add, del, update, toggle, load, loadRemoteList } from '../actions';

const mapStateToProps = state => {
  return {
    todolist: state.todolist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: item => dispatch(add(item)),
    del: id => dispatch(del(id)),
    update: item => dispatch(update(item)),
    toggle: id => dispatch(toggle(id)),
    load: todolist => dispatch(load(todolist)),
    loadFromFirebase: () => dispatch(loadRemoteList()),
  };
};

const TodolistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todolist);

export default TodolistContainer;
