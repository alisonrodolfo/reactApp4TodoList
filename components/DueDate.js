import React from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  Button
} from "react-native";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default class DueDate extends React.Component {
  state = {
    dataAtual: new Date,
    mode: 'date',
    show: 'nada'

  };

  setData = (event, selectedDate) => {
    //let d = selectedDate; // get date
    //d.setHours(this.props.date.getHours(),this.props.date.getMinutes(),0,0);
    
    const currentDate = selectedDate || this.state.dataAtual;
    this.setState({ date: currentDate});
    this.props.onChangeDate(currentDate);
  };

  setHora = (event, selectedDate) => {
    let d = this.props.date; // get date
    d.setHours(selectedDate.getHours(),selectedDate.getMinutes(),0,0);
    this.setState({ date: d });
    this.props.onChangeDate(d);
  };

  showDatepicker = () => {
    this.setState({ show: 'data' });
  };
  showTimepicker = () => {
    this.setState({ show: 'hora' });
  };


  render() {
   
    return (
      <TouchableOpacity style={this.props.style} >
        <Button onPress={this.showDatepicker} title= {moment(this.props.date).format("L")} />
        {((this.state.show==='data')&&((Platform.OS === 'android')||(Platform.OS === 'ios'))) ? <RNDateTimePicker mode="date" value={new Date()} onChange={this.setData} /> : false }
    
        <Button onPress={this.showTimepicker} title={moment(this.props.date).format("LT")} />
        {((this.state.show==='hora')&&((Platform.OS === 'android')||(Platform.OS === 'ios'))) ? <RNDateTimePicker mode="time" value={new Date()} onChange={this.setHora} /> : false }
      </TouchableOpacity>
    );
  }
}
