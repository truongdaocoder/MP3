import { combineReducers } from "redux";
import appReducer from "./appReducer";
import musicReducer from "./musicReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel2,
};
const persistConfig = {
  ...commonConfig,
  key: "music",
  whilelist: ["curSongId"],
  blacklist: ["isPlaying", "songs"],
};
const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(persistConfig, musicReducer),
});
export default rootReducer;
