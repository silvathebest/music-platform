import React from "react";
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";

interface TrackItemProps {
  track: ITrack,
  active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const router = useRouter();
  const { playTrack, setActiveTrack } = useActions();
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };
  return (
    <Card className={styles.track} onClick={() => router.push("/tracks/" + track._id)}>
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img
        width={70}
        height={70}
        src={"http://localhost:8080/" + track.picture}
        alt={`Music: ${track.artist} - ${track.name}`
        }
      />
      <Grid container direction="column" style={{ width: 200, margin: "0 20px" }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && <div>02:24 / 03:22</div>}
      <IconButton onClick={e => e.stopPropagation()} sx={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;
