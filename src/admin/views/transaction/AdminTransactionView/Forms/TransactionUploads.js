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

function BuyerUploads(value) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [sub, setSub] = useState("");
  const [requestId, setRequestId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [invoice_attachment, setInvoice_attachment] = useState("");
  const [purchase_order_attachment, setPurchase_order_attachment] = useState(
    ""
  );
  const [offer_notice_attachment, setOffer_notice_attachment] = useState("");
  const [ipu_attachment, setIpu_attachment] = useState("");
  const [bill_of_lading_attachment, setBill_of_lading_attachment] = useState(
    ""
  );
  const [cargo_insurance_attachment, setCargo_insurance_attachment] = useState(
    ""
  );
  const [invoiceloading, setInvoiceLoading] = useState(false);
  const [invoicesuccess, setInvoiceSuccess] = useState(false);
  const [purchaseoloading, setPurchaseoLoading] = useState(false);
  const [purchaseosuccess, setPurchaseoSuccess] = useState(false);
  const [offernloading, setOffernLoading] = useState(false);
  const [offernsuccess, setOffernSuccess] = useState(false);
  const [ipuloading, setIpuLoading] = useState(false);
  const [ipusuccess, setIpuSuccess] = useState(false);
  const [blloading, setBlLoading] = useState(false);
  const [blsuccess, setBlSuccess] = useState(false);
  const [cargoiloading, setCargoiLoading] = useState(false);
  const [cargoisuccess, setCargoiSuccess] = useState(false);

  const [invoiceimg, setInvoiceImg] = useState("");
  const [invoicepdf, setInvoicepdf] = useState("");
  const [purchaseoimg, setPurchaseoImg] = useState("");
  const [purchaseopdf, setPurchaseopdf] = useState("");
  const [offernimg, setOffernImg] = useState("");
  const [offernpdf, setOffernpdf] = useState("");
  const [ipuimg, setIpuImg] = useState("");
  const [ipupdf, setIpupdf] = useState("");
  const [blimg, setBlImg] = useState("");
  const [blpdf, setBlpdf] = useState("");
  const [cargoiimg, setCargoiImg] = useState("");
  const [cargoipdf, setCargoipdf] = useState("");

  const file = useRef(null);

  const invoicelabel = "invoice_attachment";
  const invoicename = "Invoice";
  const purchaseolabel = "purchase_order_attachment";
  const purchaseoname = "Purchase Order";
  const offernlabel = "offer_notice_attachment";
  const offernname = "Offer Notice";
  const ipulabel = "ipu_attachment";
  const ipuname = "IPU";
  const bllabel = "bill_of_lading_attachment";
  const blname = "Bill of lading";
  const cargoilabel = "cargo_insurance_attachment";
  const cargoiname = "Cargo Insurance";

  useEffect(() => {
    const id = value.value.value
    getTransaction({id});
  }, [value]);

  async function getTransaction(input) {
    try {
      const request = await API.graphql(
        graphqlOperation(queries.getRequest, input)
      );
      const {
        data: {
          getRequest: {
            id,
            identityId,
            userId,
            requestId,
            invoice_attachment,
            purchase_order_attachment,
            offer_notice_attachment,
            ipu_attachment,
            bill_of_lading_attachment,
            cargo_insurance_attachment
          },
        },
      } = request;
      setId(id);
      setSub(userId);
      setRequestId(requestId);
      setIdentityId(identityId);
      setInvoice_attachment(invoice_attachment);
      setPurchase_order_attachment(purchase_order_attachment);
      setOffer_notice_attachment(offer_notice_attachment);
      setIpu_attachment(ipu_attachment);
      setBill_of_lading_attachment(bill_of_lading_attachment);
      setCargo_insurance_attachment(cargo_insurance_attachment);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function s3Up(file, name) {
    var fileExtension = file.name.split(".").pop();
    const filename = `${sub}${requestId}${name}.${fileExtension}`;

    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  function updateRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.updateRequest, { input: input })
    );
  }

  useEffect(() => {
    if (invoice_attachment) {
      async function getinvoiceimgurl() {
        var uploadext = invoice_attachment.split(".").pop();
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
          const y = await Storage.get(invoice_attachment, {
            level: "private",
            identityId: identityId,
          });
          setInvoiceImg(y);
        }
      }
      getinvoiceimgurl();
    }
  }, [invoice_attachment, identityId]);

  useEffect(() => {
    if (invoice_attachment) {
      async function getinvoicepdfurl() {
        var uploadext = invoice_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(invoice_attachment, {
            level: "private",
            identityId: identityId,
          });
          setInvoicepdf(y);
        }
      }
      getinvoicepdfurl();
    }
  }, [invoice_attachment, identityId]);

  function invoiceisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(invoiceimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={invoiceimg} />
          <div>
            <input
              id={invoiceimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleinvoiceChange(event)}
            />
            <label htmlFor={invoiceimg}>
              <LoaderButton
                id={invoiceimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={invoiceloading}
                success={invoicesuccess}
                loading={invoiceloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(invoicepdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={invoicepdf}
          />
          <div>
            <input
              id={invoicepdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleinvoiceChange(event)}
            />
            <label htmlFor={invoicepdf}>
              <LoaderButton
                id={invoicepdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={invoiceloading}
                success={invoicesuccess}
                loading={invoiceloading}
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
            onChange={(event) => handleinvoiceChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={invoiceloading}
              success={invoicesuccess}
              loading={invoiceloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleinvoiceChange(event) {
    file.current = event.target.files[0];
    const newinvoicefile = file.current;
    oninvoiceChange(newinvoicefile);
  }

  async function oninvoiceChange(newfile) {
    setInvoiceSuccess(false);
    setInvoiceLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, "invoice_attachment") : null;
      var invoice_attachment = u;
      await updateRequest({
        id,
        invoice_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setInvoiceSuccess(true);
    setInvoiceLoading(false);
    navigate("/admin/transactions");
  }

  useEffect(() => {
    if (purchase_order_attachment) {
      async function getpurchaseoistimgurl() {
        var uploadext = purchase_order_attachment.split(".").pop();
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
          const y = await Storage.get(purchase_order_attachment, {
            level: "private",
            identityId: identityId,
          });
          setPurchaseoImg(y);
        }
      }
      getpurchaseoistimgurl();
    }
  }, [purchase_order_attachment, identityId]);

  useEffect(() => {
    if (purchase_order_attachment) {
      async function getpurchaseoistpdfurl() {
        var uploadext = purchase_order_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(purchase_order_attachment, {
            level: "private",
            identityId: identityId,
          });
          setPurchaseopdf(y);
        }
      }
      getpurchaseoistpdfurl();
    }
  }, [purchase_order_attachment, identityId]);

  function purchaseoisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(purchaseoimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={purchaseoimg} />
          <div>
            <input
              id={purchaseoimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlepurchaseoChange(event)}
            />
            <label htmlFor={purchaseoimg}>
              <LoaderButton
                id={purchaseoimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={purchaseoloading}
                success={purchaseosuccess}
                loading={purchaseoloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(purchaseopdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={purchaseopdf}
          />
          <div>
            <input
              id={purchaseopdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlepurchaseoChange(event)}
            />
            <label htmlFor={purchaseopdf}>
              <LoaderButton
                id={purchaseopdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={purchaseoloading}
                success={purchaseosuccess}
                loading={purchaseoloading}
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
            onChange={(event) => handlepurchaseoChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={purchaseoloading}
              success={purchaseosuccess}
              loading={purchaseoloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handlepurchaseoChange(event) {
    file.current = event.target.files[0];
    const newpurchaseofile = file.current;
    onpurchaseoChange(newpurchaseofile);
  }

  async function onpurchaseoChange(newfile) {
    setPurchaseoSuccess(false);
    setPurchaseoLoading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "purchase_order_attachment")
        : null;
      var purchase_order_attachment = u;
      await updateRequest({
        id,
        purchase_order_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setPurchaseoSuccess(true);
    setPurchaseoLoading(false);
    navigate("/admin/transactions");
  }

  useEffect(() => {
    if (offer_notice_attachment) {
      async function getoffernistimgurl() {
        var uploadext = offer_notice_attachment.split(".").pop();
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
          const y = await Storage.get(offer_notice_attachment, {
            level: "private",
            identityId: identityId,
          });
          setOffernImg(y);
        }
      }
      getoffernistimgurl();
    }
  }, [offer_notice_attachment, identityId]);

  useEffect(() => {
    if (offer_notice_attachment) {
      async function getoffernistpdfurl() {
        var uploadext = offer_notice_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(offer_notice_attachment, {
            level: "private",
            identityId: identityId,
          });
          setOffernpdf(y);
        }
      }
      getoffernistpdfurl();
    }
  }, [offer_notice_attachment, identityId]);

  function offernisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(offernimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={offernimg} />
          <div>
            <input
              id={offernimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleoffernChange(event)}
            />
            <label htmlFor={offernimg}>
              <LoaderButton
                id={offernimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={offernloading}
                success={offernsuccess}
                loading={offernloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(offernpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={offernpdf}
          />
          <div>
            <input
              id={offernpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleoffernChange(event)}
            />
            <label htmlFor={offernpdf}>
              <LoaderButton
                id={offernpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={offernloading}
                success={offernsuccess}
                loading={offernloading}
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
            onChange={(event) => handleoffernChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={offernloading}
              success={offernsuccess}
              loading={offernloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleoffernChange(event) {
    file.current = event.target.files[0];
    const newoffernfile = file.current;
    onoffernChange(newoffernfile);
  }

  async function onoffernChange(newfile) {
    setOffernSuccess(false);
    setOffernLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, "offer_notice_attachment") : null;
      var offer_notice_attachment = u;
      await updateRequest({
        id,
        offer_notice_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setOffernSuccess(true);
    setOffernLoading(false);
    navigate("/admin/transactions");
  }

  useEffect(() => {
    if (ipu_attachment) {
      async function getipuimgurl() {
        var uploadext = ipu_attachment.split(".").pop();
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
          const y = await Storage.get(ipu_attachment, {
            level: "private",
            identityId: identityId,
          });
          setIpuImg(y);
        }
      }
      getipuimgurl();
    }
  }, [ipu_attachment, identityId]);

  useEffect(() => {
    if (ipu_attachment) {
      async function getipupdfurl() {
        var uploadext = ipu_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(ipu_attachment, {
            level: "private",
            identityId: identityId,
          });
          setIpupdf(y);
        }
      }
      getipupdfurl();
    }
  }, [ipu_attachment, identityId]);

  function ipuisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(ipuimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ipuimg} />
          <div>
            <input
              id={ipuimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleipuChange(event)}
            />
            <label htmlFor={ipuimg}>
              <LoaderButton
                id={ipuimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ipuloading}
                success={ipusuccess}
                loading={ipuloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(ipupdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={ipupdf}
          />
          <div>
            <input
              id={ipupdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleipuChange(event)}
            />
            <label htmlFor={ipupdf}>
              <LoaderButton
                id={ipupdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={ipuloading}
                success={ipusuccess}
                loading={ipuloading}
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
            onChange={(event) => handleipuChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={ipuloading}
              success={ipusuccess}
              loading={ipuloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleipuChange(event) {
    file.current = event.target.files[0];
    const newipufile = file.current;
    onipuChange(newipufile);
  }

  async function onipuChange(newfile) {
    setIpuSuccess(false);
    setIpuLoading(true);
    try {
      const u = newfile ? await s3Up(newfile, "ipu_attachment") : null;
      var ipu_attachment = u;
      await updateRequest({
        id,
        ipu_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setIpuSuccess(true);
    setIpuLoading(false);
    navigate("/admin/transactions");
  }

  useEffect(() => {
    if (bill_of_lading_attachment) {
      async function getblimgurl() {
        var uploadext = bill_of_lading_attachment.split(".").pop();
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
          const y = await Storage.get(bill_of_lading_attachment, {
            level: "private",
            identityId: identityId,
          });
          setBlImg(y);
        }
      }
      getblimgurl();
    }
  }, [bill_of_lading_attachment, identityId]);

  useEffect(() => {
    if (bill_of_lading_attachment) {
      async function getblpdfurl() {
        var uploadext = bill_of_lading_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(bill_of_lading_attachment, {
            level: "private",
            identityId: identityId,
          });
          setBlpdf(y);
        }
      }
      getblpdfurl();
    }
  }, [bill_of_lading_attachment, identityId]);

  function blisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(blimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={blimg} />
          <div>
            <input
              id={blimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleblChange(event)}
            />
            <label htmlFor={blimg}>
              <LoaderButton
                id={blimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={blloading}
                success={blsuccess}
                loading={blloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(blpdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={blpdf}
          />
          <div>
            <input
              id={blpdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handleblChange(event)}
            />
            <label htmlFor={blpdf}>
              <LoaderButton
                id={blpdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={blloading}
                success={blsuccess}
                loading={blloading}
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
            name={name}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handleblChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={blloading}
              success={blsuccess}
              loading={blloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handleblChange(event) {
    file.current = event.target.files[0];
    const newblfile = file.current;
    onblChange(newblfile);
  }

  async function onblChange(newfile) {
    setBlSuccess(false);
    setBlLoading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "bill_of_lading_attachment")
        : null;
      var bill_of_lading_attachment = u;
      await updateRequest({
        id,
        bill_of_lading_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setBlSuccess(true);
    setBlLoading(false);
    navigate("/admin/transactions");
  }

  useEffect(() => {
    if (cargo_insurance_attachment) {
      async function getcargoiimgurl() {
        var uploadext = cargo_insurance_attachment.split(".").pop();
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
          const y = await Storage.get(cargo_insurance_attachment, {
            level: "private",
            identityId: identityId,
          });
          setCargoiImg(y);
        }
      }
      getcargoiimgurl();
    }
  }, [cargo_insurance_attachment, identityId]);

  useEffect(() => {
    if (cargo_insurance_attachment) {
      async function getcargoipdfurl() {
        var uploadext = cargo_insurance_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        const x = imageExtensions.includes(uploadext);
        if (x === true) {
          const y = await Storage.get(cargo_insurance_attachment, {
            level: "private",
            identityId: identityId,
          });
          setCargoipdf(y);
        }
      }
      getcargoipdfurl();
    }
  }, [cargo_insurance_attachment, identityId]);

  function cargoiisimageorpdf(label, name) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(cargoiimg)) {
      return (
        <>
          <img className={classes.img} alt="complex" src={cargoiimg} />
          <div>
            <input
              id={cargoiimg}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlecargoiChange(event)}
            />
            <label htmlFor={cargoiimg}>
              <LoaderButton
                id={cargoiimg}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={cargoiloading}
                success={cargoisuccess}
                loading={cargoiloading}
              >
                {" "}
                Update File
              </LoaderButton>
            </label>
          </div>
        </>
      );
    } else if (regex.test(cargoipdf)) {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            allowFullScreen
            src={cargoipdf}
          />
          <div>
            <input
              id={cargoipdf}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => handlecargoiChange(event)}
            />
            <label htmlFor={cargoipdf}>
              <LoaderButton
                id={cargoipdf}
                fullWidth
                component="span"
                startIcon={<UploadIcon />}
                disabled={cargoiloading}
                success={cargoisuccess}
                loading={cargoiloading}
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
            name={name}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handlecargoiChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={cargoiloading}
              success={cargoisuccess}
              loading={cargoiloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handlecargoiChange(event) {
    file.current = event.target.files[0];
    const newcargoifile = file.current;
    oncargoiChange(newcargoifile);
  }

  async function oncargoiChange(newfile) {
    setCargoiSuccess(false);
    setCargoiLoading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "cargo_insurance_attachment")
        : null;
      var cargo_insurance_attachment = u;
      await updateRequest({
        id,
        cargo_insurance_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setCargoiSuccess(true);
    setCargoiLoading(false);
    navigate("/admin/transactions");
  }

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Transaction Documents
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Invoice:</Typography>
                  {invoiceisimageorpdf(invoicelabel, invoicename)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Purchase Order:</Typography>
                  {purchaseoisimageorpdf(purchaseolabel, purchaseoname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Offer Notice:</Typography>
                  {offernisimageorpdf(offernlabel, offernname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>IPU:</Typography>
                  {ipuisimageorpdf(ipulabel, ipuname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Bill of lading:</Typography>
                  {blisimageorpdf(bllabel, blname)}
                </>
              </Grid>
              <Grid item md={12} xs={12}>
                <>
                  <Typography>Cargo Insurance:</Typography>
                  {cargoiisimageorpdf(cargoilabel, cargoiname)}
                </>
              </Grid>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
}

export default BuyerUploads;
