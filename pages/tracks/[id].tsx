import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { ITrack } from "../../types/track";

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");

  const addComment = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/tracks/comment", {
        username: username.value,
        text: text.value,
        trackId: track._id
      });
      setTrack({ ...track, comments: [...track.comments, data] });
    } catch (e) {
      console.error(e);
    }

  };

  return (
    <MainLayout title={`Spotifyru - ${track.name} - ${track.artist}`}
                keywords={`Music, artist, ${track.name}, ${track.artist}`}>
      <Button variant="outlined" sx={{ fontSize: 32 }} onClick={() => router.push("/tracks")}>
        To the list
      </Button>
      <Grid container sx={{ m: "20px 0" }}>
        <img
          alt={`Music: ${track.artist} - ${track.name}`}
          src={"http://localhost:8080/" + track.picture}
          width={200}
          height={200}
        />
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
        <TextField {...username} label="Your name" fullWidth />
        <TextField {...text} label="Comment" multiline fullWidth rows={4} />
        <Button onClick={addComment}>Send</Button>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get("http://localhost:8080/tracks/" + params.id);
  return {
    props: {
      serverTrack: data
    }
  };
};