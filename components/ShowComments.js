import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import { Header, Spinner } from './common';
import CommentItem from "./CommentItem";
import * as CommentActions from "../actions/CommentsAction";
import * as PostActions from "../actions/PostsActions";
import { TouchableOpacity } from "react-native-gesture-handler";

class ShowComments extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFlatlist = this.renderFlatlist.bind(this);
    this.state = {
      showFlatlist: false,
      body: "",
      email: props.CurrentUser.email,
      postId: props.navigation.state.params.SelectedItem.id
    };
  }

  componentWillMount() {
    this.props.getComments(this.props.navigation.state.params.SelectedItem.id).then(
      ()=>{
        this.setState({showFlatlist: true});
      }
    );
  }

  static navigationOptions = {
    title: "Comments"
  };

  renderItem({ item }) {
    return <CommentItem comment={item}/>;
  }
  renderHeader() {
    const { user, body } = this.props.navigation.state.params.SelectedItem;
    return (
      <View style={Styles.headerContainerStyle}>
        <Image
          source={{
            uri: user.avatar
          }}
          style={{
            width: 40,
            height: 40,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 20,
            margin: 5
          }}
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold"
            }}
          >
            {user.username}
          </Text>
          <Text style={{ flex: 1 }}>{body}</Text>
        </View>
      </View>
    );
  }

  renderFlatlist(){
    return(
      <FlatList
        ref={"flatlist"}
        data={this.props.comments}
        style={{ flex: 1, backgroundColor: "#F4F3F3FF" }}
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderItem.bind(this)}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

  render() {
    const { body, postId, email } = this.state;
    const {
      PostComment,
      getComments,
      CurrentUser,
      navigation: {
        state: {
          params: {
            SelectedItem: { id: selectedUserId }
          }
        }
      }
    } = this.props;
    return (
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior={"position"}
        style={{ flex: 1, backgroundColor: "#F4F3F3FF" }}
      >
        <View style={{ flex: 1 }}>
        <Header headerText="Comments"/>
          {this.state.showFlatlist && this.renderFlatlist()}
          <View style={Styles.containerStyle}>
            <Image
              source={{ uri: CurrentUser.avatar }}
              style={{
                width: 40,
                height: 40,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 20,
                marginLeft: 5
              }}
            />
            <TextInput
              autoCorrect={false}
              multiline
              placeholder={`Comment as ${CurrentUser.username}`}
              style={Styles.inputStyle}
              value={this.state.body}
              onChangeText={comment => {
                this.setState({ body: comment });
              }}
            />
            <TouchableOpacity
              onPress={() =>
                PostComment(
                  body,
                  CurrentUser.id,
                  postId,
                  email,
                  CurrentUser.avatar
                ).then(() => {
                  getComments(selectedUserId).then(() => {
                    setTimeout(() => {
                      this.refs.flatlist.scrollToEnd();
                    }, 500);
                  });

                  this.setState({ body: "" });
                  Keyboard.dismiss();
                })
              }
              style={{ margin: 8 }}
            >
              <Text>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const Styles = {
  inputStyle: {
    fontSize: 15,
    color: "#000",
    lineHeight: 23,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    width: 60,
    margin: 10
  },
  containerStyle: {
    borderColor: "black",
    borderBottomWidth: 1,
    minHeight: 54,
    maxHeight: 100,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#ddd",
    borderTopWidth: 1
  },
  headerContainerStyle: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#ddd"
  }
};

const mapStateToProps = ({ comments:{comments, isLoading}, auth , user}) => {
  return { comments, isLoading, CurrentUser: auth.user, user };
};

export default connect(
  mapStateToProps,
  {
    getComments: CommentActions.getComments,
    PostComment: CommentActions.PostComment,
    getUsernameFromId: PostActions.getUsernameFromId
  }
)(ShowComments);
