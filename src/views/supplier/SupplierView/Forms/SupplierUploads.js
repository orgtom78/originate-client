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
  makeStyles,
} from "@material-ui/core";
import { Upload as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import { useUser } from "src/components/usercontext.js";
import { Storage } from "aws-amplify";
import { s3Upload } from "src/libs/awsLib.js";

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

function SupplierUploads() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [sub, setSub] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [uboId, setUboId] = useState("");
  const [financialsId, setFinancialsId] = useState("");
  const [supplier_registration_cert_attachment, setSupplier_registration_cert_attachment] = useState("");
  const [financials_attachment, setFinancials_attachment] = useState("");

  const context = useUser();

  const [regcertloading, setRegcertLoading] = useState(false);
  const [regcertsuccess, setRegcertSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  const [regcertimg, setRegcertImg] = useState("");
  const [regcertpdf, setRegcertpdf] = useState("");
  const [financialsimg, setFinancialsImg] = useState("");
  const [financialspdf, setFinancialspdf] = useState("");

  const file = useRef(null);

  const regcertlabel = "supplier_registration_cert_attachment";
  const regcertname = "Registration Certificate";
  const financialslabel = "financials_attachment";
  const financialsname = "Supplier Financials";

  useEffect(() => {
    async function onLoad() {
      const data = await context;
      const {
        sub,
        supplierId,
        directorId,
        uboId,
        financialsId,
        supplier_registration_cert_attachment,
        financials_attachment,
      } = data;
      setSub(sub);
      setSupplierId(supplierId);
      setDirectorId(directorId);
      setUboId(uboId);
      setFinancialsId(financialsId);
      setSupplier_registration_cert_attachment(
        supplier_registration_cert_attachment
      );
      setFinancials_attachment(financials_attachment);
      const a = await supplier_registration_cert_attachment;
      const f = await financials_attachment;
      setRegcertImg(a);
      setFinancialsImg(f);
    }
    onLoad();
  }, [context]);

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
    );
  }

  function updateFinancials(input) {
    return API.graphql(
      graphqlOperation(mutations.updateFinancials, { input: input })
    );
  }

  useEffect(() => {
    if (regcertimg) {
      async function getregcertimgurl() {
        var uploadext = regcertimg.split(".").pop();
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
          const y = await Storage.vault.get(regcertimg);
          setRegcertImg(y);
        }
      }
      getregcertimgurl();
    }
  }, [regcertimg]);

  useEffect(() => {
    if (regcertimg) {
      async function getregcertpdfurl() {
        var uploadext = regcertimg.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(regcertimg);
          setRegcertpdf(y);
        }
      }
      getregcertpdfurl();
    }
  }, [regcertimg]);

  function regcertisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
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
      const u = newfile ? await s3Upload(newfile) : null;
      var supplier_registration_cert_attachment = u;
      const sortkey = supplierId;
      const userId = sub;
      await updateSupplier({
        sortkey,
        userId,
        supplier_registration_cert_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setRegcertSuccess(true);
    setRegcertLoading(false);
    navigate("/app/account");
  }

  useEffect(() => {
    if (financialsimg) {
      async function getfinancialsurl() {
        var uploadext = financialsimg.split(".").pop();
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
          const y = await Storage.vault.get(financialsimg);
          setFinancialsImg(y);
        }
      }
      getfinancialsurl();
    }
  }, [financialsimg]);

  useEffect(() => {
    if (financialsimg) {
      async function getfinancialsurl() {
        var uploadext = financialsimg.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(financialsimg);
          setFinancialspdf(y);
        }
      }
      getfinancialsurl();
    }
  }, [financialsimg]);

  function financialsisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(financialsimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={financialsimg} />
          <div>
            <input
              id={financialsimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlefinancialsChange(event)}
            />
            <label htmlFor={financialsimg}>
              <LoaderButton
                id={financialsimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={financialsloading}
                success={financialssuccess}
                loading={financialsloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(financialspdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={financialspdf}
          />
          <div>
            <input
              id={financialspdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlefinancialsChange(event)}
            />
            <label htmlFor={financialspdf}>
              <LoaderButton
                id={financialspdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={financialsloading}
                success={financialssuccess}
                loading={financialsloading}
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
            onChange={(event) => handlefinancialsChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={financialsloading}
              success={financialssuccess}
              loading={financialsloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handlefinancialsChange(event) {
    file.current = event.target.files[0];
    const newfinancialsfile = file.current;
    onfinancialsChange(newfinancialsfile);
  }

  async function onfinancialsChange(newfile) {
    setFinancialsSuccess(false);
    setFinancialsLoading(true);
    try {
      const u = newfile ? await s3Upload(newfile) : null;
      var financials_attachment = u;
      const sortkey = financialsId;
      const userId = sub;
      await updateFinancials({
        sortkey,
        userId,
        financials_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setFinancialsSuccess(true);
    setFinancialsLoading(false);
    navigate("/app/account");
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
                  <Typography>Financials:</Typography>
                  {financialsisimageorpdf(financialslabel, financialsname)}
                </>
              </Grid>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
}

export default SupplierUploads;
