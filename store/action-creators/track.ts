import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "../../types/track";
import axios from "axios";

export const fetchTracks = () => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const { data } = await axios.get("http://localhost:8080/tracks");
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: data });
  } catch (e) {
    dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: "An error occurred while loading tracks" });
  }
};

export const searchTracks = (query: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const { data } = await axios.get("http://localhost:8080/tracks/search?query=" + query);
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: data });
  } catch (e) {
    dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: "An error occurred while loading tracks" });
  }
};