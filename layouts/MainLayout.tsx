import React from "react";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title || "Spotifyru"}</title>
        <meta name="description"
              content={"Spotifyru - Here everyone can leave their track and become famous." + description} />
        <meta name="robots" content="index, follow" />
        <meta name="keyword" content={keywords || 'Music, rap, rock, track, track, artist'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container>
        {children}
      </Container>
      <Player />
    </>
  );
};

export default MainLayout;
