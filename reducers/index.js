import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostsReducer from "./PostsReducer";
import UserReducer from "./UsersReducer";
import CommentsReducer from "./CommentsReducer";
import GetUsernameFromIdReducer from "./GetUsernameFromIdReducer";
import ProfileReducer from './ProfileReducer';
import PhotosOfAlbume from "./PhotosOfAlbume";
import AddPostReducer from './AddPostReducer';
import DeletePost from './DeletePostReducer';
import { persistReducer, persistCombineReducers } from "redux-persist";
import { AsyncStorage } from "react-native";
import AddAlbumeReducer from "./AddAlbumeReducer";
import GetAlbumeOfIdReducer from "./GetAlbumeOfIdReducer";
import AddPhotoReducer from "./AddPhotoReducer";
import UserProfileReducer from "./UserProfileReducer";

const authPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"]
};

export default persistCombineReducers(authPersistConfig,
  {
    auth: AuthReducer,
    user: GetUsernameFromIdReducer,
    posts: PostsReducer,
    users: UserReducer,
    comments: CommentsReducer,
    ProfileData: ProfileReducer,
    UserProfileData: UserProfileReducer,
    AlbumePhotos: PhotosOfAlbume,
    AddPostState : AddPostReducer,
    DeletePost : DeletePost,
    AddAlbumeState: AddAlbumeReducer,
    selectedAlbume: GetAlbumeOfIdReducer,
    albumePhoto: AddPhotoReducer
  }
);
