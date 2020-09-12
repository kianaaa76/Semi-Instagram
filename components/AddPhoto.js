import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
    View, 
    Text,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

class AddPhoto extends Component {

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
          hasCameraPermission: null,
          type: Camera.Constants.Type.back
        };
        this.ImagePicker = this.ImagePicker.bind(this);
        this.getPermissionAsync = this.getPermissionAsync.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this.chanegeCamera = this.chanegeCamera.bind(this);
      }

      ImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3]
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
          this.setState({ showProgress: true, progress: 0 });
          this.props.SetPostImage(this.state.image, this.animate);
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

      takePicture = async () => {

        const {
            navigation: {
              state: {
                params: { albume }
              }
            }
          } = this.props;

        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
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
          this.props.navigation.navigate("AddPhotoTitle", { photo , albume});
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

      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
      }
    

    render(){

        return (
            <View style={{ flex: 1, backgroundColor: "black" }}>
                <Camera
                ratio={"4:3"}
                pictureSize="low"
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
                <View
                    style={{
                    flex: 1,
                    }}
                >
                    <View
                    style={{
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
                        this.props.navigation.goBack();
                        }}
                        style={{
                        color: "#BDBDBD",
                        elevation: 2,
                        marginLeft:10
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
                        Add Photo
                        </Text>
                    </View>
                    <View style={{width: 30, marginRight:10}}/>
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
                </View>
                </View>
            </View>
        );
    }
}

const Styles = {
    takePhotoButtonStyle: {
      flex: 1,
      backgroundColor: "white",
      opacity: 0.5,
      borderColor: "gray",
      borderWidth: 10,
      width: 70,
      backgroundColor: "white",
      height: 70,
      borderRadius: 35,
      alignSelf: "center"
    }
  };

export default connect ()(AddPhoto);