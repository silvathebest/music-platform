import React from "react";
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";

const TrackPage = () => {
  const track: ITrack = {
    _id: "1",
    text: "13",
    name: "Track1",
    artist: "123",
    audio: "123",
    comments: [],
    listens: 1,
    picture: "12312"
  };
  const router = useRouter();
  return (
    <MainLayout>
      <Button variant="outlined" sx={{ fontSize: 32 }} onClick={() => router.push("/tracks")}>
        To the list
      </Button>
      <Grid container sx={{ m: "20px 0" }}>
        <img src={track.picture} width={200} height={200} />
        <div style={{ marginLeft: 30 }}>
          <h1>Name {track.name}</h1>
          <h1>Artist {track.artist}</h1>
          <h1>Listens {track.listens}</h1>
        </div>
      </Grid>
      <h1>Track text</h1>
      <p>{track.text}</p>
      <h1>Comments</h1>
      <Grid container>
        <TextField label="Your name" fullWidth />
        <TextField label="Comment" multiline fullWidth rows={4} />
        <Button>Send</Button>
      </Grid>
      <div>
        {track.comments.map(comment =>
          <div>
            <div>Author: {comment.username}</div>
            <div>Comment: {comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;