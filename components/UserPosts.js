import React, { Component } from "react";
import { View, Dimensions, FlatList, Text, Animated } from "react-native";
import UserPostItem from "./UserPostsItem";
const SCREEN = Dimensions.get("screen");

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this._scrollAnimatedValue = new Animated.Value(0);
    this.state={headerHeight:0}
  }

  renderItem({ item }) {
    return <UserPostItem 
      postt={item} 
      isUser={this.props.isUser} 
      onAccept={this.props.onAccept} 
      refreshPosts = {this.props.refreshPosts}
    />
  }

  renderEmptyComponent() {
    return (
      <View style={Styles.containerStyle}>
        <Text style={Styles.textStyle}>No Posts Yet?!</Text>
        <Text style={Styles.textStyle}>Add Some Posts!</Text>
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
      offset: scroll
    });
  };

  render() {
    const { isFocused, ScrollY, scrollList } = this.props;
    return (
      <View
        style={{
          flex: 1
        }}>
        <Animated.FlatList
          ref={"flatlist"}
          data={this.props.posts}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader(this.props.HEIGHT)}
          contentContainerStyle={{ minHeight: SCREEN.height +35}}
          ListEmptyComponent={this.renderEmptyComponent()}
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
                  scrollList(event.nativeEvent.contentOffset.y, "albums");
                } 
              }
            },
            {
              useNativeDriver: true
            }
          )}
          scrollEventThrottle={16}
          keyExtractor={item => item.id.toString()}
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
    marginTop: 35
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center"
  }
};

export default UserPosts;
