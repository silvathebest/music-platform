import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { ITrack } from "../../types/track";
import TrackList from "../../components/TrackList";

const Index = () => {
  const router = useRouter();
  const tracks: ITrack[] = [
    { _id: "1", text: "13", name: "Track1", artist: "123", audio: "123", comments: [], listens: 1, picture: "12312" }
  ];

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card sx={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Track list</h1>
              <Button onClick={() => router.push("/tracks/create")}>Upload</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;