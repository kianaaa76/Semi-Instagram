import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { CardSection, Card, Input, Button, Spinner, Header } from "./common";
import { signupUser } from "../actions/AuthActions";

class SignUp extends Component {
  static navigationOptions = {
    title: "SignUp Form"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      name: "",
      username: "",
      phone: "",
      password: ""
    };
  }

  componentWillMount() {
    if (this.props.auth.user && this.props.auth.user.username) {
      this.props.navigation.replace("Home", { user: this.props.auth.user });
    }
  }

  renderButton() {
    if (!this.props.auth.isLoading) {
      return <Button onPress={this.onButtonPress.bind(this)}>Sign Up</Button>;
    }
    return <Spinner size="small" />;
  }

  onButtonPress() {
    const { email, name, username, phone, password } = this.state;
    this.props
      .signupUser({ name, email, username, phone, password })
      .then(() => {
        this.props.navigation.replace("Home", { user: this.props.auth.user });
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="SignUp Page"/>
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="Enter Your Name"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Username"
              placeholder="Enter Your Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Phone"
              placeholder="555-5555"
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone })}
            />
          </CardSection>

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
          }}
        >
          {this.props.auth.error + ""}
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 40
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Already Have an Acount?
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace("Login");
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "blue" }}>
              Login
            </Text>
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
  { signupUser }
)(SignUp);
