import React, { useState, useEffect, useRef } from "react";
import "date-fns";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Upload as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import { useUser } from 'src/components/usercontext.js';
import { Storage } from "aws-amplify"; 
import { s3Upload } from "src/libs/awsLib.js";

const useStyles = makeStyles(() => ({
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  root: {},
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

function CompanyUploads(){
  const classes = useStyles();
  const [sub, setSub] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [registration_cert_attachment, setRegistration_cert_attachment] = useState("");
  const context = useUser();

  const [uploadedFile, setUploadedFile ] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [img, setImg ] = useState('');
  const file = useRef(null);

  useEffect(() => {
    async function onLoad() {
      const data = await context;
        const {
          sub,
          companyId, 
          registration_cert_attachment } = data;
          setSub(sub);
          setCompanyId(companyId);
          setRegistration_cert_attachment(registration_cert_attachment);
          const z = await Storage.vault.get(registration_cert_attachment)
          console.log(z)
          setImg(z)
      } onLoad()
  }, [context]);

  function updateCompany(input) {
    return API.graphql(
      graphqlOperation(mutations.updateCompany, { input: input })
    );
  }

  useEffect(() => {
    if (uploadedFile) {
      async function geturl () { 
        const u = await Storage.vault.get(uploadedFile);
        setImg(u);
        setRegistration_cert_attachment(uploadedFile);
      }; geturl();
    }
  },[uploadedFile]);

function handleFileChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteold();
    onChange(a);
  }

async function deleteold(){
  await Storage.vault.remove(registration_cert_attachment);
}

async function onChange(a) {
  setSuccess(false);
  setLoading(true);
  try {
    const u = a ? await s3Upload(a) : null;
    setUploadedFile(u);
    var registration_cert_attachment = u;
    console.log(registration_cert_attachment)
    const sortkey = companyId;
    const userId = sub; 
    await updateCompany({
      sortkey,
      userId,
      registration_cert_attachment
    });
  } catch (e) {
    onError(e);
  }
  setSuccess(true);
  setLoading(false);
}

console.log(uploadedFile)

  async function handleClick(){
      setSuccess(false);
      setLoading(true);
      const b = await img;
      if (b) {
        setSuccess(true);
        setLoading(false);
      }
    }
  

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Company Documents</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <Card>
              <Grid item xs={6}>
            {img ?  
            
            (
              <>
              <Typography>Company Registration Certificate:</Typography>
              <img className={classes.img} alt="complex" src={img}/>
              <div>
              <input
                id='registration_cert_attachment'
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                type="file"
                onChange={handleFileChange}        
              />
              <label htmlFor="registration_cert_attachment">
              <LoaderButton
                id="registration_cert_attachment"
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={loading}
                success={success}
                loading={loading}
              >
                {" "}
                Update File 
              </LoaderButton>
              </label>
              </div>
              </>
            )   :    

             (
              <>
              <input
                name = 'registration_cert_attachment'
                accept="image/*,application/pdf"
                style={{ display: 'none' }}
                type="file"
              />
              <label htmlFor="registration_cert_attachment">
              <LoaderButton
                id="registration_cert_attachment"
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={loading}
                success={success}
                loading={loading}
                onClick={handleClick}
              >
                {" "}
                Company registration certificate*
              </LoaderButton>
              </label>
              </>
              ) 
              }
            </Grid>
              </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

export default CompanyUploads;
