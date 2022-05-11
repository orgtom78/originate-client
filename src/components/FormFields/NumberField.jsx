import React, { useState, useEffect } from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@mui/material";
import NumberFormat from "react-number-format";

export default function InputField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;

  const handleChange = (event) => {
    console.log(event.target)
    const t = event.floatValue;
    console.log(t)
    setValue(Number(event.floatValue));
  };

  return (
    <NumberFormat
    {...field}
    {...props}
      error={isError}
      invalidDateMessage={isError && error}
      helperText={isError && error}
      customInput={TextField}
      thousandSeparator={true}
      onValueChange={handleChange}
    />
  );
}
