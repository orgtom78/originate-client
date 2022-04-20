import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { Box, Grid, Slider, Typography } from "@mui/material";
import MuiInput from '@mui/material/Input';
import { styled } from "@mui/material/styles";

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedPercentage, setSelectedPercentage] = useState(0);

  useEffect(() => {
    if (value) {
      const percentage = value;
      setSelectedPercentage(percentage);
    }
  }, [value]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };


  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {props.label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <Slider
          {...field}
          {...props}
          value={
            typeof selectedPercentage === "number" ? selectedPercentage : 0
          }
          onChange={handleSliderChange}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          aria-labelledby="input-slider"
        />
      </Grid>
      <Grid item>
        <Input
          value={selectedPercentage}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          inputProps={{
            step: 5,
            min: 0,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Grid>
    </Grid>
    </Box>
  );
}
