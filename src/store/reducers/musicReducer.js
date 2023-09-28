import actionTypes from "../action/actions";
const initialState = {
  curSongId: null,
  isPlaying: false,
  songs: null,
};
const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    default:
      return state;
  }
};
export default musicReducer;
