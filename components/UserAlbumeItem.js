import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image
} from "react-native";
import RNViewer from "react-native-viewer";

class UserAlbumeItem extends Component {

  onAlbumePress() {
    this.props.onAlbumePress();
    if (this.RNViewer.isOpened){
      this.RNViewer.close(true);
    }
  }

  render() {
    return this.props.albume.coverPhoto ? (
      <RNViewer
        ref={r => (this.RNViewer = r)}
        onOpened={() => this.onAlbumePress()}
        style={{ width: 170, height: 270 }}
        realSize={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        <ImageBackground
          source={{ uri: this.props.albume.coverPhoto }}
          style={{
            flex: 1,
            backgroundColor: "red",
            width: "100%",
            height: "100%"
          }}
        />
      </RNViewer>
    ) : (
      <TouchableOpacity
        onPress={() => this.props.onAlbumePress()}
        style={Styles.containerStyle}
      >
        <Text>{this.props.albume.title}</Text>
      </TouchableOpacity>
    );
  }
}

const Styles = {
  containerStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 8,
    flex: 1,
    height: 270,
    justifyContent: "center",
    alignItems: "center"
  },
  containerStyle2: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 8,
    flex: 1,
    height: 270,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default UserAlbumeItem;
