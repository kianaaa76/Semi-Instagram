import React, { Component } from "react";
import { View, Text, FlatList, Dimensions, Animated } from "react-native";
import UserAlbumeItem from "./UserAlbumeItem";

const HEADER_HEIGHT = 400;
const SCREEN = Dimensions.get("screen");
class UserAlbumes extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this._scrollAnimatedValue = new Animated.Value(0);
  }

  renderItem({ item }) {
    return (
      <UserAlbumeItem
        width={Dimensions.get("window").width}
        albume={item}
        onAlbumePress={() => {
          this.props.onAlbumePress(item);
        }}
      />
    );
  }

  renderEmptyComponent() {
    return (
      <View style={Styles.containerStyle}>
        <Text style={Styles.textStyle}>No Albumes Yet?!</Text>
        <Text style={Styles.textStyle}>Add Some Albumes!</Text>
      </View>
    );
  }

  renderHeader(HEIGHT) {
    return (
      <View
        style={{
          height: HEIGHT
        }}
      />
    );
  }

  scrollFunction = scroll => {
    this.refs.flatlist.getNode().scrollToOffset({
      offset: scroll,
      animated: false
    });
  };

  render() {
    const { isFocused, scrollList, ScrollY } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          style={{
            marginTop: 5,
          }}
          numColumns={2}
          data={this.props.albumes}
          ListEmptyComponent={this.renderEmptyComponent()}
          ListHeaderComponent={this.renderHeader(this.props.HEIGHT)}
          contentContainerStyle={{ minHeight: SCREEN.height + 35 }}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: isFocused ? ScrollY : this._scrollAnimatedValue
                  }
                }
              }
            ],
            {
              listener: event => {
                if (!isFocused) {
                  return;
                }
                if (event.nativeEvent.contentOffset.y <= 230) {
                  scrollList(event.nativeEvent.contentOffset.y, "posts");
                }
              }
            },
            {
              useNativeDriver: true
            }
          )}
          ref={"flatlist"}
          scrollEventThrottle={16}
        />
      </View>
    );
  }
}

const Styles = {
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 10
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    justifyContent: "center"
  }
};

export default UserAlbumes;
