import { ADD_ARTISTS, SET_ARTISTS } from "../utils/constants";

const artistsReducer = (state = {}, action) => {
    const { artists } = action
    switch (action.type) {
      case ADD_ARTISTS:
        return {
          ...state,
          next: artists.next,
          items: [ ...state.items, ...artists.items]
        }
      case SET_ARTISTS:
        console.log(action)
        return artists
      default:
        return state;
    }
  };
  export default artistsReducer;