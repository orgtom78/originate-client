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
  const [sub, setSub] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [uboId, setUboId] = useState("");
  const [financialsId, setFinancialsId] = useState("");
  const [supplier_registration_cert_attachment, setSupplier_registration_cert_attachment] = useState("");
  const [director_id_attachment, setDirector_id_attachment] = useState("");
  const [director_poa_attachment, setDirector_poa_attachment] = useState("");
  const [ubo_id_attachment, setUbo_id_attachment] = useState("");
  const [ubo_poa_attachment, setUbo_poa_attachment] = useState("");
  const [financials_attachment, setFinancials_attachment] = useState("");

  const context = useUser();

  const [regcertloading, setRegcertLoading] = useState(false);
  const [regcertsuccess, setRegcertSuccess] = useState(false);
  const [directoridloading, setDirectoridLoading] = useState(false);
  const [directoridsuccess, setDirectoridSuccess] = useState(false);
  const [directorpoaloading, setDirectorpoaLoading] = useState(false);
  const [directorpoasuccess, setDirectorpoaSuccess] = useState(false);
  const [uboidloading, setUboidLoading] = useState(false);
  const [uboidsuccess, setUboidSuccess] = useState(false);
  const [ubopoaloading, setUbopoaLoading] = useState(false);
  const [ubopoasuccess, setUbopoaSuccess] = useState(false);
  const [financialsloading, setFinancialsLoading] = useState(false);
  const [financialssuccess, setFinancialsSuccess] = useState(false);

  const [regcertimg, setRegcertImg] = useState("");
  const [regcertpdf, setRegcertpdf] = useState("");
  const [directoridimg, setDirectoridImg] = useState("");
  const [directoridpdf, setDirectoridpdf] = useState("");
  const [directorpoaimg, setDirectorpoaImg] = useState("");
  const [directorpoapdf, setDirectorpoapdf] = useState("");
  const [uboidimg, setUboidImg] = useState("");
  const [uboidpdf, setUboidpdf] = useState("");
  const [ubopoaimg, setUbopoaImg] = useState("");
  const [ubopoapdf, setUbopoapdf] = useState("");
  const [financialsimg, setFinancialsImg] = useState("");
  const [financialspdf, setFinancialspdf] = useState("");

  const file = useRef(null);

  const regcertlabel = 'supplier_registration_cert_attachment';
  const regcertname  = 'Registration Certificate';
  const directoridlabel = 'director_id_attachment';
  const directoridname  = 'Director ID';
  const directorpoalabel = 'director_poa_attachment';
  const directorpoaname  = 'Director Proof of Address';
  const uboidlabel = 'ubo_id_attachment';
  const uboidname  = 'UBO ID';
  const ubopoalabel = 'ubo_poa_attachment';
  const ubopoaname  = 'Owner Proof of Address';
  const financialslabel = 'financials_attachment';
  const financialsname  = 'Supplier Financials';


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
        director_id_attachment,
        director_poa_attachment,
        ubo_id_attachment,
        ubo_poa_attachment,
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
      setDirector_id_attachment(director_id_attachment);
      setDirector_poa_attachment(director_poa_attachment);
      setUbo_id_attachment(ubo_id_attachment);
      setUbo_poa_attachment(ubo_poa_attachment);
      setFinancials_attachment(financials_attachment);
      const a = await supplier_registration_cert_attachment;
      const b = await director_id_attachment;
      const c = await director_poa_attachment;
      const d = await ubo_id_attachment;
      const e = await ubo_poa_attachment;
      const f = await financials_attachment;
      setRegcertImg(a);
      setDirectoridImg(b);
      setDirectorpoaImg(c);
      setUboidImg(d);
      setUbopoaImg(e);
      setFinancialsImg(f);
    }
    onLoad();
  }, [context]);

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
    );
  }

  function updateDirector(input) {
    return API.graphql(
      graphqlOperation(mutations.updateDirector, { input: input })
    );
  }

  function updateUbo(input) {
    return API.graphql(graphqlOperation(mutations.updateUbo, { input: input }));
  }

  function updateFinancials(input) {
    return API.graphql(graphqlOperation(mutations.updateFinancials, { input: input }));
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
              onChange={(event)=>handleregcertChange(event)}
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
              onChange={(event)=>handleregcertChange(event)}
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
            onChange={(event)=>handleregcertChange(event)}
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
    window.location.reload(true)
  }

  useEffect(() => {
    if (directoridimg) {
      async function getdirectoridimgurl() {
        var uploadext = directoridimg.split(".").pop();
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
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(directoridimg);
          setDirectoridImg(y);
        }
      }
      getdirectoridimgurl();
    }
  }, [directoridimg]);

  useEffect(() => {
    if (directoridimg) {
      async function getdirectoridpdfurl() {
        var uploadext = directoridimg.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(directoridimg);
          setDirectoridpdf(y);
        }
      }
      getdirectoridpdfurl();
    }
  }, [directoridimg]);

  function directoridisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(directoridimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directoridimg} />
          <div>
            <input
              id={directoridimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handledirectoridChange(event)}
            />
            <label htmlFor={directoridimg}>
              <LoaderButton
                id={directoridimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directoridloading}
                success={directoridsuccess}
                loading={directoridloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(directoridpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={directoridpdf}
          />
          <div>
            <input
              id={directoridpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handledirectoridChange(event)}
            />
            <label htmlFor={directoridpdf}>
              <LoaderButton
                id={directoridpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directoridloading}
                success={directoridsuccess}
                loading={directoridloading}      
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
            onChange={(event)=>handledirectoridChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={directoridloading}
              success={directoridsuccess}
              loading={directoridloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledirectoridChange(event) {
    file.current = event.target.files[0];
    const newdirectoridfile = file.current;
    ondirectoridChange(newdirectoridfile);
  }

  async function ondirectoridChange(newfile) {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    try {
      const u = newfile ? await s3Upload(newfile) : null;
      var director_id_attachment = u;
      const sortkey = directorId;
      const userId = sub;
      await updateDirector({
        sortkey,
        userId,
        director_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectoridSuccess(true);
    setDirectoridLoading(false);
    window.location.reload(true)
  }

  useEffect(() => {
    if (directorpoaimg) {
      async function getdirectorpoaimgurl() {
        var uploadext = directorpoaimg.split(".").pop();
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
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(directorpoaimg);
          setDirectorpoaImg(y);
        }
      }
      getdirectorpoaimgurl();
    }
  }, [directorpoaimg]);

  useEffect(() => {
    if (directorpoaimg) {
      async function getdirectorpoapdfurl() {
        var uploadext = directorpoaimg.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(directorpoaimg);
          setDirectorpoapdf(y);
        }
      }
      getdirectorpoapdfurl();
    }
  }, [directorpoaimg]);

  function directorpoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(directorpoaimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directorpoaimg} />
          <div>
            <input
              id={directorpoaimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handledirectorpoaChange(event)}
            />
            <label htmlFor={directorpoaimg}>
              <LoaderButton
                id={directorpoaimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorpoaloading}
                success={directorpoasuccess}
                loading={directorpoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(directorpoapdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={directorpoapdf}
          />
          <div>
            <input
              id={directorpoapdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handledirectorpoaChange(event)}
            />
            <label htmlFor={directorpoapdf}>
              <LoaderButton
                id={directorpoapdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directorpoaloading}
                success={directorpoasuccess}
                loading={directorpoaloading}      
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
            onChange={(event)=>handledirectorpoaChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={directorpoaloading}
              success={directorpoasuccess}
              loading={directorpoaloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handledirectorpoaChange(event) {
    file.current = event.target.files[0];
    const newdirectorpoafile = file.current;
    ondirectorpoaChange(newdirectorpoafile);
  }

  async function ondirectorpoaChange(newfile) {
    setDirectorpoaSuccess(false);
    setDirectorpoaLoading(true);
    try {
      const u = newfile ? await s3Upload(newfile) : null;
      var director_poa_attachment = u;
      const sortkey = directorId;
      const userId = sub;
      await updateDirector({
        sortkey,
        userId,
        director_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorpoaSuccess(true);
    setDirectorpoaLoading(false);
    window.location.reload(true)
  }

  useEffect(() => {
    if (uboidimg) {
      async function getuboidimgurl() {
        var uploadext = uboidimg.split(".").pop();
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
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.vault.get(uboidimg);
          setUboidImg(y);
        }
      }
      getuboidimgurl();
    }
  }, [uboidimg]);

  useEffect(() => {
    if (uboidimg) {
      async function getuboidurl() {
        var uploadext = uboidimg.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(uboidimg);
          setUboidpdf(y);
        }
      }
      getuboidurl();
    }
  }, [uboidimg]);

  function uboidisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(uboidimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={uboidimg} />
          <div>
            <input
              id={uboidimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handleuboidChange(event)}
            />
            <label htmlFor={uboidimg}>
              <LoaderButton
                id={uboidimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={uboidloading}
                success={uboidsuccess}
                loading={uboidloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(uboidpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={uboidpdf}
          />
          <div>
            <input
              id={uboidpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handleuboidChange(event)}
            />
            <label htmlFor={uboidpdf}>
              <LoaderButton
                id={uboidpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={uboidloading}
                success={uboidsuccess}
                loading={uboidloading}      
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
            onChange={(event)=>handleuboidChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={uboidloading}
              success={uboidsuccess}
              loading={uboidloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleuboidChange(event) {
    file.current = event.target.files[0];
    const newuboidfile = file.current;
    onuboidChange(newuboidfile);
  }

  async function onuboidChange(newfile) {
    setUboidSuccess(false);
    setUboidLoading(true);
    try {
      const u = newfile ? await s3Upload(newfile) : null;
      var ubo_id_attachment = u;
      const sortkey = uboId;
      const userId = sub;
      await updateUbo({
        sortkey,
        userId,
        ubo_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUbopoaSuccess(true);
    setUbopoaLoading(false);
    window.location.reload(true)
  }

  useEffect(() => {
    if (ubopoaimg) {
      async function getubopoaurl() {
        var uploadext = ubopoaimg.split(".").pop();
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
          const y = await Storage.vault.get(ubopoaimg);
          setUbopoaImg(y);
        }
      }
      getubopoaurl();
    }
  }, [ubopoaimg]);

  useEffect(() => {
    if (ubopoaimg) {
      async function getubopoaurl() {
        var uploadext = ubopoaimg.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.vault.get(ubopoaimg);
          setUbopoapdf(y);
        }
      }
      getubopoaurl();
    }
  }, [ubopoaimg]);
 
  function ubopoaisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (regex.test(ubopoaimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ubopoaimg} />
          <div>
            <input
              id={ubopoaimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handleubopoaChange(event)}
            />
            <label htmlFor={ubopoaimg}>
              <LoaderButton
                id={ubopoaimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ubopoaloading}
                success={ubopoasuccess}
                loading={ubopoaloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(ubopoapdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={ubopoapdf}
          />
          <div>
            <input
              id={ubopoapdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event)=>handleubopoaChange(event)}
            />
            <label htmlFor={ubopoapdf}>
              <LoaderButton
                id={ubopoapdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ubopoaloading}
                success={ubopoasuccess}
                loading={ubopoaloading}      
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
            onChange={(event)=>handleubopoaChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={ubopoaloading}
              success={ubopoasuccess}
              loading={ubopoaloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleubopoaChange(event) {
    file.current = event.target.files[0];
    const newubopoafile = file.current;
    onubopoaChange(newubopoafile);
  }

  async function onubopoaChange(newfile) {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    try {
      const u = newfile ? await s3Upload(newfile) : null;
      var ubo_poa_attachment = u;
      const sortkey = uboId;
      const userId = sub;
      await updateUbo({
        sortkey,
        userId,
        ubo_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUbopoaSuccess(true);
    setUbopoaLoading(false);
    window.location.reload(true)
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
              onChange={(event)=>handlefinancialsChange(event)}
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
              onChange={(event)=>handlefinancialsChange(event)}
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
            onChange={(event)=>handlefinancialsChange(event)}
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
    window.location.reload(true)
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
                  <Typography>Director ID:</Typography>
                  {directoridisimageorpdf(directoridlabel, directoridname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Director Proof of Address:</Typography>
                  {directorpoaisimageorpdf(directorpoalabel, directorpoaname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Owner ID:</Typography>
                  {uboidisimageorpdf(uboidlabel, uboidname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Owner Proof of Address:</Typography>
                  {ubopoaisimageorpdf(ubopoalabel, ubopoaname)}
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
