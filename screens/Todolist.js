import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Todo from '../components/Todo.js';

export default class Todolist extends React.Component {
  async UNSAFE_componentWillMount() {
    /*
    let todolist = await AsyncStorage.getItem('todolist');
    todolist = await JSON.parse(todolist);
    if (todolist) this.props.load(todolist);
    */
    this.props.loadFromFirebase();
  }

  _keyExtractor = (item, index) => index.toString();

  _renderRow = ({ item }) => (
    <Todo
      item={item}
      onToggle={() => this.toggle(item)}
      onEditPress={() => this.edit(item)}
    />
  );

  edit = item => {
    this.props.navigation.navigate('EditTodo', {
      headerTitle: 'Edit Todo',
      item: item,
      onEndEditing: this.saveEditing,
      onDelete: this.del,
    });
  };

  toggle = item => {
    this.props.toggle(item);
    this.storage();
  };

  storage = () => {
    setTimeout(
      () =>
        AsyncStorage.setItem('todolist', JSON.stringify(this.props.todolist)),
      500
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.todolist}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
      />
    );
  }
}

Todolist.navigationOptions = ({ navigation }) => ({
  title: 'Todolist',
  headerRight: (
    <TouchableOpacity
      style={{ marginRight: 20 }}
      onPress={() =>
        navigation.navigate('EditTodo', {
          headerTitle: 'Add TodoS',
        })
      }>
      <Text style={{ fontSize: 30 }}>+</Text>
    </TouchableOpacity>
  ),
});
