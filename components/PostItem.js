import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing
} from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { CardSection } from "./common";

const MAX_SCALE = 1;
const MIN_SCALE = 0.01;

class PostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedBody: false,
      isLiked: false,
      showBigHeart:false
    };
    this.renderLikePos = this.renderLikePos.bind(this);
    this.changeLikeState = this.changeLikeState.bind(this);
    this.likeByTap = this.likeByTap.bind(this);
    this.hasBeenLiked = this.hasBeenLiked.bind(this);
    this.likeAnimatedValue = new Animated.Value(0);
    this.bigHeartAnimatedValue = new Animated.Value(0);
  }

  componentWillMount(){
    this.hasBeenLiked();
  }

  _onDoubleTap = event => {
    if (event.nativeEvent.state === State.END) {
      !this.state.isLiked && this.likeByTap();
      this.showBigHeart();
    }
  };

  renderImage(){
    if (this.props.post.image) {
      return (
        <TapGestureHandler 
        maxDurationMs={200} 
        numberOfTaps={2} 
        onHandlerStateChange={this._onDoubleTap}>
          <Image
            style={Styles.imageStyle}
            source={{ uri: this.props.post.image }}
          />
        </TapGestureHandler>
      );
    }
  };

  likeByTap(){
      Animated.timing(this.likeAnimatedValue, {
        toValue: 10,
        duration: 300,
        easing: Easing.out(Easing.back(4))
      }).start();
      this.setState({isLiked: true});
      this.props.LikePost(this.props.post.id, this.props.user.id);
  }

  hasBeenLiked(){
    const {user, post} = this.props;
    if(post.likers && post.likers.includes(user.id)){
      this.setState({isLiked: true});
    }
  }

  showBigHeart(){
    Animated.sequence([
      Animated.timing(this.bigHeartAnimatedValue,{
        toValue: 10,
        duration: 250,
      }),
      Animated.timing(this.bigHeartAnimatedValue,{
        toValue: 0,
        delay: 200,
        duration: 250
      })
    ]).start();
  }

  renderAvatar() {
    const { post } = this.props;
    if (post.user.avatar) {
      return (
        <Image source={{ uri: post.user.avatar }} style={Styles.avatarStyle} />
      );
    } else {
      return (
        <Image
          style={Styles.avatarStyle}
          source={require("../Images/download.png")}
        />
      );
    }
  }

  renderLikePos() {
    return (
      <View>
        <Animated.Image
          style={{
            height: 20,
            width: 20,
            alignSelf: "center",
            transform:[
              {
                scale: (this.state.isLiked)?(MAX_SCALE):(this.likeAnimatedValue.interpolate({
                  inputRange: [0, 10],
                  outputRange: [0.01, 1]
                }))
              }
            ]
          }}
          source={require("../Images/like_filled.png")}
        />
        <Animated.Image
          style={{
            height: 20,
            width: 20,
            position: "absolute",
            marginLeft: 5,
            transform: [
              {
                scale: (this.state.isLiked)?(MIN_SCALE):(this.likeAnimatedValue.interpolate({
                  inputRange: [0, 10],
                  outputRange: [1, 0.01]
                }))
              }
            ]
          }}
          source={require("../Images/like.png")}
        />
      </View>
    );
  }

  renderBody() {
    if (this.state.expandedBody)
      return (
        <CardSection>
          <Text>{this.props.post.body}</Text>
        </CardSection>
      );
    this.setState({ expandedBody: !this.state.expandedBody });
  }

  changeLikeState() {
    if (this.state.isLiked) {
      Animated.timing(this.likeAnimatedValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.back(4))
      }).start();
      this.props.UnlikePost(this.props.post.id, this.props.user.id);
    } else {
      Animated.timing(this.likeAnimatedValue, {
        toValue: 10,
        duration: 300,
        easing: Easing.out(Easing.back(4))
      }).start();
      this.props.LikePost(this.props.post.id, this.props.user[0].id);
    }
    this.setState({ isLiked: !this.state.isLiked });
  }

  render() {
    const { title, user } = this.props.post;
    return (
      <View style={Styles.containerAllStyle}>
        <CardSection>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>{title}</Text>
        </CardSection>
        <View style={{ flex: 1 }}>{this.renderImage()}</View>
        <View style={{position: 'absolute', zIndex:100}}>
          <Animated.Image
            source={require("../Images/like_filled.png")}
            style={{
              width: 80,
              height: 80,
              marginTop:80,
              marginLeft:120,
              transform:[{
                scale: this.bigHeartAnimatedValue.interpolate({
                  inputRange:[0,10],
                  outputRange:[0.01,1]
                })
              }]
            }}
          />
        </View>
        <CardSection>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              //justifyContent:'center',
              alignItems: "center",
              //backgroundColor: 'pink'
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.onUsernamePress(this.props.post)}
              style={Styles.ProStyle}
            >
              <Image style={Styles.avatarStyle} source={{ uri: user.avatar }} />
              <Text style={Styles.textStyle}>{user.username}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems:'center',
                alignSelf:'center',
                margin:5,
                marginTop: 14
              }}
              onPress={() => this.changeLikeState()}
            >
              {this.renderLikePos()}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.onCommentPress(this.props.post)}
              style={Styles.containerStyle}
            >
              <Text style={Styles.ButtonStyle}>Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.containerStyle2}
              title="More"
              onPress={() => this.setState({expandedBody: ! this.state.expandedBody})}
            >
              <Text style={Styles.ButtonStyle}>More</Text>
            </TouchableOpacity>
          </View>
        </CardSection>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containerStyle: {
    width: 80,
    height: 25,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#737171",
    borderRadius: 22,
    overflow: "hidden",
    marginRight: 5
  },
  containerStyle2: {
    width: 50,
    height: 25,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#737171",
    borderRadius: 22,
    overflow: "hidden",
    marginRight: 5
  },
  containerAllStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 24,
    shadowColor: "#000",
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 1,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10,
    overflow:'hidden'
  },
  textStyle: {
    color: "#000",
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10
  },
  ButtonStyle: {
    color: "#737171",
    fontSize: 13,
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5
  },
  imageStyle: {
    flex: 1,
    height: 160
  },
  avatarStyle: {
    width: 31,
    height: 31,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 15,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16
  },
  ProStyle: {
    flex: 1,
    flexDirection: "row"
  },
  expandedStyle: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2,
    shadowColor: "#000",
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FFF"
  }
});

export default PostItem;
