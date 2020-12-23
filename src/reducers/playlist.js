import { ADD_PLAYLIST, SET_PLAYLIST } from "../utils/constants";

const playlistReducer = (state = {}, action) => {
    const { playlists } = action
    switch (action.type) {
      case ADD_PLAYLIST:
        return {
          ...state,
          next: playlists.next,
          items: [...state.items, ...playlists]
        }
      
      case SET_PLAYLIST:
          return playlists
      default:
        return state;
    }
  };
  export default playlistReducer;