import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "date-fns";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Upload as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import { Storage } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

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

function BrokerUploads(value) {
  const classes = useStyles();
  const navigate = useNavigate();
  //const [sub, setSub] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [
    broker_registration_cert_attachment,
    setBroker_registration_cert_attachment,
  ] = useState("");
  const [
    broker_shareholder_list_attachment,
    setBroker_shareholder_list_attachment,
  ] = useState("");
  const [
    broker_director_list_attachment,
    setBroker_director_list_attachment,
  ] = useState("");
  const [
    broker_articles_of_association_attachment,
    setBroker_articles_of_association_attachment,
  ] = useState("");
  const [regcertloading, setRegcertLoading] = useState(false);
  const [regcertsuccess, setRegcertSuccess] = useState(false);
  const [shareholderlloading, setShareholderlLoading] = useState(false);
  const [shareholderlsuccess, setShareholderlSuccess] = useState(false);
  const [directorlloading, setDirectorlLoading] = useState(false);
  const [directorlsuccess, setDirectorlSuccess] = useState(false);
  const [aoaloading, setAoaLoading] = useState(false);
  const [aoasuccess, setAoaSuccess] = useState(false);
  const [regcertimg, setRegcertImg] = useState("");
  const [regcertpdf, setRegcertpdf] = useState("");
  const [shareholderlimg, setShareholderlImg] = useState("");
  const [shareholderlpdf, setShareholderlpdf] = useState("");
  const [directorlimg, setDirectorlImg] = useState("");
  const [directorlpdf, setDirectorlpdf] = useState("");
  const [aoaimg, setAoaImg] = useState("");
  const [aoapdf, setAoapdf] = useState("");

  const file = useRef(null);

  const regcertlabel = "broker_registration_cert_attachment";
  const regcertname = "Registration Certificate";
  const shareholderllabel = "broker_shareholder_list_attachment";
  const shareholderlname = "Broker Shareholder List";
  const directorllabel = "broker_director_list_attachment";
  const directorlname = "Broker Director List";
  const aoalabel = "broker_articles_of_association_attachment";
  const aoaname = "Broker Articles of Association";

  useEffect(() => {
    const id = value.value.value;
    getBroker({ id });
  }, [value.value.value]);

  async function getBroker(input) {
    try {
      const broker = await API.graphql(
        graphqlOperation(queries.getBroker, input)
      );
      const {
        data: {
          getBroker: {
            identityId,
            //userId,
            brokerId,
            broker_registration_cert_attachment,
            broker_shareholder_list_attachment,
            broker_director_list_attachment,
            broker_articles_of_association_attachment,
          },
        },
      } = broker;
      //setSub(userId);
      setBrokerId(brokerId);
      setIdentityId(identityId);
      setBroker_registration_cert_attachment(
        broker_registration_cert_attachment
      );
      setBroker_shareholder_list_attachment(
        broker_shareholder_list_attachment
      );
      setBroker_director_list_attachment(broker_director_list_attachment);
      setBroker_articles_of_association_attachment(
        broker_articles_of_association_attachment
      );
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function s3Up(file, filenames) {
    const name = filenames;
    var fileExtension = file.name.split(".").pop();
    const filename = `${brokerId}${identityId}${name}.${fileExtension}`;

    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  function updateBroker(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBroker, { input: input })
    );
  }

  useEffect(() => {
    if (broker_registration_cert_attachment) {
      async function getregcertimgurl() {
        var uploadext = broker_registration_cert_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(broker_registration_cert_attachment, {
            level: "private",
            identityId: identityId,
          });
          setRegcertImg(y);
        }
      }
      getregcertimgurl();
    }
  }, [broker_registration_cert_attachment, identityId]);

  useEffect(() => {
    if (broker_registration_cert_attachment) {
      async function getregcertpdfurl() {
        var uploadext = broker_registration_cert_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(broker_registration_cert_attachment, {
            level: "private",
            identityId: identityId,
          });
          setRegcertpdf(y);
        }
      }
      getregcertpdfurl();
    }
  }, [broker_registration_cert_attachment, identityId]);

  function regcertisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(regcertimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={regcertimg} />
          <div>
            <input
              id={regcertimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleregcertChange(event)}
            />
            <label htmlFor={regcertimg}>
              <LoaderButton
                id={regcertimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={regcertloading}
                success={regcertsuccess}
                loading={regcertloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(regcertpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={regcertpdf}
          />
          <div>
            <input
              id={regcertpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleregcertChange(event)}
            />
            <label htmlFor={regcertpdf}>
              <LoaderButton
                id={regcertpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={regcertloading}
                success={regcertsuccess}
                loading={regcertloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleregcertChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={regcertloading}
              success={regcertsuccess}
              loading={regcertloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleregcertChange(event) {
    file.current = event.target.files[0];
    const newregcertfile = file.current;
    onregcertChange(newregcertfile);
  }

  async function onregcertChange(newfile) {
    setRegcertSuccess(false);
    setRegcertLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'broker_registration_cert_attachment') : null;
      var broker_registration_cert_attachment = u;
      const id= value.value.value;
      await updateBroker({
        id,
        broker_registration_cert_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setRegcertSuccess(true);
    setRegcertLoading(false);
    navigate(`/admin/broker/${value.value.value}`);
  }

  useEffect(() => {
    if (broker_shareholder_list_attachment) {
      async function getshareholderlistimgurl() {
        var uploadext = broker_shareholder_list_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(broker_shareholder_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setShareholderlImg(y);
        }
      }
      getshareholderlistimgurl();
    }
  }, [broker_shareholder_list_attachment, identityId]);

  useEffect(() => {
    if (broker_shareholder_list_attachment) {
      async function getshareholderlistpdfurl() {
        var uploadext = broker_shareholder_list_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(broker_shareholder_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setShareholderlpdf(y);
        }
      }
      getshareholderlistpdfurl();
    }
  }, [broker_shareholder_list_attachment, identityId]);

  function shareholderlisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(shareholderlimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={shareholderlimg} />
          <div>
            <input
              id={shareholderlimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleshareholderlChange(event)}
            />
            <label htmlFor={shareholderlimg}>
              <LoaderButton
                id={shareholderlimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={shareholderlloading}
                success={shareholderlsuccess}
                loading={shareholderlloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(shareholderlpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={shareholderlpdf}
          />
          <div>
            <input
              id={shareholderlpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleshareholderlChange(event)}
            />
            <label htmlFor={shareholderlpdf}>
              <LoaderButton
                id={shareholderlpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={shareholderlloading}
                success={shareholderlsuccess}
                loading={shareholderlloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleshareholderlChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={shareholderlloading}
              success={shareholderlsuccess}
              loading={shareholderlloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleshareholderlChange(event) {
    file.current = event.target.files[0];
    const newshareholderlfile = file.current;
    onshareholderlChange(newshareholderlfile);
  }

  async function onshareholderlChange(newfile) {
    setShareholderlSuccess(false);
    setShareholderlLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'broker_shareholder_list_attachment') : null;
      var broker_shareholder_list_attachment = u;
      const id= value.value.value;
      await updateBroker({
        id,
        broker_shareholder_list_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setShareholderlSuccess(true);
    setShareholderlLoading(false);
    navigate(`/admin/broker/${value.value.value}`);
  }

  useEffect(() => {
    if (broker_director_list_attachment) {
      async function getdirectorlistimgurl() {
        var uploadext = broker_director_list_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(broker_director_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectorlImg(y);
        }
      }
      getdirectorlistimgurl();
    }
  }, [broker_director_list_attachment, identityId]);

  useEffect(() => {
    if (broker_director_list_attachment) {
      async function getdirectorlistpdfurl() {
        var uploadext = broker_director_list_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(broker_director_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectorlpdf(y);
        }
      }
      getdirectorlistpdfurl();
    }
  }, [broker_director_list_attachment, identityId]);

  function directorlisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(directorlimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directorlimg} />
          <div>
            <input
              id={directorlimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledirectorlChange(event)}
            />
            <label htmlFor={directorlimg}>
              <LoaderButton
                id={directorlimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorlloading}
                success={directorlsuccess}
                loading={directorlloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(directorlpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={directorlpdf}
          />
          <div>
            <input
              id={directorlpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledirectorlChange(event)}
            />
            <label htmlFor={directorlpdf}>
              <LoaderButton
                id={directorlpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorlloading}
                success={directorlsuccess}
                loading={directorlloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handledirectorlChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={directorlloading}
              success={directorlsuccess}
              loading={directorlloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledirectorlChange(event) {
    file.current = event.target.files[0];
    const newdirectorlfile = file.current;
    ondirectorlChange(newdirectorlfile);
  }

  async function ondirectorlChange(newfile) {
    setDirectorlSuccess(false);
    setDirectorlLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'broker_director_list_attachment') : null;
      var broker_director_list_attachment = u;
      const id= value.value.value;
      await updateBroker({
        id,
        broker_director_list_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorlSuccess(true);
    setDirectorlLoading(false);
    navigate(`/admin/broker/${value.value.value}`);
  }

  useEffect(() => {
    if (broker_articles_of_association_attachment) {
      async function getaoaimgurl() {
        var uploadext = broker_articles_of_association_attachment
          .split(".")
          .pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(
            broker_articles_of_association_attachment,
            {
              level: "private",
              identityId: identityId,
            }
          );
          setAoaImg(y);
        }
      }
      getaoaimgurl();
    }
  }, [broker_articles_of_association_attachment, identityId]);

  useEffect(() => {
    if (broker_articles_of_association_attachment) {
      async function getaoapdfurl() {
        var uploadext = broker_articles_of_association_attachment
          .split(".")
          .pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(
            broker_articles_of_association_attachment,
            {
              level: "private",
              identityId: identityId,
            }
          );
          setAoapdf(y);
        }
      }
      getaoapdfurl();
    }
  }, [broker_articles_of_association_attachment, identityId]);

  function aoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(aoaimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={aoaimg} />
          <div>
            <input
              id={aoaimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleaoaChange(event)}
            />
            <label htmlFor={aoaimg}>
              <LoaderButton
                id={aoaimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={aoaloading}
                success={aoasuccess}
                loading={aoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(aoapdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={aoapdf}
          />
          <div>
            <input
              id={aoapdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleaoaChange(event)}
            />
            <label htmlFor={aoapdf}>
              <LoaderButton
                id={aoapdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={aoaloading}
                success={aoasuccess}
                loading={aoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleaoaChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={aoaloading}
              success={aoasuccess}
              loading={aoaloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleaoaChange(event) {
    file.current = event.target.files[0];
    const newaoafile = file.current;
    onaoaChange(newaoafile);
  }

  async function onaoaChange(newfile) {
    setAoaSuccess(false);
    setAoaLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'broker_articles_of_association_attachment') : null;
      var broker_articles_of_association_attachment = u;
      const id= value.value.value;
      await updateBroker({
        id,
        broker_articles_of_association_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setAoaSuccess(true);
    setAoaLoading(false);
    navigate(`/admin/broker/${value.value.value}`);
  }

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Company Documents
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Registration Certificate:</Typography>
                  {regcertisimageorpdf(regcertlabel, regcertname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Shareholder List:</Typography>
                  {shareholderlisimageorpdf(
                    shareholderllabel,
                    shareholderlname
                  )}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Director List:</Typography>
                  {directorlisimageorpdf(directorllabel, directorlname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Articles of Association:</Typography>
                  {aoaisimageorpdf(aoalabel, aoaname)}
                </>
              </Grid>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
}

export default BrokerUploads;
