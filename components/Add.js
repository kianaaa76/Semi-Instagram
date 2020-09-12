import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Animated,
  Image,
  KeyboardAvoidingView,
  TextInput,
  BackHandler
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Progress from "react-native-progress";
import { Camera } from "expo-camera";
import {
  SetPostImage,
  addPost,
  AddAlbume,
  SetAlbumeImage
} from "../actions/UserProfileActions";
import { getPostsOfUser, getAlbumsOfUser } from "../actions/ProfileAction";
import { Card, CardSection, Input, Header } from "./common";
import DEFAULT_IMAGE from "../Images/default-image.jpg";

class AddPost extends Component {
  static navigationOptions = {
    title: "Add",
    header: null,
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      value: "",
      image: undefined,
      progress: 0,
      showProgress: false, //todo
      flipperFlag: "AddPost",
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    };
    this.flipperAnimatedValue = new Animated.Value(0);
    this.flip_Animation = this.flip_Animation.bind(this);
    this.onSavePost = this.onSavePost.bind(this);
    this.animate = this.animate.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.renderProgress = this.renderProgress.bind(this);
    BackHandler.addEventListener("hardwareBackPress", this.backHandler);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
  }
  backHandler() {
    this.setState({ flipperFlag: "AddPost" });
    this.flipperAnimatedValue.setValue(0);
    this.props.navigation.goBack();
    return true;
  }

  animate() {
    let progress = 0;
    this.setState({ progress });
    this.progressInterval = setInterval(() => {
      progress += 0.03;
      if (progress >= 1) {
        this.setState({ showProgress: false });
        progress = 1;
        clearInterval(this.progressInterval);
      }
      this.setState({ progress });
    }, 500);
  }

  ImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ showProgress: true, progress: 0 });
      this.props.SetAlbumeImage(this.state.image, this.animate);
      this.props.navigation.navigate('AddAlbume', { photo: this.state.image });
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

  onSavePost = () => {
    const ID = this.props.user.id;
    const { title, body, image } = this.state;
    this.props.addPost({ ID, title, body, image }).then(() => {
      this.setState({ title: "", body: "", image: undefined });
      this.props.getPostsOfUser(ID);
      this.props.navigation.navigate("Profile", { user: this.props.user });
    });
  };

  flip_Animation = () => {
    if (this.state.flipperFlag == "AddPost") {
      Animated.spring(this.flipperAnimatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8
      }).start();
      this.setState({ flipperFlag: "AddAlbume" });
    } else {
      Animated.spring(this.flipperAnimatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8
      }).start();
      this.setState({ flipperFlag: "AddPost" });
    }
  };

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.flipperAnimatedValue.setValue(0);
      this.setState({
        title: "",
        body: "",
        value: "",
        image: undefined,
        progress: 0,
        showProgress: false,
        flipperFlag: "AddPost",
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
      });
      this.props.navigation.navigate("AddAlbume", { photo: photo.uri });
    }
  };

  chanegeCamera() {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  }

  renderProgress() {
    return (
      <View
        style={{
          width: 260,
          height: 260,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 130,
          position: "absolute",
          //margin: 15,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          opacity: 0.5
        }}
      >
        <Progress.Circle
          size={260}
          thickness={4}
          endAngel={1}
          progress={this.state.progress}
          style={{ alignSelf: "center" }}
          color="#000"
        />
      </View>
    );
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  renderPost() {
    const SetInterpolate2 = this.flipperAnimatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    return (
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior={"position"}
        keyboardVerticalOffset={-130}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={{
            flex: 1,
            transform: [{ rotateY: SetInterpolate2 }]
          }}
        >
          <Header headerText={"Create Post"} />
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => this.onSavePost()}
              style={{ padding: 15, justifyContent: "center" }}
            >
              <Text style={{ color: "gray", fontSize: 18, fontWeight: "bold" }}>
                Save
              </Text>
            </TouchableOpacity>
            <Ionicons
              name="md-sync"
              size={30}
              color="gray"
              style={{
                alignSelf: "flex-end",
                padding: 10
              }}
              onPress={() => this.flip_Animation()}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={this.ImagePicker}>
              <Image
                style={Styles.imageStyle2}
                source={
                  this.state.image ? { uri: this.state.image } : DEFAULT_IMAGE
                }
              />
              {this.state.showProgress && this.renderProgress()}
            </TouchableOpacity>
          </View>
          <Card>
            <CardSection>
              <Input
                label="Title"
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </CardSection>

            <CardSection>
              <Input
                label="Body"
                value={this.state.body}
                onChangeText={body => this.setState({ body })}
              />
            </CardSection>
          </Card>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={Styles.errorStyle}>{this.props.PostError}</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }
  renderAlbum() {
    const SetInterpolate = this.flipperAnimatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Camera
          //ratio={"4:3"}
          //pictureSize="low"
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            position: "absolute",
            top: 70,
            bottom: 70,
            left: 0,
            right: 0
          }}
          type={this.state.type}
        />
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              flex: 1,
              transform: [{ rotateY: SetInterpolate }]
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",

                marginTop: 20
              }}
            >
              <Ionicons
                name="md-close-circle"
                size={30}
                onPress={() => {
                  this.setState({
                    title: "",
                    body: "",
                    image: undefined,
                    progress: 0,
                    showProgress: false,
                    flipperFlag: "AddPost",
                    hasCameraPermission: null,
                    type: Camera.Constants.Type.back
                  });
                  this.flipperAnimatedValue.setValue(0);
                  this.props.navigation.goBack();
                }}
                style={{
                  color: "#BDBDBD",
                  elevation: 2
                }}
              />
              <View style={{ width: 175 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    alignSelf: "center",
                    color: "#BDBDBD"
                  }}
                >
                  Create Albume
                </Text>
              </View>
              <Ionicons
                name="md-bookmark"
                size={30}
                style={{
                  alignSelf: "flex-end",
                  padding: 10,
                  color: "#BDBDBD"
                }}
                onPress={() => this.flip_Animation()}
              />
            </View>
            <View
              style={{
                height: 70,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                bottom: 0
              }}
            >
              <Ionicons
                name="md-images"
                size={40}
                onPress={() => this.ImagePicker()}
                style={{
                  marginLeft: 12,
                  color: "#BDBDBD"
                }}
              />
              <TouchableOpacity
                onPress={this.takePicture}
                style={{ height: 70 }}
              >
                <View style={Styles.takePhotoButtonStyle} />
              </TouchableOpacity>
              <Ionicons
                name="md-sync"
                size={40}
                onPress={() => this.chanegeCamera()}
                style={{
                  marginRight: 12,
                  color: "#BDBDBD"
                }}
              />
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
  render() {
    return this.state.flipperFlag == "AddPost"
      ? this.renderPost()
      : this.renderAlbum();
  }
}

const Styles = {
  imageStyle2: {
    width: 260,
    height: 260,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 130
  },
  imageStyle: {
    flex: 1,
    width: null,
    elevation: 2,
    height: null,
    justifyContent: "space-between"
  },
  errorStyle: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15
  },
  containerstyle4: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    shadowColor: "#000",
    borderBottomWidth: 0,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    overflow: "hidden"
  },
  inputStyle: {
    fontSize: 18,
    color: "#000",
    lineHeight: 23,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 2,
    height: 20,
    width: 100,
    marginRight: 10,
    backgroundColor: "transparent"
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle5: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
    //opacity:0.1
  },
  takePhotoButtonStyle: {
    flex: 1,
    backgroundColor: "white",
    opacity: 0.5,
    borderColor: "gray",
    borderWidth: 10,
    width: 70,
    //elevation: 10,
    backgroundColor: "white",
    height: 70,
    borderRadius: 35,
    alignSelf: "center"
  }
};

mapStateToProps = ({ AddPostState, auth: { user }, AddAlbumeState }) => {
  return {
    PostIsLoading: AddPostState.isLoading,
    PostError: AddPostState.error,
    user,
    AlbumeIsLoading: AddAlbumeState.isLoading,
    AlbumeError: AddAlbumeState.error
  };
};

export default connect(
  mapStateToProps,
  {
    SetPostImage,
    SetAlbumeImage,
    addPost,
    getPostsOfUser,
    AddAlbume,
    getAlbumsOfUser
  }
)(AddPost);
