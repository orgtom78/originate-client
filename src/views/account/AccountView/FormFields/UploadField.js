import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import {
  Input,
  FormControl,
  FormHelperText
} from '@material-ui/core';
import { s3Upload } from "src/libs/awsLib.js";



export default function UploadField(props) {
    const [field, meta, helper] = useField(props);
    const { touched, error } = meta;
    const { setValue } = helper;
    const isError = touched && error && true;
    const { value } = field;
    const [uploadedFile, setUploadedFile ] = useState('');
    const file = useState(null);

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  useEffect(() => {
    if (value) {
      const { link } = value 
      setUploadedFile(link);
    }
  }, 
  [value]);
  
  async function _onChange(event) {
        file.current = event.target.files[0];
        const newfile = file.current ? await s3Upload(file.current) : null;
        setValue(newfile);
    }  

  return (
    <FormControl error={isError}>
      <Input 
      id="registration_cert_attachment"
        type="file"
        {...field}
          {...props}
          value={uploadedFile}
          onChange={_onChange}
      />
     {_renderHelperText()}
    </FormControl>
  );
}
