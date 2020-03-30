import React from "react";
//import { View, Text } from "react-native";
import * as firebase from "firebase";
import { Input, Icon, Card, Button } from "react-native-elements";

import {loginThunk}  from '../actions';
const actionCreators = {loginThunk};

import {
  Keyboard,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

export default class Login extends React.Component {
  state = {
    user: null,
    email: "marcomarino@gmail.com",
    password: "marino",
    error: ""
  };

  componentDidMount() {
    this.props.updateemail(this.state.email);
    this.props.updatepassword(this.state.password);
  }

  
  handleLogin = () => {
    this.setState({ error: "" });
    this.props.loginThunk().then(() => { this.props.user ? this.props.navigation.navigate('Todolist') : this.setState({ error: this.props.error.message }) })

  };


  handleSignUp = () => {
    this.setState({ error: "" });
    this.props.signupThunk().then(() => { this.props.user ? this.props.navigation.navigate('Todolist') : this.setState({ error: this.props.error.message }) })
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>TODO List</Text>
              <TextInput
                placeholder="Email"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                onChangeText={email => this.props.updateemail(email)}
              />
              <TextInput
                placeholder="Senha"
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
                secureTextEntry={true}
                onChangeText={password => this.props.updatepassword(password)}
              />
              <Button
                onPress={this.handleLogin}
                buttonStyle={styles.loginButton}
                title="Login"
              />
              <Button
                onPress={this.handleSignUp}
                buttonStyle={styles.fbLoginButton}
                title="Criar uma conta"
              />

              <Text style={{ color: "red", textAlign: "center" }}>
                {this.state.error}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      /* <Card>
        <Input
          placeholder="  Enter email"
          onChangeText={email => this.props.updateemail(email)}
          leftIcon={{ type: "ionicon", name: "ios-mail" }}
        />

        <Input
          placeholder="  Enter password"
          onChangeText={password => this.props.updatepassword(password)}
          leftIcon={{ type: "ionicon", name: "ios-key" }}
        />

        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Register"
          buttonStyle={{ marginTop: 10 }}
          onPress={this.handleSignUp}
        />
        <Text style={{ color: "red", textAlign: "center" }}>
          {this.state.error}
        </Text>
      </Card>
      */
    );
  }
}

Login.navigationOptions = {
  title: "Login"
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1
  },
  loginScreenContainer: {
    flex: 1
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center"
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50
  },
  fbLoginButton: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    backgroundColor: "#c4c3cb",
    marginLeft: 50,
    marginRight: 50
  }
});
