import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, FlatList } from "react-native";
import {Spinner, Header} from './common';
import { getPosts } from "../actions/PostsActions";
import {LikePost, UnlikePost} from '../actions/LikesAction';
import PostItem from "./PostItem";

class HomePage extends Component {
  static navigationOptions = ({ navigation }) => {
    na = navigation;
    return {
      title: "Explore"
    };
  };

  componentWillMount() {
    this.props.getPosts();
  }

  onUsernamePress(item) {
    this.props.navigation.navigate("ShowProfile", {
      SelectedItem: item,
      user: this.props.navigation.state.params.user
    });
  }

  onCommentPress(item) {
    this.props.navigation.navigate("ShowComments", { SelectedItem: item });
  }

  renderItem = ({ item }) => {
    return (
      <View style={Styles.containerStyle}>
        <PostItem
          user={this.props.user}
          post={item}
          onUsernamePress={item => this.onUsernamePress(item)}
          onCommentPress={item => this.onCommentPress(item)}
          LikePost = {this.props.LikePost}
          UnlikePost = {this.props.UnlikePost}
        />
      </View>
    );
  };

  render() {
    const { isLoading, posts } = this.props;
    return isLoading ? (
      <Spinner size="large" />
    ) : (
      <View style={{ flex: 1 }}>
        <Header headerText="Explore"/>
        <FlatList
          data={posts}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const Styles = {
  containerStyle: {
    backgroundColor: "#F4F3F3FF"
  }
};

const mapStateToProps = ({ posts:{posts, loading}, auth:{user}}) => {
  return { posts, isLoading: loading , user};
};

export default connect(
  mapStateToProps,
  { getPosts , LikePost, UnlikePost}
)(HomePage);
