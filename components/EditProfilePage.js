import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Progress from 'react-native-progress';
import { Card, CardSection, Spinner, Input } from "./common";
import * as actions from "../actions/UserProfileActions";
import DEFAULT_IMAGE from "../Images/download.png";
class EditProfilePage extends Component {
  static navigationOptions = {
    title: "Edit Info"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.navigation.state.params.user.name,
      username: props.navigation.state.params.user.username,
      password: props.navigation.state.params.user.password,
      phone: props.navigation.state.params.user.phone,
      email: props.navigation.state.params.user.email,
      bio: props.navigation.state.params.user.bio,
      avatar: props.navigation.state.params.user.avatar,
      progress: 0,
    };
    this.onSavePress = this.onSavePress.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  animate (){
      let progress = 0;
      this.setState({ progress });
        setTimeout(() => {
            setInterval(() => {
                progress += 0.03;
                if (progress > 1) {
                progress = 1;
                }
                this.setState({ progress });
            }, 500);
        }, 1500);
  }

  onSavePress() {
    const ID = this.props.navigation.state.params.user.id;
    const { email, name, username, phone, password , bio, avatar} = this.state;
    this.props
      .editProfile({ ID, email, name, username, phone, password, bio, avatar})
      .then(() =>
        this.props.navigation.navigate("Profile", { user: this.props.user })
      );
  }

  renderButton() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Spinner size="small"/>
    ) : (
      <TouchableOpacity
        onPress={this.onSavePress}
        style={Styles.containerStyle}>
        <Text style={Styles.textStyle}>Save</Text>
      </TouchableOpacity>
    );
  }

  imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
      this.props.ChangeAvatar(this.state.avatar, this.animate);
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={this.imagePicker}>
            <Progress.Circle
                size={176}
                thickness={8}
                endAngel={1}
                progress={this.state.progress}
                color= "#808080"
            />
            <Image
              source={
                this.state.avatar ? { uri: this.state.avatar } : DEFAULT_IMAGE
              }
              style={Styles.imageStyle}
            />
          </TouchableOpacity>
        </View>
        <Card>
          <CardSection>
            <Input
              label="Name"
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Phone"
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Bio"
              value={this.state.bio}
              onChangeText={bio => this.setState({ bio })}
            />
          </CardSection>
        </Card>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const Styles = {
  containerStyle: {
    borderWidth: 2,
    borderColor: "#ABAAAA",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: 350,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  textStyle: {
    color: "#737171",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10
  },
  imageStyle: {
    position: 'absolute',
    width: 160,
    height: 160,
    top: 8,
    left: 8,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 80
  }
};

mapStateToProps = ({ auth }) => {
  return { user: auth.user, isLoading: auth.isLoading };
};

export default connect(
  mapStateToProps,
  actions
)(EditProfilePage);
