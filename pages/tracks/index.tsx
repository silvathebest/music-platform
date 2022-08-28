import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/action-creators/track";
import { useDispatch } from "react-redux";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch() as NextThunkDispatch;
  const { tracks, error } = useTypedSelector(state => state.track);
  const [query, setQuery] = useState<string>("");
  const [timer, setTimer] = useState(null);

  if (error) return <MainLayout><h1>{error}</h1></MainLayout>;

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(async () => await dispatch(await searchTracks(e.target.value)), 500));

  };

  return (
    <MainLayout title="Track list - Spotifyru">
      <Grid container justifyContent="center">
        <Card sx={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Track list</h1>
              <Button onClick={() => router.push("/tracks/create")}>Upload</Button>
            </Grid>
          </Box>
          <TextField label="Search" placeholder="Some track..." fullWidth value={query} onChange={search} />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(await fetchTracks());
});