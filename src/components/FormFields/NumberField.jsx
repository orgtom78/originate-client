import React, { useState, useEffect } from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@mui/material";
import NumberFormat from "react-number-format";

export default function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { value } = field;
  const { setValue } = helper;

  console.log(field)

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <NumberFormat
      customInput={TextField}
      thousandSeparator={true}
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      onValueChange={(values) => {
        const { formattedValue, value } = values;
        setValue(value);
      }}
      {...field}
      {...rest}
    />
  );
}
