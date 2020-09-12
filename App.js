import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ShowComments from "./components/ShowComments";
import ShowProfile from "./components/ShowProfile";
import ShowPhotos from "./components/ShowPhotos";
import EditProfilePage from "./components/EditProfilePage";
import Explore from "./components/Explore";
import Feed from "./components/Feed";
import First from "./components/First";
import Profile from "./components/Profile";
import AddPost from "./components/Add";
import AddAlbume from "./components/AddAlbume";
import AddPhoto from "./components/AddPhoto";
import AddPhotoTitle from "./components/AddPhotoTitle";
import createStore from "./store";

const { store, persistor } = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Feed: Feed,
    Explore: Explore,
    Profile: Profile,
    AddPost: {
      screen: AddPost,
      navigationOptions: {
        header: null,
        headerMode: "none",
        tabBarVisible: false
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#202020",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: 15,
        fontWeight: "bold"
      }
    }
  }
);

const AppNav = createStackNavigator(
  {
  First: First
  }
  // {
  //   SignUp: SignUp,
  //   Login: Login,
  //   Home: TabNavigator,
  //   ShowComments: ShowComments,
  //   ShowProfile: ShowProfile,
  //   ShowPhotos: ShowPhotos,
  //   EditProfile: EditProfilePage,
  //   AddAlbume: AddAlbume,
  //   AddPhoto: AddPhoto,
  //   AddPhotoTitle: AddPhotoTitle
  // },
  // {
  //   headerVisible: false,
  //   headerMode: "none",
  //   header: null,
  //   initialRouteName: "SignUp"
  // }
);

const AppContainer = createAppContainer(AppNav);

export default App;
