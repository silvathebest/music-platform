import React, { useEffect } from "react";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

let audio;

const Player = () => {
  const { pause, active, volume, currentTime, duration } = useTypedSelector(state => state.player);
  const { pauseTrack, playTrack, setVolumeTrack, setCurrentTimeTrack, setDurationTrack } = useActions();
  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };
  useEffect(() => {
    if (!audio) audio = new Audio;
    else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (!active) return;
    audio.src = "http://localhost:8080/" + active.audio;
    audio.volume = volume / 100;
    audio.onloadedmetadata = () => {
      setDurationTrack(Math.ceil(audio.duration));
    };
    audio.ontimeupdate = () => {
      setCurrentTimeTrack(Math.ceil(audio.currentTime));
    };
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolumeTrack(Number(e.target.value));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTimeTrack(Number(e.target.value));
  };

  if (!active) return <></>;

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {!pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: "0 20px" }}>
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: "auto" }} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};

export default Player;
