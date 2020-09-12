import React, { Component } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
  Text
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { getPhotosOfAlbume } from "../actions/ProfileAction";
import PhotoItem from "./PhotoItem";
import { Header } from "./common";

const HEADER_HEIGHT = Dimensions.get("window").height;

class ShowPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFlatlist: false,
      direction: "up"
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFlatlist = this.renderFlatlist.bind(this);
    this.titleAnimatedValue = new Animated.Value(0);
    this.backButtonAnimatedValue = new Animated.Value(0);
    this.plusButtonAnimatedValue = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { y: 0 };
  }

  static navigationOptions = {
    title: "Photos"
  };

  componentWillMount() {
    const id = this.props.navigation.state.params.albume.id;
    this.props.getPhotosOfAlbume(id);
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.backButtonAnimatedValue, {
        toValue: 10,
        duration: 300,
        delay: 1000,
        easing: Easing.out(Easing.back(5))
      }),
      Animated.timing(this.plusButtonAnimatedValue, {
        toValue: 10,
        duration: 300,
        delay: 1150,
        easing: Easing.out(Easing.back(5))
      }),
      Animated.timing(this.titleAnimatedValue, {
        toValue: 10,
        duration: 300,
        delay: 1300,
        easing: Easing.out(Easing.back(5))
      })
    ]).start();
  }
  _onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      if (this.state.direction == "up") {
        if (nativeEvent.translationY > -300) {
          Animated.timing(this._translateY, {
            toValue: 0,
            duration: 500,
            easing: Easing.bounce
          }).start(() => {
            this._lastOffset.y = 0;
          });
        } else {
          Animated.timing(this._translateY, {
            toValue: -HEADER_HEIGHT + 160,
            duration: 500,
            easing: Easing.bounce
          }).start(() => {
            this.setState({ showFlatlist: true });
            this.setState({ direction: "down" });
            this._lastOffset.y = -HEADER_HEIGHT + 160;
          });
        }
      } else {
        if (nativeEvent.translationY < 300) {
          Animated.timing(this._translateY, {
            toValue: -HEADER_HEIGHT + 160,
            duration: 500,
            easing: Easing.bounce
          }).start(() => {
            this._lastOffset.y = -HEADER_HEIGHT + 160;
          });
        } else {
          Animated.timing(this._translateY, {
            toValue: 0,
            duration: 500,
            easing: Easing.bounce
          }).start(() => {
            this.setState({ showFlatlist: false });
            this.setState({ direction: "up" });
            this._lastOffset.y = 0;
          });
        }
      }
    }
  };

  _onGestureEvent = event => {
    if (this._lastOffset.y === 0 && event.nativeEvent.translationY > 0) return;
    if (
      this._lastOffset.y === -HEADER_HEIGHT + 110 &&
      event.nativeEvent.translationY < 0
    )
      return;
    this._translateY.setValue(
      this._lastOffset.y + event.nativeEvent.translationY / 1.5
    );
  };

  renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: "#F4F3F3" }}>
        <PhotoItem photo={item} />
      </View>
    );
  };

  renderFlatlist() {
    return (
      <View
        style={{
          width: "100%",
          minHeight: HEADER_HEIGHT - 160
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          data={this.props.photos}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }

  render() {
    const {
      navigation: {
        state: {
          params: { albume }
        }
      }
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            height: HEADER_HEIGHT,
            justifyContent: "space-between",
            zIndex: 10000,
            transform: [
              {
                translateY: this._translateY
              }
            ]
          }}
        >
          <Animated.View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              zIndex: 10000,
              transform: [
                {
                  translateY: this._translateY.interpolate({
                    inputRange: [0, HEADER_HEIGHT],
                    outputRange: [0, -HEADER_HEIGHT]
                  })
                }
              ]
            }}
          >
            <Animated.View
              style={{
                zIndex: 100,
                margin: 30,
                width: 50,
                transform: [
                  {
                    scale: this.plusButtonAnimatedValue.interpolate({
                      inputRange: [0, 10],
                      outputRange: [0.01, 1]
                    })
                  },
                  {
                    scale: this._translateY.interpolate({
                      inputRange: [0, HEADER_HEIGHT],
                      outputRange: [1, 1.5]
                    })
                  }
                ]
              }}
            >
              <Ionicons
                name="md-arrow-round-back"
                size={40}
                onPress={() => this.props.navigation.goBack()}
              />
            </Animated.View>
            <Animated.View
              style={{
                zIndex: 100,
                margin: 30,
                width: 50,
                alignSelf: "flex-end",
                alignItems: "flex-end",
                top: 0,
                transform: [
                  {
                    scale: this.backButtonAnimatedValue.interpolate({
                      inputRange: [0, 10],
                      outputRange: [0.01, 1]
                    })
                  },
                  {
                    scale: this._translateY.interpolate({
                      inputRange: [0, HEADER_HEIGHT],
                      outputRange: [1, 1.5]
                    })
                  }
                ]
              }}
            >
              <Ionicons
                name="md-add"
                size={45}
                onPress={() =>
                  this.props.navigation.navigate("AddPhoto", { albume })
                }
              />
            </Animated.View>
          </Animated.View>
          <View style={{ zIndex: 1000 }}>
            <Animated.Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                left: 0,
                bottom: 0,
                margin: 40,
                transform: [
                  {
                    scale: this.titleAnimatedValue.interpolate({
                      inputRange: [0, 10],
                      outputRange: [0.01, 1]
                    })
                  },
                  {
                    scale: this._translateY.interpolate({
                      inputRange: [0, HEADER_HEIGHT],
                      outputRange: [1, 1.5]
                    })
                  },
                  {
                    translateY: this._translateY.interpolate({
                      inputRange: [0, HEADER_HEIGHT - 110],
                      outputRange: [0, HEADER_HEIGHT - 700]
                    })
                  },
                  {
                    translateX: this._translateY.interpolate({
                      inputRange: [0, HEADER_HEIGHT],
                      outputRange: [0, 100]
                    })
                  }
                ]
              }}
            >
              {albume.title}
            </Animated.Text>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            width: "100%",
            position: "absolute",
            zIndex: 500,
            transform: [
              {
                translateY: this._translateY
              },
              {
                scaleX: this._translateY.interpolate({
                  inputRange: [0, HEADER_HEIGHT],
                  outputRange: [1, 0.5]
                })
              }
            ]
          }}
        >
          <PanGestureHandler
            enabled={true}
            onGestureEvent={this._onGestureEvent}
            onHandlerStateChange={this._onHandlerStateChange}
            style={{
              flex: 1,
              height: HEADER_HEIGHT
            }}
          >
            <Animated.View
              style={{
                flex: 1,
                height: HEADER_HEIGHT
              }}
            >
              <ImageBackground
                source={{ uri: albume.coverPhoto }}
                style={{ width: "100%", height: "100%" }}
              />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
        <Animated.View
          style={{
            width: "100%",
            zIndex: 500,
            transform: [
              {
                translateY: this._translateY
              }
            ]
          }}
        >
          {this.state.showFlatlist && this.renderFlatlist()}
        </Animated.View>
      </View>
    );
  }
}

mapStateToProps = ({ AlbumePhotos }) => {
  const photos = AlbumePhotos.photos;
  return { photos };
};

export default connect(
  mapStateToProps,
  { getPhotosOfAlbume }
)(ShowPhotos);
