import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity} from "react-native";
import { CardSection, Card, Input, Button, Spinner , Header} from "./common";
import {loginUser} from "../actions/AuthActions";

class Login extends Component {

  static navigationOptions = {
    title: "Login Form"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  renderButton() {
    if (!this.props.isLoading) {
      return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
    }
    return <Spinner size="small" />;
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.props
      .loginUser({ email, password })
      .then(()=>this.props.navigation.replace("Home", { user: this.props.auth.user }))
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Header headerText="Login Page"/>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="User@gmail.com"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="Enter Your Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <CardSection>{this.renderButton()}</CardSection>
        </Card>
        <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "red",
              marginTop: 10
            }}>
            {this.props.auth.error+""}
        </Text>
        <View style={{
          justifyContent:'center', alignItems:'center',
          position: 'absolute', left: 0, right: 0, bottom: 40
        }}>
          <Text style={{fontSize: 15, fontWeight:'bold'}}>
            Don't Have an Acount Yet?!
          </Text>
          <TouchableOpacity onPress={()=>{this.props.navigation.replace('SignUp')}}>
            <Text style={{fontSize: 15, fontWeight:'bold', color:'blue'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  {loginUser}
)(Login);
