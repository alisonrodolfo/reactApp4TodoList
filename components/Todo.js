import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Todo extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onToggle}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          padding: 10,
        }}>
        {this.props.item.done ? (
          <MaterialCommunityIcons name="checkbox-marked" size={20} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank-outline" size={20} />
        )}
        <Text style={{ paddingLeft: 20, fontSize: 20, flex: 3 }}>
          {this.props.item.name}
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 0,
            marginLeft: 0,
            height: 50,
            width: 50,
          }}
          onPress={this.props.onEditPress}>
          <MaterialCommunityIcons name="pencil" size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
