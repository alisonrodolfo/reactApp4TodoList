import React from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import DueDate from '../components/DueDate.js';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const placeholder = require('../images/placeholder.jpg');

export default class EditTodo extends React.Component {
  state = {
    name: '',
    remind: false,
    date: 'no date',
    image: null,
  };

  UNSAFE_componentWillMount() {
    this.props.navigation.setParams({
      onSave: this.save,
      onDeletePress: this.del,
    });
    const item = this.props.navigation.state.params.item;
    if (item) {
      this.setState({
        name: item.name,
        remind: item.remind,
        date: item.date || 'no date',
        image: item.image || null,
      });
      this.currentTodo = item;
    }
  }

  changeDate = date => {
    console.log('hello edit');
    this.setState({ date: date });
  };

  storage = () => {
    setTimeout(
      () =>
        AsyncStorage.setItem('todolist', JSON.stringify(this.props.todolist)),
      500
    );
  };

  del = () => {
    this.props.del(this.props.navigation.state.params.item.key);
    this.props.navigation.goBack();
  };

  save = () => {
    if (this.state.name === '') return;
    if (this.currentTodo) {
      const updatedTodo = {
        key: this.currentTodo.key,
        name: this.state.name,
        remind: this.state.remind,
        done: this.currentTodo.done,
        date: this.state.date,
      };
      if (this.state.image) {
        updatedTodo.image = this.state.image;
      }
      this.props.update(updatedTodo);
    } else {
      const newTodo = {
        name: this.state.name,
        remind: this.state.remind,
        done: false,
        date: this.state.date,
      };
      if (this.state.image) {
        newTodo.image = this.state.image;
      }
      this.props.add(newTodo);
    }
    this.storage();
    this.props.navigation.goBack();
  };

  pickImage = () => {
    Alert.alert(
      'Choose image',
      'Select image from gallery or take one',
      [
        {
          text: 'Gallery',
          onPress: this.pickImageFromGallery,
        },
        {
          text: 'Camera',
          onPress: this.pickImageFromCamera,
        },
      ],
      { cancelable: true }
    );
  };

  manipulateImage = async uri => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ width: Dimensions.get('window').width }],
      {
        compress: 0.7,
        format: 'jpeg',
      }
    );
    this.setState({ image: manipulatedImage.uri });
  };

  pickImageFromCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      console.warn('CAMERA permissions denied');
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });

    if (!result.cancelled) {
      this.manipulateImage(result.uri);
    }
  };

  pickImageFromGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.warn('CAMERA_ROLL permissions denied');
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
    });

    if (!result.cancelled) {
      this.manipulateImage(result.uri);
    }
  };

  render() {
    return (
      <View>
        <TextInput
          autofocus
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
          style={{
            height: 50,
            backgroundColor: 'white',
            padding: 5,
            marginTop: 25,
          }}
          placeholder="Name of the item"
          placeholderTextColor="gray"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            marginTop: 40,
            backgroundColor: 'white',
            height: 50,
            borderBottomWidth: 1,
          }}>
          <Text>Remind</Text>
          <Switch
            value={this.state.remind}
            onValueChange={() => this.setState({ remind: !this.state.remind })}
          />
        </View>
        {this.state.remind ? (
          <DueDate
            date={this.state.date}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5,
              backgroundColor: 'white',
              height: 50,
            }}
            onChangeDate={this.changeDate}
          />
        ) : null}
        <TouchableOpacity onPress={this.pickImage}>
          <Image
            source={this.state.image ? { uri: this.state.image } : placeholder}
            style={{ marginTop: 40, width: '100%', height: 200 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

EditTodo.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.headerTitle,
  headerRight: (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={navigation.state.params.onSave}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>OK</Text>
      </TouchableOpacity>
      {navigation.state.params.item ? (
        <TouchableOpacity onPress={navigation.state.params.onDeletePress}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>DEL</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  ),
});
