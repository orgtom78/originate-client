import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";


export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const date = moment(value).utc().startOf("day");
      setSelectedDate(date);
    }
  }, [value]);

  function _onChange(date) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          autoOk
          {...field}
          {...props}
          value={selectedDate}
          onChange={_onChange}
          onAccept={_onChange}
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </LocalizationProvider>
    </Grid>
  );
}
