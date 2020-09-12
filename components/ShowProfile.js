import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Header } from './common';
import { connect } from "react-redux";
import * as actions from "../actions/ProfileAction";
import UserPosts from "./UserPosts";
import UserAlbumes from "./UserAlbumes";

class ShowProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Posts" },
        { key: "second", title: "Albumes" }
      ]
    };
    this.scrollY = new Animated.Value(0);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.SelectedItem.user.username
    };
  };

  scrollList = (offset, list) => {
    if (list === "posts") {
      this.userPosts.scrollFunction(offset);
    } else {
      this.userAlbums.scrollFunction(offset);
    }
  };

  componentWillMount() {
    const item = this.props.navigation.state.params.SelectedItem;
    this.props.getAlbumsOfUser(item.userId);
    this.props.getPostsOfUser(item.userId);
  }

  onAlbumePress(albumeId) {
    this.props.navigation.navigate("ShowPhotos", albumeId);
  }

  renderAvatar() {
    const item = this.props.navigation.state.params.SelectedItem;
    const profileImageHeight = this.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0.65],
      extrapolate: "clamp"
    });
   
      return ((item.user.avatar)?(
        <Animated.Image
          source={{ uri: item.user.avatar }}
          style={{
            flex: 1,
            height: 80,
            width: 80,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 40,
            transform: [
              {
                translateY: this.scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, 190],
                  extrapolate: "clamp"
                })
              },
              { scale: profileImageHeight }
            ]
          }}
        />
      ):(
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
                translateY: this.scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, 190],
                  extrapolate: "clamp"
                })
              },
              { scale: profileImageHeight },
            ]
          }}
        />
      )
    )
  }

  render() {
    const headerHeight = this.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, -200],
      extrapolate: "clamp"
    });

    const headerTextOpacity = this.scrollY.interpolate({
      inputRange: [0, 170],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const headerTextOpacity2 = this.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const item = this.props.navigation.state.params.SelectedItem;
    const user = this.props.user;
    const followers_num = item.user.followers.length.toString();
    const following_num = item.user.following.length.toString();
    const posts_num = this.props.UserPosts.length.toString();
    const albumes_num = this.props.UserAlbumes.length.toString();
    //console.log(user.username);
    return (
      <View
        style={{
          flex: 1,
          zIndex: 1000,
          //minHeight: 1000
        }}>
        <Header headerText={item.user.username}/>
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
                    HEIGHT ={320}
                    isUser={0}
                  />
                );
              case "second":
                return (
                  <UserAlbumes
                    ref={c => {
                      this.userAlbums = c;
                    }}
                    isFocused={this.state.index == 1}
                    ScrollY={this.scrollY}
                    albumes={this.props.UserAlbumes}
                    onAlbumePress={this.onAlbumePress.bind(this)}
                    width={Dimensions.get("window").width / 3}
                    scrollList={this.scrollList}
                    HEIGHT ={320}
                    isUser={0}
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
                }}>
                <View
                  style={{
                    justifyContent: "space-around",
                    width: "100%"
                  }}>
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
                      }}>
                      {this.renderAvatar()}
                    </View>

                    <Animated.View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        opacity: headerTextOpacity2
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row"
                        }}>
                        <View style={Styles.titleWithNumbersStyle}>
                          <Text>{followers_num}</Text>
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold"
                              }}>
                              Followers
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={Styles.titleWithNumbersStyle}>
                          <Text>{following_num}</Text>
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold"
                              }}>
                              Followings
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={Styles.titleWithNumbersStyle}>
                          <Text>{posts_num}</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold"
                            }}>
                            Posts
                          </Text>
                        </View>
                        <View style={Styles.titleWithNumbersStyle}>
                          <Text>{albumes_num}</Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold"
                            }}>
                            Albumes
                          </Text>
                        </View>
                      </View>
                    </Animated.View>
                  </View>
                  <View style={{ marginLeft: 16 }}>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        opacity: headerTextOpacity
                      }}>
                      Name:
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        transform: [
                          {
                            translateX: this.scrollY.interpolate({
                              inputRange: [0, 90, 200],
                              outputRange: [0, 60, 80],
                              extrapolate: "clamp"
                            })
                          },
                          {
                            translateY: this.scrollY.interpolate({
                              inputRange: [0, 30, 200],
                              outputRange: [0, 10, 115],
                              extrapolate: "clamp"
                            })
                          }
                        ]
                      }}>
                      {item.user.name}
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        opacity: headerTextOpacity
                      }}>
                      Email:
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        opacity: headerTextOpacity
                      }}>
                      {item.user.email}
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        opacity: headerTextOpacity
                      }}>
                      Website:
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        fontSize: 15,
                        opacity: headerTextOpacity
                      }}>
                      {item.user.website}
                    </Animated.Text>
                  </View>
                  <Animated.View
                    style={{
                      padding: 10,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      opacity: headerTextOpacity
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.followUser(user.user.id, item.user.id)
                      }
                      style={Styles.ButtonStyle}>
                      <Text style={Styles.ButtonTextStyle}>Follow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.ButtonStyle}>
                      <Text style={Styles.ButtonTextStyle}>Message</Text>
                    </TouchableOpacity>
                  </Animated.View>
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
  titleStyle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  titleWithNumbersStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor:'yellow'
  },
  containerStyle4: {
    padding: 5,
    backgroundColor: "#fff",
    position: "relative",
    justifyContent: "flex-start",
    flexDirection: "row"
    //backgroundColor: 'blue'
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
    width: 160,
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
  }
};

const mapStateToProps = ({ ProfileData, auth: user }) => {
  const UserAlbumes = ProfileData.ProfileAlbume;
  const UserPosts = ProfileData.ProfilePost;
  return { UserAlbumes, UserPosts, user };
};

export default connect(
  mapStateToProps,
  actions
)(ShowProfile);
