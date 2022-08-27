import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import { Grid, Button, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const next = () => {
    if (activeStep === 2) return;
    setActiveStep((prevState) => prevState + 1);
  };

  const back = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction="column" sx={{ padding: 2 }}>
            <TextField sx={{ marginTop: 1 }} label="Name" />
            <TextField sx={{ marginTop: 1 }} label="Artist" />
            <TextField sx={{ marginTop: 1 }} label="Track text" multiline rows={3} />
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
