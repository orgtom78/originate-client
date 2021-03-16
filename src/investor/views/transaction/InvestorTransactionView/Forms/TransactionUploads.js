import React, { useState, useEffect } from "react";
import "date-fns";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { API, graphqlOperation } from "aws-amplify";
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
    const userId = value.value.userId;
    const sortkey = value.value.requestId;
    getTransaction({ userId, sortkey });
  }, [value.value.userId, value.value.requestId]);

  async function getTransaction(input) {
    try {
      const request = await API.graphql(
        graphqlOperation(queries.getRequest, input)
      );
      const {
        data: {
          getRequest: {
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
      setSub(userId);
      setRequestId(requestId);
      setIdentityId(identityId);
      setInvoice_attachment(invoice_attachment);
      setPurchase_order_attachment(purchase_order_attachment);
      setOffer_notice_attachment(offer_notice_attachment);
      setIpu_attachment(ipu_attachment);
      setBill_of_lading_attachment(bill_of_lading_attachment);
      setCargo_insurance_attachment(cargo_insurance_attachment)
    } catch (err) {
      console.log("error fetching data..", err);
    }
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
            <Button
              variant="contained"
              label="Download"
              color="primary"
              target="_blank"
              onClick={() => window.open(invoiceimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(invoicepdf, "_blank")}
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(purchaseoimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(purchaseopdf, "_blank")}
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(offernimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(offernpdf, "_blank")}
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(ipuimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(ipupdf, "_blank")}
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(blimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(blpdf, "_blank")}
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(cargoiimg, "_blank")}
            >
              Download
            </Button>
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
            <Button
              variant="contained"
              color="primary"
              label="Download"
              target="_blank"
              onClick={() => window.open(cargoipdf, "_blank")}
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
