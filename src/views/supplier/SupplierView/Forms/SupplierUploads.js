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
  const [supplier_registration_cert_attachment, setSupplier_registration_cert_attachment] = useState("");
  const [supplier_articles_of_association_attachment, setSupplier_articles_of_association_attachment] = useState("");
  const [supplier_director_list_attachment, setSupplier_director_list_attachment] = useState("");
  const [supplier_shareholder_list_attachment, setSupplier_shareholder_list_attachment] = useState("");

  const context = useUser();

  const [regcertloading, setRegcertLoading] = useState(false);
  const [regcertsuccess, setRegcertSuccess] = useState(false);
  const [aoaloading, setAoaLoading] = useState(false);
  const [aoasuccess, setAoaSuccess] = useState(false);
  const [dlistloading, setDlistLoading] = useState(false);
  const [dlistsuccess, setDlistSuccess] = useState(false);
  const [slistloading, setSlistLoading] = useState(false);
  const [slistsuccess, setSlistSuccess] = useState(false);

  const [regcertimg, setRegcertImg] = useState("");
  const [regcertpdf, setRegcertpdf] = useState("");
  const [aoaimg, setAoaImg] = useState("");
  const [aoapdf, setAoapdf] = useState("");
  const [dlistimg, setDlistImg] = useState("");
  const [dlistpdf, setDlistpdf] = useState("");
  const [slistimg, setSlistImg] = useState("");
  const [slistpdf, setSlistpdf] = useState("");

  const file = useRef(null);

  const regcertlabel = "supplier_registration_cert_attachment";
  const regcertname = "Registration Certificate";
  const aoalabel = "supplier_articles_of_association_attachment";
  const aoaname = "Articles of Association";
  const dlistlabel = "supplier_director_list_attachment";
  const dlistname = "List of Directors";
  const slistlabel = "supplier_shareholder_list_attachment";
  const slistname = "List of Shareholders";

  useEffect(() => {
    async function onLoad() {
      const data = await context;
      const {
        sub,
        supplierId,
        supplier_registration_cert_attachment,
        supplier_articles_of_association_attachment,
        supplier_director_list_attachment,
        supplier_shareholder_list_attachment,
      } = data;
      setSub(sub);
      setSupplierId(supplierId);
      setSupplier_registration_cert_attachment(supplier_registration_cert_attachment);
      setSupplier_articles_of_association_attachment(supplier_articles_of_association_attachment);
      setSupplier_director_list_attachment(supplier_director_list_attachment);
      setSupplier_shareholder_list_attachment(supplier_shareholder_list_attachment);
    }
    onLoad();
  }, [context]);

  async function s3Up(file, name) {
    var fileExtension = file.name.split('.').pop();
    const filename = `${sub}${supplierId}${name}.${fileExtension}`;
  
    const stored = await Storage.vault.put(filename, file, {
      contentType: file.type,
    });
    return stored.key;
  }

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
    );
  }

  useEffect(() => {
    if (supplier_registration_cert_attachment) {
      async function getregcertimgurl() {
        var uploadext = supplier_registration_cert_attachment.split(".").pop();
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
          const y = await Storage.vault.get(supplier_registration_cert_attachment);
          setRegcertImg(y);
        }
      }
      getregcertimgurl();
    }
  }, [supplier_registration_cert_attachment]);

  useEffect(() => {
    if (supplier_registration_cert_attachment) {
      async function getregcertpdfurl() {
        var uploadext = supplier_registration_cert_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(supplier_registration_cert_attachment);
          setRegcertpdf(y);
        }
      }
      getregcertpdfurl();
    }
  }, [supplier_registration_cert_attachment]);

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
      const u = newfile ? await s3Up(newfile, 'supplier_registration_cert_attachment') : null;
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
    if (supplier_articles_of_association_attachment) {
      async function getaoaurl() {
        var uploadext = supplier_articles_of_association_attachment.split(".").pop();
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
          const y = await Storage.vault.get(supplier_articles_of_association_attachment);
          setAoaImg(y);
        }
      }
      getaoaurl();
    }
  }, [supplier_articles_of_association_attachment]);

  useEffect(() => {
    if (supplier_articles_of_association_attachment) {
      async function getfinancialsurl() {
        var uploadext = supplier_articles_of_association_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(supplier_articles_of_association_attachment);
          setAoapdf(y);
        }
      }
      getfinancialsurl();
    }
  }, [supplier_articles_of_association_attachment]);

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
      const u = newfile ? await s3Up(newfile, 'supplier_articles_of_association_attachment') : null;
      var supplier_articles_of_association_attachment = u;
      const sortkey = supplierId;
      const userId = sub;
      await updateSupplier({
        sortkey,
        userId,
        supplier_articles_of_association_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setAoaSuccess(true);
    setAoaLoading(false);
    navigate("/app/account");
  }

  useEffect(() => {
    if (supplier_director_list_attachment) {
      async function getdlisturl() {
        var uploadext = supplier_director_list_attachment.split(".").pop();
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
          const y = await Storage.vault.get(supplier_director_list_attachment);
          setDlistImg(y);
        }
      }
      getdlisturl();
    }
  }, [supplier_director_list_attachment]);

  useEffect(() => {
    if (supplier_director_list_attachment) {
      async function getfinancialsurl() {
        var uploadext = supplier_director_list_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(supplier_director_list_attachment);
          setDlistpdf(y);
        }
      }
      getfinancialsurl();
    }
  }, [supplier_director_list_attachment]);

  function dlistisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(dlistimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={dlistimg} />
          <div>
            <input
              id={dlistimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledlistChange(event)}
            />
            <label htmlFor={dlistimg}>
              <LoaderButton
                id={dlistimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={dlistloading}
                success={dlistsuccess}
                loading={dlistloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(dlistpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={dlistpdf}
          />
          <div>
            <input
              id={dlistpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handledlistChange(event)}
            />
            <label htmlFor={dlistpdf}>
              <LoaderButton
                id={dlistpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={dlistloading}
                success={dlistsuccess}
                loading={dlistloading}
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
            onChange={(event) => handledlistChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={dlistloading}
              success={dlistsuccess}
              loading={dlistloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledlistChange(event) {
    file.current = event.target.files[0];
    const newdlistfile = file.current;
    ondlistChange(newdlistfile);
  }

  async function ondlistChange(newfile) {
    setDlistSuccess(false);
    setDlistLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'supplier_director_list_attachment') : null;
      var supplier_director_list_attachment = u;
      const sortkey = supplierId;
      const userId = sub;
      await updateSupplier({
        sortkey,
        userId,
        supplier_director_list_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDlistSuccess(true);
    setDlistLoading(false);
    navigate("/app/account");
  }

  useEffect(() => {
    if (supplier_shareholder_list_attachment) {
      async function getslisturl() {
        var uploadext = supplier_shareholder_list_attachment.split(".").pop();
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
          const y = await Storage.vault.get(supplier_shareholder_list_attachment);
          setSlistImg(y);
        }
      }
      getslisturl();
    }
  }, [supplier_shareholder_list_attachment]);

  useEffect(() => {
    if (supplier_shareholder_list_attachment) {
      async function getslisturl() {
        var uploadext = supplier_shareholder_list_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(supplier_shareholder_list_attachment);
          setSlistpdf(y);
        }
      }
      getslisturl();
    }
  }, [supplier_shareholder_list_attachment]);

  function slistisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(slistimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={slistimg} />
          <div>
            <input
              id={slistimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleslistChange(event)}
            />
            <label htmlFor={slistimg}>
              <LoaderButton
                id={slistimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={slistloading}
                success={slistsuccess}
                loading={slistloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(slistpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={slistpdf}
          />
          <div>
            <input
              id={slistpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleslistChange(event)}
            />
            <label htmlFor={slistpdf}>
              <LoaderButton
                id={slistpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={slistloading}
                success={slistsuccess}
                loading={slistloading}
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
            onChange={(event) => handleslistChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={slistloading}
              success={slistsuccess}
              loading={slistloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleslistChange(event) {
    file.current = event.target.files[0];
    const newslistfile = file.current;
    onslistChange(newslistfile);
  }

  async function onslistChange(newfile) {
    setSlistSuccess(false);
    setSlistLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, 'supplier_shareholder_list_attachment') : null;
      var supplier_shareholder_list_attachment = u;
      const sortkey = supplierId;
      const userId = sub;
      await updateSupplier({
        sortkey,
        userId,
        supplier_shareholder_list_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setSlistSuccess(true);
    setSlistLoading(false);
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
                  <Typography>Articles of Association:</Typography>
                  {aoaisimageorpdf(aoalabel, aoaname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>List of Directors:</Typography>
                  {dlistisimageorpdf(dlistlabel, dlistname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>List of Shareholders:</Typography>
                  {slistisimageorpdf(slistlabel, slistname)}
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
