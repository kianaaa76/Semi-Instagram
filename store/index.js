import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import ReduxThunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import reducers from "../reducers";


export default () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  const persistor = persistStore(store);
  return { store, persistor };
};
