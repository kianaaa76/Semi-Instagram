import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";
import * as ProfileActions from "../actions/ProfileAction";
import { DeletePost } from "../actions/UserProfileActions";
import { Header } from "./common";
import UserPosts from "./UserPosts";
import UserAlbumes from "./UserAlbumes";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Posts" },
        { key: "second", title: "Albumes" }
      ]
    };
    this.onAccept = this.onAccept.bind(this);
    this.onAlbumePress = this.onAlbumePress.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.refreshPosts = this.refreshPosts.bind(this);
    this.scrollY = new Animated.Value(0);
  }

  componentWillMount() {
    const item = this.props.user;
    this.props.getAlbumsOfCurrentUser(item.id);
    this.props.getPostsOfCurrentUser(item.id);
  }

  scrollList = (offset, list) => {
    if (list === "posts") {
      this.userPosts.scrollFunction(offset);
    } else {
      this.userAlbums.scrollFunction(offset);
    }
  };

  onAlbumePress(albume) {
    this.props.navigation.navigate("ShowPhotos", { albume });
  }

  renderAvatar() {
    const item = this.props.user;
    const profileImageHeight = this.scrollY.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0.65],
      extrapolate: "clamp"
    });
    const profileImageTranslate = this.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 190],
      extrapolate: "clamp"
    });
    return item.avatar ? (
      <Animated.Image
        source={{ uri: item.avatar }}
        style={{
          flex: 1,
          height: 80,
          width: 80,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 40,
          transform: [
            {
              translateY: profileImageTranslate
            },
            { scale: profileImageHeight }
          ]
        }}
      />
    ) : (
      <Animated.Image
        source={require("/Users/user/Desktop/test/SemiInstagram/Images/download.png")}
        style={{
          flex: 1,
          height: 80,
          width: 80,
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 40,
          transform: [
            {
              translateY: profileImageTranslate
            },
            { scale: profileImageHeight }
          ]
        }}
      />
    );
  }

  onAccept(postId) {
    this.props.DeletePost(postId).then(() => {
      this.setState({ showModal: false });
    });
  }

  refreshPosts() {
    this.props.getPostsOfCurrentUser(this.props.user.id);
  }

  render() {
    // console.log("UserAlbumes", this.props.UserAlbumes);
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0, 160],
      outputRange: [0, -160],
      extrapolate: "clamp"
    });

    const headerTextOpacity = this.scrollY.interpolate({
      inputRange: [0, 160],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const headerTextOpacity2 = this.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    const user = this.props.user;
    const followers_num = user.followers.length.toString();
    const following_num = user.following.length.toString();
    const posts_num = this.props.UserPosts.length.toString();
    const albumes_num = this.props.UserAlbumes.length.toString();
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Header headerText={user.username} />
        <TabView
          navigationState={this.state}
          renderScene={({ route }) => {
            switch (route.key) {
              case "first":
                return (
                  <UserPosts
                    ref={c => {
                      this.userPosts = c;
                    }}
                    isFocused={this.state.index == 0}
                    posts={this.props.UserPosts}
                    ScrollY={this.scrollY}
                    scrollList={this.scrollList}
                    HEIGHT={272}
                    isUser={1}
                    onAccept={this.onAccept}
                    refreshPosts={this.refreshPosts}
                  />
                );
              case "second":
                return (
                  <UserAlbumes
                    ref={c => {
                      this.userAlbums = c;
                    }}
                    isFocused={this.state.index == 1}
                    albumes={this.props.UserAlbumes}
                    onAlbumePress={this.onAlbumePress}
                    ScrollY={this.scrollY}
                    scrollList={this.scrollList}
                    HEIGHT={272}
                    isUser={1}
                  />
                );
            }
          }}
          renderTabBar={props => {
            return (
              <Animated.View
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  transform: [{ translateY: headerHeight }],
                  position: "absolute",
                  zIndex: 10
                }}
              >
                <View style={Styles.containerStyle4}>
                  <View
                    style={{
                      width: 80,
                      borderRadius: 40,
                      borderColor: "white",
                      borderWidth: 1,
                      marginLeft: 10,
                      height: 80,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {this.renderAvatar()}
                  </View>
                  <Animated.View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      opacity: headerTextOpacity2
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={Styles.titleWithNumbersStyle}>
                        <Text>{followers_num}</Text>
                        <TouchableOpacity>
                          <Text style={Styles.titleStyle}>Followers</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={Styles.titleWithNumbersStyle}>
                        <Text>{following_num}</Text>
                        <TouchableOpacity>
                          <Text style={Styles.titleStyle}>Followings</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View style={Styles.titleWithNumbersStyle}>
                        <Text>{posts_num}</Text>
                        <Text style={Styles.titleStyle}>Posts</Text>
                      </View>
                      <View style={Styles.titleWithNumbersStyle}>
                        <Text>{albumes_num}</Text>
                        <Text style={Styles.titleStyle}>Albumes</Text>
                      </View>
                    </View>
                  </Animated.View>
                </View>
                <Animated.View
                  style={{
                    padding: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    opacity: headerTextOpacity2
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("EditProfile", {
                        user: this.props.user
                      })
                    }
                    style={Styles.ButtonStyle}
                  >
                    <Text style={Styles.ButtonTextStyle}>Edit</Text>
                  </TouchableOpacity>
                </Animated.View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                  }}
                >
                  <View style={Styles.bioContainerStyle}>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        transform: [
                          {
                            translateX: this.scrollY.interpolate({
                              inputRange: [0, 80, 170],
                              outputRange: [0, 60, 80],
                              extrapolate: "clamp"
                            })
                          },
                          {
                            translateY: this.scrollY.interpolate({
                              inputRange: [0, 30, 170],
                              outputRange: [0, 6, 13],
                              extrapolate: "clamp"
                            })
                          }
                        ]
                      }}
                    >
                      {user.name}
                    </Animated.Text>
                    <Animated.Text style={{ opacity: headerTextOpacity }}>
                      {user.bio}
                    </Animated.Text>
                  </View>
                </View>
                <TabBar {...props} style={{ backgroundColor: "#808080" }} />
              </Animated.View>
            );
          }}
          onIndexChange={index => this.setState({ index })}
          lazy={false}
        />
      </View>
    );
  }
}

const Styles = {
  imageStyle: {
    width: 80,
    height: 80,
    margin: 15,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 38
  },
  imageContainerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleWithNumbersStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  containerStyle4: {
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  containerStyle3: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  ButtonStyle: {
    borderWidth: 2,
    borderColor: "#ABAAAA",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    width: 270,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  ButtonTextStyle: {
    color: "#737171",
    fontSize: 17,
    alignSelf: "center",
    fontWeight: "bold"
  },
  bioContainerStyle: {
    margin: 16
  },
  bioStyle: {
    fontSize: 15,
    fontWeight: "bold"
  }
};

mapStateToProps = ({
  UserProfileData: { UserProfileAlbums, UserProfilePosts },
  auth: { user },
  DeletePost: { isLoading }
}) => {
  const UserAlbumes = UserProfileAlbums;
  const UserPosts = UserProfilePosts;
  const DeletePostLoading = isLoading;
  return { UserAlbumes, UserPosts, user: user, DeletePostLoading };
};

export default connect(
  mapStateToProps,
  {
    getPostsOfCurrentUser: ProfileActions.getPostsOfCurrentUser,
    getAlbumsOfCurrentUser: ProfileActions.getAlbumsOfCurrentUser,
    DeletePost,
  }
)(Profile);
