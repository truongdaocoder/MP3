import actionTypes from "./actions";
export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});
export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});
export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});
