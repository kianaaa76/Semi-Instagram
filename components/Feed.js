import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, FlatList } from "react-native";
import { Spinner } from "./common";
import FeedHeader from './FeedHeader';
import { getPostsOfFollowings } from "../actions/PostsActions";
import { LikePost, UnlikePost } from "../actions/LikesAction";
import { logoutUser } from "../actions/AuthActions";
import PostItem from "./PostItem";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
  }
  componentWillMount() {
    this.props.getPostsOfFollowings(this.props.user.id);
  }

  onUsernamePress(item) {
    this.props.navigation.navigate("ShowProfile", {
      SelectedItem: item,
      user: this.props.user
    });
  }


  onCommentPress(item) {
    this.props.navigation.navigate("ShowComments", { SelectedItem: item });
  }

  renderItem({ item }) {
    return (
      <View style={Styles.containerStyle2}>
        <PostItem
          user={this.props.user}
          post={item}
          onUsernamePress={item => this.onUsernamePress(item)}
          onCommentPress={item => this.onCommentPress(item)}
          LikePost={this.props.LikePost}
          UnlikePost={this.props.UnlikePost}
        />
      </View>
    );
  }
  renderEmptyComponent() {
    return (
      <View style={Styles.containerStyle}>
        <Text style={Styles.textStyle}>No Followings Yet?!</Text>
        <Text style={Styles.textStyle}>Go to Explore</Text>
      </View>
    );
  }

  onLogoutPress(){
    this.props.logoutUser();
    this.props.navigation.replace('Login');
  }

  render() {
    const { isLoading, posts } = this.props;
    return isLoading ? (
      <Spinner size="large" />
    ) : (
      <View style={{flex:1}}>
      <FeedHeader onLogoutPress={this.onLogoutPress}/>
      <FlatList
        style={{ flex: 1 }}
        data={posts}
        ListEmptyComponent={this.renderEmptyComponent()}
        renderItem={this.renderItem}
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
    marginTop: 280
  },
  textStyle: {
    color: "#808080",
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center"
  },
  containerStyle2: {
    backgroundColor: "#F4F3F3FF"
  }
}

mapStateToProps = ({
  posts: { postsOfFollowing, loading, error },
  auth: { user }
}) => {
  return {
    user,
    posts: postsOfFollowing,
    isLoading: loading,
    error
  };
};

export default connect(
  mapStateToProps,
  { getPostsOfFollowings, LikePost, UnlikePost , logoutUser}
)(Feed);
