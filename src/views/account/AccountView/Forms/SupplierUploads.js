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
  const [
    supplier_registration_cert_attachment,
    setSupplier_registration_cert_attachment,
  ] = useState("");
  const [director_id_attachment, setDirector_id_attachment] = useState("");
  const [director_poa_attachment, setDirector_poa_attachment] = useState("");
  const [ubo_id_attachment, setUbo_id_attachment] = useState("");
  const [ubo_poa_attachment, setUbo_poa_attachment] = useState("");
  const [financials_attachment, setFinancials_attachment] = useState("");

  const context = useUser();

  const [uploadedRegcert, setUploadedRegcert] = useState("");
  const [uploadedDirectorid, setUploadedDirectorid] = useState("");
  const [uploadedDirectorpoa, setUploadedDirectorpoa] = useState("");
  const [uploadedUboid, setUploadedUboid] = useState("");
  const [uploadedUbopoa, setUploadedUbopoa] = useState("");
  const [uploadedFinancials, setUploadedFinancials] = useState("");

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
  const [directoridimg, setDirecoridImg] = useState("");
  const [directoridpdf, setDirecoridpdf] = useState("");
  const [directorpoaimg, setDirecorpoaImg] = useState("");
  const [directorpoapdf, setDirecorpoapdf] = useState("");
  const [uboidimg, setUboidImg] = useState("");
  const [uboidpdf, setUboidpdf] = useState("");
  const [ubopoaimg, setUbopoaImg] = useState("");
  const [ubopoapdf, setUbopoapdf] = useState("");
  const [financialsimg, setFinancialsImg] = useState("");
  const [financialspdf, setFinancialspdf] = useState("");

  const file = useRef(null);

  useEffect(() => {
    async function onLoad() {
      const data = await context;
      const {
        sub,
        supplierId,
        directorId,
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
      setSupplier_registration_cert_attachment(
        supplier_registration_cert_attachment
      );
      setDirector_id_attachment(director_id_attachment);
      setDirector_poa_attachment(director_poa_attachment);
      setUbo_id_attachment(ubo_id_attachment);
      setUbo_poa_attachment(ubo_poa_attachment);
      setFinancials_attachment(financials_attachment);
      const a = await checkifuploadisnull(
        supplier_registration_cert_attachment
      );
      const b = await checkifuploadisnull(director_id_attachment);
      const c = await checkifuploadisnull(director_poa_attachment);
      const d = await checkifuploadisnull(ubo_id_attachment);
      const e = await checkifuploadisnull(ubo_poa_attachment);
      const f = await checkifuploadisnull(financials_attachment);
      setRegcertImg(a);
      setDirecoridImg(b);
      setDirecorpoaImg(c);
      setUboidImg(d);
      setUbopoaImg(e);
      setFinancialsImg(f);
    }
    onLoad();
  }, [context]);

  function checkifuploadisnull(data) {
    console.log(data);
    if (data !== null) {
      console.log("set constant to data key^");
      return data;
    } else {
      console.log("return 0");
      return null;
    }
  }

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
    return API.graphql(
      graphqlOperation(mutations.updateUbo, { input: input })
    );
  }

  useEffect(() => {
    if (uploadedRegcert !== null) {
      async function geturl() {
        var uploadext = uploadedRegcert.split(".").pop();
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
        const g = imageExtensions.includes(uploadext);
        if (g === true) {
          const h = await Storage.vault.get(uploadedRegcert);
          setRegcertImg(h);
        } else {
          const i = await Storage.vault.get(uploadedRegcert);
          setRegcertpdf(i);
        }
      }
      geturl();
    }
  }, [uploadedRegcert]);

  function regcertisimageorpdf(regcertimg) {
    if (regcertimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={regcertimg} />
        </>
      );
    } else if (regcertimg == null) {
      return (
        <>
          <input
            name="supplier_registration_cert_attachment"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleRegcertChange}
          />
          <label htmlFor="supplier_registration_cert_attachment">
            <LoaderButton
              id="supplier_registration_cert_attachment"
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={regcertloading}
              success={regcertsuccess}
              loading={regcertloading}
              onClick={handleRegcertClick}
            >
              {" "}
              Company registration certificate*
            </LoaderButton>
          </label>
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={regcertpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (uploadedDirectorid) {
      async function geturl() {
        var uploadext = uploadedDirectorid.split(".").pop();
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
        const a = imageExtensions.includes(uploadext);
        if (a === true) {
          const b = await Storage.vault.get(uploadedDirectorid);
          setDirecoridImg(b);
        } else {
          const c = await Storage.vault.get(uploadedDirectorid);
          setDirecoridpdf(c);
        }
      }
      geturl();
    }
  }, [uploadedDirectorid]);

  function directoridisimageorpdf(directoridimg) {
    if (directoridimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directoridimg} />
        </>
      );
    } else if (directoridimg == null) {
      return (
        <>
          <Typography>Company Director ID:</Typography>
          {directoridisimageorpdf(directoridimg)}
          <div>
            <input
              id="director_id_attachment"
              accept="image/*"
              style={{ display: "none" }}
              type="file"
              onChange={handleDirectoridChange}
            />
            <label htmlFor="director_id_attachment">
              <LoaderButton
                id="director_id_attachment"
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={directoridloading}
                success={directoridsuccess}
                loading={directoridloading}
                onClick={handleDirectoridClick}
              >
                {" "}
                Director ID certificate*
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={directoridpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (uploadedDirectorpoa) {
      async function geturl() {
        var uploadext = uploadedDirectorpoa.split(".").pop();
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
        const a = imageExtensions.includes(uploadext);
        if (a === true) {
          const b = await Storage.vault.get(uploadedDirectorpoa);
          setDirecorpoaImg(b);
        } else {
          const c = await Storage.vault.get(uploadedDirectorpoa);
          setDirecorpoapdf(c);
        }
      }
      geturl();
    }
  }, [uploadedDirectorpoa]);

  function directorpoaisimageorpdf() {
    if (directorpoaimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={directorpoaimg} />
        </>
      );
    } else if (directorpoaimg == null) {
      return (
        <>
          <input
            name="director_poa_attachment"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleDirectorpoaChange}
          />
          <label htmlFor="director_poa_attachment">
            <LoaderButton
              id="director_poa_attachment"
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={directorpoaloading}
              success={directorpoasuccess}
              loading={directorpoaloading}
              onClick={handleDirectorpoaClick}
            >
              {" "}
              Director POA*
            </LoaderButton>
          </label>
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={directorpoapdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (uploadedUboid) {
      async function geturl() {
        var uploadext = uploadedUboid.split(".").pop();
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
        const a = imageExtensions.includes(uploadext);
        if (a === true) {
          const b = await Storage.vault.get(uploadedUboid);
          setUboidImg(b);
        } else {
          const c = await Storage.vault.get(uploadedUboid);
          setUboidpdf(c);
        }
      }
      geturl();
    }
  }, [uploadedUboid]);

  function uboidisimageorpdf(uboidimg) {
    if (uboidimg) {
      return (
        <>
          <input
            name="ubo_id_attachment"
            id="ubo_id_attachment"
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={handleUboidChange}
          />
          <label htmlFor="ubo_id_attachment">
            <LoaderButton
              id="ubo_id_attachment"
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={uboidloading}
              success={uboidsuccess}
              loading={uboidloading}
              onClick={handleUboidClick}
            >
              {" "}
              Owner ID*
            </LoaderButton>
          </label>
        </>
      );
    } else if (uboidimg !== null) {
      return (
        <>
          <img className={classes.img} alt="complex" src={uboidimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={uboidpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (uploadedUbopoa) {
      async function getubopoaurl() {
        var uploadext = uploadedUbopoa.split(".").pop();
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
        console.log(x)
        if (x === true) {
          const y = await Storage.vault.get(uploadedUbopoa);
          setUbopoaImg(y);
        } else {
          const z = await Storage.vault.get(uploadedUbopoa);
          console.log(z);
          setUbopoapdf(z);
        }
      }
      getubopoaurl();
    }
  }, [uploadedUbopoa]);

  function checkimg(input){
    var ext = input.split(".").pop();
        const imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        const x = imageExtensions.includes(ext);
        console.log(x)
        return x;
      }

      function checkpdf(input){
        var ext = input.split(".").pop();
            const imageExtensions = [
              "pdf",
              "PDF",
            ];
            const x = imageExtensions.includes(ext);
            console.log(x)
            return x;
          }

  function ubopoaisimageorpdf() {
    console.log(ubopoapdf)
    console.log(ubopoaimg)
    if (checkimg(ubopoaimg) === true) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ubopoaimg} />
        </>
      );
    } else if (checkpdf(ubopoaimg) === true) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={ubopoaimg}
          />
        </>
      );
    } else {
      return (
        <div>
          <input
            id="ubo_poa_attachment"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleUboidChange}
          />
          <label htmlFor="ubo_poa_attachment">
            <LoaderButton
              id="ubo_poa_attachment"
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={ubopoaloading}
              success={ubopoasuccess}
              loading={ubopoaloading}
              onClick={handleUboidClick}
            >
              {" "}
              Update File
            </LoaderButton>
          </label>
        </div>
      );
    }
  }

  useEffect(() => {
    if (uploadedFinancials) {
      async function geturl() {
        var uploadext = uploadedFinancials.split(".").pop();
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
        const a = imageExtensions.includes(uploadext);
        if (a === true) {
          const b = await Storage.vault.get(uploadedFinancials);
          setFinancialsImg(b);
        } else {
          const c = await Storage.vault.get(uploadedFinancials);
          setFinancialspdf(c);
        }
      }
      geturl();
    }
  }, [uploadedFinancials]);

  function financialsisimageorpdf(financialsimg) {
    if (financialsimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={financialsimg} />
        </>
      );
    } else if (financialsimg == null) {
      return (
        <>
          <input
            name="financials_attachment"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={handleFinancialsChange}
          />
          <label htmlFor="financials_attachment">
            <LoaderButton
              id="financials_attachment"
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={financialsloading}
              success={financialssuccess}
              loading={financialsloading}
              onClick={handleFinancialsClick}
            >
              {" "}
              Company Financials*
            </LoaderButton>
          </label>
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={financialspdf}
          />
        </>
      );
    }
  }

  function handleRegcertChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteoldregcert();
    onRegcertChange(a);
  }

  async function deleteoldregcert() {
    await Storage.vault.remove(supplier_registration_cert_attachment);
  }

  async function onRegcertChange(a) {
    setRegcertSuccess(false);
    setRegcertLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedRegcert(u);
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
  }

  async function handleRegcertClick() {
    setRegcertSuccess(false);
    setRegcertLoading(true);
    const b = await regcertimg;
    if (b) {
      setRegcertSuccess(true);
      setRegcertLoading(false);
    }
  }

  function handleDirectoridChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteolddirectorid();
    onDirectoridChange(a);
  }

  async function deleteolddirectorid() {
    await Storage.vault.remove(director_id_attachment);
  }

  async function onDirectoridChange(a) {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedDirectorid(u);
      var director_id_attachment = u;
      const sortkey = directorId;
      const userId = sub;
      await updateSupplier({
        sortkey,
        userId,
        director_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectoridSuccess(true);
    setDirectoridLoading(false);
  }

  async function handleDirectoridClick() {
    setDirectoridSuccess(false);
    setDirectoridLoading(true);
    const b = await directoridimg;
    if (b) {
      setDirectoridSuccess(true);
      setDirectoridLoading(false);
    }
  }

  function handleDirectorpoaChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteolddirectorpoa();
    onDirectorpoaChange(a);
  }

  async function deleteolddirectorpoa() {
    await Storage.vault.remove(director_poa_attachment);
  }

  async function onDirectorpoaChange(a) {
    setDirectorpoaSuccess(false);
    setDirectorpoaLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedDirectorpoa(u);
      var director_poa_attachment = u;
      const sortkey = directorId;
      const userId = sub;
      await updateDirector({
        sortkey,
        directorId,
        userId,
        director_poa_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setDirectorpoaSuccess(true);
    setDirectorpoaLoading(false);
  }

  async function handleDirectorpoaClick() {
    setDirectorpoaSuccess(false);
    setDirectorpoaLoading(true);
    const b = await directorpoaimg;
    if (b) {
      setDirectorpoaSuccess(true);
      setDirectorpoaLoading(false);
    }
  }

  function handleUboidChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteolduboid();
    onUboidChange(a);
  }

  async function deleteolduboid() {
    await Storage.vault.remove(ubo_id_attachment);
  }

  async function onUboidChange(a) {
    setUboidSuccess(false);
    setUboidLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedUboid(u);
      var ubo_id_attachment = u;
      const sortkey = supplierId;
      const userId = sub;
      await updateUbo({
        sortkey,
        userId,
        ubo_id_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setUboidSuccess(true);
    setUboidLoading(false);
  }

  async function handleUboidClick() {
    setUboidSuccess(false);
    setUboidLoading(true);
    const b = await uboidimg;
    if (b) {
      setUboidSuccess(true);
      setUboidLoading(false);
    }
  }

  function handleUbopoaChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteoldubopoa();
    onUbopoaChange(a);
  }

  async function deleteoldubopoa() {
    await Storage.vault.remove(ubo_poa_attachment);
  }

  async function onUbopoaChange(a) {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedUbopoa(u);
      var ubo_poa_attachment = u;
      const sortkey = supplierId;
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
  }

  async function handleUbopoaClick() {
    setUbopoaSuccess(false);
    setUbopoaLoading(true);
    const b = await ubopoaimg;
    if (b) {
      setUbopoaSuccess(true);
      setUbopoaLoading(false);
    }
  }

  function handleFinancialsChange(event) {
    file.current = event.target.files[0];
    const a = file.current;
    deleteoldfinancials();
    onFinancialsChange(a);
  }

  async function deleteoldfinancials() {
    await Storage.vault.remove(financials_attachment);
  }

  async function onFinancialsChange(a) {
    setFinancialsSuccess(false);
    setFinancialsLoading(true);
    try {
      const u = a ? await s3Upload(a) : null;
      setUploadedFinancials(u);
      var financials_attachment = u;
      const sortkey = supplierId;
      const userId = sub;
      await updateSupplier({
        sortkey,
        userId,
        financials_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setFinancialsSuccess(true);
    setFinancialsLoading(false);
  }

  async function handleFinancialsClick() {
    setFinancialsSuccess(false);
    setFinancialsLoading(true);
    const b = await financialsimg;
    if (b) {
      setFinancialsSuccess(true);
      setFinancialsLoading(false);
    }
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
              <Grid item xs={6}>
                {regcertimg ? (
                  <>
                    <Typography>Company Registration Certificate</Typography>
                    {regcertisimageorpdf(regcertimg)}
                    <div>
                      <input
                        id="supplier_registration_cert_attachment"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleRegcertChange}
                      />
                      <label htmlFor="supplier_registration_cert_attachment">
                        <LoaderButton
                          id="supplier_registration_cert_attachment"
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
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item xs={6}>
                {directoridimg ? (
                  <>
                    <Typography>Company Director ID:</Typography>
                    {directoridisimageorpdf(directoridimg)}
                    <div>
                      <input
                        id="director_id_attachment"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleDirectoridChange}
                      />
                      <label htmlFor="director_id_attachment">
                        <LoaderButton
                          id="director_id_attachment"
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
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item xs={6}>
                {directorpoaimg ? (
                  <>
                    <Typography>Company Director Proof of Address:</Typography>
                    {directorpoaisimageorpdf(directorpoaimg)}
                    <div>
                      <input
                        id="director_poa_attachment"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleDirectorpoaChange}
                      />
                      <label htmlFor="director_poa_attachment">
                        <LoaderButton
                          id="director_poa_attachment"
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
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item xs={6}>
                {uboidimg ? (
                   <>
                    <Typography>Company Owner ID:</Typography>
                      {uboidisimageorpdf(uboidimg)}
                    </>
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item xs={6}>
                {ubopoaimg ? (
                  <>
                    <Typography>Company Owner Proof of Address:</Typography>
                    {ubopoaisimageorpdf()}
                    <div>
                      <input
                        id="ubo_poa_attachment"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleUboidChange}
                      />
                      <label htmlFor="ubo_poa_attachment">
                        <LoaderButton
                          id="ubo_poa_attachment"
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
                ) : (
                  <></>
                )}
              </Grid>

              <Grid item xs={6}>
                {financialsimg ? (
                  <>
                    <Typography>Company Financials</Typography>
                    {financialsisimageorpdf(financialsimg)}
                    <div>
                      <input
                        id="financials_attachment"
                        accept="image/*"
                        style={{ display: "none" }}
                        type="file"
                        onChange={handleFinancialsChange}
                      />
                      <label htmlFor="financials_attachment">
                        <LoaderButton
                          id="financials_attachment"
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
                ) : (
                  <></>
                )}
              </Grid>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
}

export default SupplierUploads;
