import React, { useState, useEffect } from "react";
import "date-fns";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { green } from "@mui/material/colors";
import { Storage } from "aws-amplify";

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

function BuyerUploads({ value }) {
  const classes = useStyles();
  const [identityId, setIdentityId] = useState("");
  const [
    buyer_registration_cert_attachment,
    setBuyer_registration_cert_attachment,
  ] = useState("");
  const [
    buyer_shareholder_list_attachment,
    setBuyer_shareholder_list_attachment,
  ] = useState("");
  const [
    buyer_director_list_attachment,
    setBuyer_director_list_attachment,
  ] = useState("");
  const [
    buyer_articles_of_association_attachment,
    setBuyer_articles_of_association_attachment,
  ] = useState("");
  const [regcertimg, setRegcertImg] = useState("");
  const [regcertpdf, setRegcertpdf] = useState("");
  const [shareholderlimg, setShareholderlImg] = useState("");
  const [shareholderlpdf, setShareholderlpdf] = useState("");
  const [directorlimg, setDirectorlImg] = useState("");
  const [directorlpdf, setDirectorlpdf] = useState("");
  const [aoaimg, setAoaImg] = useState("");
  const [aoapdf, setAoapdf] = useState("");

  const regcertlabel = "buyer_registration_cert_attachment";
  const regcertname = "Registration Certificate";
  const shareholderllabel = "buyer_shareholder_list_attachment";
  const shareholderlname = "Buyer Shareholder List";
  const directorllabel = "buyer_director_list_attachment";
  const directorlname = "Buyer Director List";
  const aoalabel = "buyer_articles_of_association_attachment";
  const aoaname = "Buyer Articles of Association";

  useEffect(() => {
    async function get() {
      try {
        const data = await value.data.getBuyer;
        setBuyer_registration_cert_attachment(
          data.buyer_registration_cert_attachment
        );
        setBuyer_shareholder_list_attachment(
          data.buyer_shareholder_list_attachment
        );
        setBuyer_director_list_attachment(data.buyer_director_list_attachment);
        setBuyer_articles_of_association_attachment(
          data.buyer_articles_of_association_attachment
        );
        setIdentityId(data.identityId);
        return;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    get();
  }, [value]);

  useEffect(() => {
    if (buyer_registration_cert_attachment) {
      async function getregcertimgurl() {
        var uploadext = buyer_registration_cert_attachment.split(".").pop();
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
          const y = await Storage.get(buyer_registration_cert_attachment, {
            level: "private",
            identityId: identityId,
          });
          setRegcertImg(y);
        }
      }
      getregcertimgurl();
    }
  }, [buyer_registration_cert_attachment, identityId]);

  useEffect(() => {
    if (buyer_registration_cert_attachment) {
      async function getregcertpdfurl() {
        var uploadext = buyer_registration_cert_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(buyer_registration_cert_attachment, {
            level: "private",
            identityId: identityId,
          });
          setRegcertpdf(y);
        }
      }
      getregcertpdfurl();
    }
  }, [buyer_registration_cert_attachment, identityId]);

  function regcertisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(regcertimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={regcertimg} />
          <div>
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(regcertimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(regcertpdf, "_blank")}
            >
              Download
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Typography>
            This document is pending, please contact Originate Capital.
          </Typography>
        </>
      );
    }
  }

  useEffect(() => {
    if (buyer_shareholder_list_attachment) {
      async function getshareholderlistimgurl() {
        var uploadext = buyer_shareholder_list_attachment.split(".").pop();
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
          const y = await Storage.get(buyer_shareholder_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setShareholderlImg(y);
        }
      }
      getshareholderlistimgurl();
    }
  }, [buyer_shareholder_list_attachment, identityId]);

  useEffect(() => {
    if (buyer_shareholder_list_attachment) {
      async function getshareholderlistpdfurl() {
        var uploadext = buyer_shareholder_list_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(buyer_shareholder_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setShareholderlpdf(y);
        }
      }
      getshareholderlistpdfurl();
    }
  }, [buyer_shareholder_list_attachment, identityId]);

  function shareholderlisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(shareholderlimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={shareholderlimg} />
          <div>
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(shareholderlimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(shareholderlpdf, "_blank")}
            >
              Download
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Typography>
            This document is pending, please contact Originate Capital.
          </Typography>
        </>
      );
    }
  }

  useEffect(() => {
    if (buyer_director_list_attachment) {
      async function getdirectorlistimgurl() {
        var uploadext = buyer_director_list_attachment.split(".").pop();
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
          const y = await Storage.get(buyer_director_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectorlImg(y);
        }
      }
      getdirectorlistimgurl();
    }
  }, [buyer_director_list_attachment, identityId]);

  useEffect(() => {
    if (buyer_director_list_attachment) {
      async function getdirectorlistpdfurl() {
        var uploadext = buyer_director_list_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(buyer_director_list_attachment, {
            level: "private",
            identityId: identityId,
          });
          setDirectorlpdf(y);
        }
      }
      getdirectorlistpdfurl();
    }
  }, [buyer_director_list_attachment, identityId]);

  function directorlisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(directorlimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directorlimg} />
          <div>
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(directorlimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(directorlpdf, "_blank")}
            >
              Download
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Typography>
            This document is pending, please contact Originate Capital.
          </Typography>
        </>
      );
    }
  }

  useEffect(() => {
    if (buyer_articles_of_association_attachment) {
      async function getaoaimgurl() {
        var uploadext = buyer_articles_of_association_attachment
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
            buyer_articles_of_association_attachment,
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
  }, [buyer_articles_of_association_attachment, identityId]);

  useEffect(() => {
    if (buyer_articles_of_association_attachment) {
      async function getaoapdfurl() {
        var uploadext = buyer_articles_of_association_attachment
          .split(".")
          .pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(
            buyer_articles_of_association_attachment,
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
  }, [buyer_articles_of_association_attachment, identityId]);

  function aoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(aoaimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={aoaimg} />
          <div>
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(aoaimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(aoapdf, "_blank")}
            >
              Download
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Typography>
            This document is pending, please contact Originate Capital.
          </Typography>
        </>
      );
    }
  }

  return (
    <Container maxWidth={false}>
      <React.Fragment>
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
              {shareholderlisimageorpdf(shareholderllabel, shareholderlname)}
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
      </React.Fragment>
    </Container>
  );
}

export default BuyerUploads;
