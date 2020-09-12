import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  TextInput,
  CameraRoll,
  Easing,
  Animated,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import LottieView from "lottie-react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Card, CardSection } from "./common";
import { getAlbumsOfUser } from "../actions/ProfileAction";
import { addAlbume } from "../actions/UserProfileActions";

class AddAlbume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: undefined,
      progress: new Animated.Value(0)
    };
    this.showProgressAnimatedValue = new Animated.Value(0);
    this.onSaveAlbume = this.onSaveAlbume.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentWillMount(){
    //console.log("photo",this.props.navigation.state.params.photo);
    this.titleValue='';
}

  onSaveAlbume = async () => {
    const userId = this.props.user.id;
    const coverPhoto = this.props.navigation.state.params.photo;
    this.props.addAlbume({ userId, title: this.titleValue, coverPhoto }).then(() => {
      this.setState({ title: "", image: undefined });
      this.props.getAlbumsOfUser(userId);
      this.props.navigation.navigate("Profile");
    });
  };

  animate() {
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

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  render() {
    //const titleValue='';
    return (
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior="position"
        style={{ flex: 1 }}
      >
      <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
        <ImageBackground
          source={{ uri: this.props.navigation.state.params.photo }}
          style={{ flex: 1, alignItems: "space-between" }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <Ionicons
              name="md-close-circle"
              size={30}
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{
                margin: 20,
                color: "#BDBDBD"
              }}
            />
            <Ionicons
              name="md-download"
              size={30}
              style={{
                marginRight: 20,
                color: "#BDBDBD"
              }}
              onPress={async () => {
                this.setState({ showProgress: true });
                await this.getPermissionAsync();
                Animated.timing(this.showProgressAnimatedValue, {
                  toValue: 1,
                  duration: 100
                }).start();
                this.state.progress.setValue(0);
                const loopAnim = Animated.loop(
                  Animated.timing(this.state.progress, {
                    toValue: 17,
                    duration: 800,
                    easing: Easing.linear
                  })
                );
                loopAnim.start();
                CameraRoll.saveToCameraRoll(
                  this.props.navigation.state.params.photo.uri,
                  "photo"
                ).then(() => {
                  loopAnim.stop();
                  Animated.sequence([
                    Animated.timing(this.showProgressAnimatedValue, {
                      toValue: 1,
                      duration: 100
                    }),
                    Animated.timing(this.state.progress, {
                      toValue: 61,
                      duration: 2400
                    }),
                    Animated.timing(this.showProgressAnimatedValue, {
                      toValue: 0,
                      duration: 100,
                      delay: 100
                    })
                  ]).start();
                });
              }}
            />
          </View>
          <Animated.View
            style={{
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              width: 400,
              height: 400,
              transform: [
                {
                  scale: this.showProgressAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.01, 1]
                  })
                }
              ]
            }}
          >
            <LottieView
              loop={false}
              source={require("../loading.json")}
              progress={this.state.progress.interpolate({
                inputRange: [0, 61],
                outputRange: [0, 1]
              })}
              style={{
                width: 400,
                height: 400
              }}
            />
          </Animated.View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              alignSelf: "flex-end"
            }}
          >
            <View style={Styles.containerStyle5}>
              <Text style={Styles.labelStyle}>Title</Text>
              <TextInput
                maxLength={50}
                autoCorrect={false}
                placeholder={""}
                //value={this.titleValue}
                style={Styles.inputStyle}
                onChangeText={title=>{
                    this.titleValue = title;
                    this._text.setNativeProps({text: `${title.length.toString()}/50`});
                }}
              />
              <TextInput
              editable={false}
              ref={component => this._text = component}
              style={{color:'white', alignSelf:'center', marginRight:5}}/>
            </View>
            <Ionicons
              name="md-send"
              size={30}
              style={{
                margin: 5,
                color: "#BDBDBD"
              }}
              onPress={() => this.onSaveAlbume()}
            />
          </View>
        </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const Styles = {
  containerStyle5: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "black",
    flexDirection: "row",
    height: 40,
    width: "85%",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "black",
    opacity: 0.5
  },
  inputStyle: {
    backgroundColor: "red",
    fontSize: 18,
    color: "white",
    lineHeight: 23,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 2,
    height: 20,
    width: 30,
    marginRight: 10,
    backgroundColor: "transparent",
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 10,
    alignSelf: "center",
    color: "white"
    //backgroundColor:'red'
  }
};

const mapStateToProps = ({ auth: { user } }) => {
  return { user };
};

export default connect(
  mapStateToProps,
  { getAlbumsOfUser, addAlbume }
)(AddAlbume);
