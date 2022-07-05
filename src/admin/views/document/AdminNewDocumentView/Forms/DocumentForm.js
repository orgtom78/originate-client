import React, { useEffect, useState } from "react";
import { SelectField } from "src/components/FormFields";
import AdminUploadField from "src/components/FormFields/AdminUploadField";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";

const type = [
  {
    value: "Company Credit Report",
    label: "Company Credit Report",
  },
  {
    value: "Industry Report",
    label: "Industry Report",
  },
  {
    value: "RPA",
    label: "RPA",
  },
  {
    value: "RAA",
    label: "RAA",
  },
  {
    value: "IPU",
    label: "IPU",
  },
  {
    value: "Servicing Agreement",
    label: "Servicing Agreement",
  },
];

const useStyles = makeStyles(() => ({
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: "auto",
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function DocumentForm(props, value) {
  const classes = useStyles();
  const {
    formField: { document_type, document_attachment },
  } = props;

  const id = props.user;
  const buyid = props.buyer;
  const ident = props.value;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const document_update = updatefields.values.document_attachment;

  const [docimg, setDocimg] = useState("");
  const [docpdf, setDocpdf] = useState("");

  const [docloading, setDocloading] = useState(false);
  const [docsuccess, setDocsuccess] = useState(false);

  useEffect(() => {
    if (document_update) {
      async function geturl() {
        var uploadext = document_update.split(".").pop();
        var imageExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const u = await Storage.get(document_update, {
            level: "private",
            identityId: ident,
          });
          setDocimg(u);
        } else {
          const h = await Storage.get(document_update, {
            level: "private",
            identityId: ident,
          });
          setDocpdf(h);
        }
      }
      geturl();
    }
  }, [document_update, ident]);

  async function handledocClick() {
    setDocsuccess(false);
    setDocloading(true);
    const b = await document_update;
    if (b) {
      setDocsuccess(true);
      setDocloading(false);
    }
  }

  function docisimageorpdf() {
    if (docimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={docimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={docpdf}
          />
        </>
      );
    }
  }

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SelectField
                name={document_type.name}
                label={document_type.label}
                data={type}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              {document_update ? (
                <>{docisimageorpdf()}</>
              ) : (
                <>
                  <AdminUploadField
                    identityid={ident}
                    name={document_attachment.name}
                    id={document_attachment.name}
                    accept="image/*, application/pdf"
                    style={{ display: "none" }}
                    userid={id}
                    sectorid={buyid}
                  />
                  <label htmlFor={document_attachment.name}>
                    <LoaderButton
                      id={document_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={docloading}
                      success={docsuccess}
                      loading={docloading}
                      onClick={handledocClick}
                    >
                      {" "}
                      Document upload
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
