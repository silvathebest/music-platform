import { PlayerAction, PlayerActionTypes } from "../../types/player";
import { ITrack } from "../../types/track";

export const playTrack = (): PlayerAction => ({ type: PlayerActionTypes.PLAY });

export const pauseTrack = (): PlayerAction => ({ type: PlayerActionTypes.PAUSE });

export const setDurationTrack = (payload: number): PlayerAction => ({ type: PlayerActionTypes.SET_DURATION, payload });

export const setVolumeTrack = (payload: number): PlayerAction => ({ type: PlayerActionTypes.SET_VOLUME, payload });

export const setCurrentTimeTrack = (payload: number): PlayerAction => ({ type: PlayerActionTypes.SET_CURRENT_TIME, payload });

export const setActiveTrack = (payload: ITrack): PlayerAction => ({ type: PlayerActionTypes.SET_ACTIVE, payload });