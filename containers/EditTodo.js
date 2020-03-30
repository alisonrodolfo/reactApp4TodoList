import { connect } from 'react-redux';
import EditTodo from '../screens/EditTodo.js';
import { add, update, del } from '../actions';

const mapStateToProps = state => {
  return {
    todolist: state.todolist,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: item => dispatch(add(item)),
    update: item => dispatch(update(item)),
    del: key => dispatch(del(key)),
  };
};

const EditTodoContainer = connect(
  null,
  mapDispatchToProps
)(EditTodo);

export default EditTodoContainer;
