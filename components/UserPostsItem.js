import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { CardSection, Card, Confirm } from "./common";
import { Ionicons } from "@expo/vector-icons";

class UserPostsItem extends Component {
  constructor(props) {
    super(props);
    this.renderDeleteIcon = this.renderDeleteIcon.bind(this);
    this.state = {
      showModal: false
    };
  }

  renderImage() {
    return (
      <Image
        style={Styles.imageStyle}
        source={{ uri: this.props.postt.image }}
      />
    );
  }

  renderDeleteIcon() {
    return (
      <View style={{ alignSelf: "flex-end" }}>
        <Ionicons
          name="md-trash"
          size={23}
          onPress={() => this.setState({ showModal: true })}
        />
      </View>
    );
  }

  render() {
    const { postt, onAccept } = this.props;
    return (
      <Card>
        <CardSection>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {postt.title}
          </Text>
          <View style={{ flex: 1 }}>
            {!!this.props.isUser && this.renderDeleteIcon()}
          </View>
        </CardSection>
        <View style={{ flex: 1 }}>{!!postt.image && this.renderImage()}</View>
        <CardSection>
          <Text>{postt.body}</Text>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={() => {
            onAccept(postt.id);
            this.props.refreshPosts();
            this.setState({ showModal: false });
          }}
          onDecline={() => this.setState({ showModal: false })}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const Styles = {
  imageStyle: {
    flex: 1,
    height: 190
  }
};

export default UserPostsItem;
