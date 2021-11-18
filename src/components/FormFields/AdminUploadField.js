import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { FormControl, FormHelperText } from "@material-ui/core";
import { Storage } from "aws-amplify";

export default function AdminUploadField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [uploadedFile, setUploadedFile] = useState("");
  const file = useState(null);

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  useEffect(() => {
    if (value){
      const { link }  = value;
      setUploadedFile(link);
    }
  }, [value]);

  async function s3Up(file) {
    const userid = await props.userid;
    const sectorid = await props.sectorid;
    const name = await props.name;
    var fileExtension = file.name.split(".").pop();
    const filename = `${userid}${sectorid}${name}.${fileExtension}`;
    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: await props.identityid,
      contentType: file.type,
    });
    return stored.key;
  }

  async function _onChange(event) {
    file.current = event.target.files[0];
    const newfile = file.current ? await s3Up(file.current) : null;
    setValue(newfile);
  }

  return (
    <FormControl error={isError}>
      <input
        type="file"
        {...field}
        {...props}
        value={uploadedFile || ""}
        onChange={_onChange}
      />
      {_renderHelperText()}
    </FormControl>
  );
}
