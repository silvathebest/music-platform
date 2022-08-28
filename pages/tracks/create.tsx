import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import { Grid, Button, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");

  const next = () => {
    if (activeStep !== 2) setActiveStep((prevState) => prevState + 1);
    else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      axios.post("http://localhost:8080/tracks", formData).then(() => router.push("/tracks")).catch(console.error);
    }

  };

  const back = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction="column" sx={{ padding: 2 }}>
            <TextField {...name} sx={{ marginTop: 1 }} label="Name" />
            <TextField {...artist} sx={{ marginTop: 1 }} label="Artist" />
            <TextField {...text} sx={{ marginTop: 1 }} label="Track text" multiline rows={3} />
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Upload track picture</Button>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Upload track audio</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>Back</Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
