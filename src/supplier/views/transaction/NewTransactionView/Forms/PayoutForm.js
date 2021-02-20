import React, { useEffect, useState } from "react";
import { InputField, DatePickerField } from "src/components/FormFields";
import NewUploadField from "src/components/FormFields/NewUploadField.js";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import SelectListField from "src/components/FormFields/SelectListField.jsx";
import { Upload as UploadIcon } from "react-feather";
import { useFormikContext } from "formik";
import { Storage } from "aws-amplify";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import currencies from "src/components/FormLists/currencies.js";
import { addDays, subDays } from "date-fns";

const curr = currencies;
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
export default function PayoutForm(props) {
  const classes = useStyles();

  const {
    formField: {
      purchase_order_attachment,
      sold_goods_description,
      invoice_amount,
      invoice_currency,
      invoice_date,
      invoice_due_date,
      invoice_attachment,
      offer_notice_attachment,
      ipu_attachment,
      cargo_insurance_name,
      cargo_insurance_attachment,
      bill_of_lading_attachment,
    },
  } = props;

  const userId = props.vuser;
  const requestId = props.vrequest;
  const { values: formValues } = useFormikContext();
  const updatefields = { values: formValues };

  const updateinvoice = updatefields.values.invoice_attachment;
  const updatepo = updatefields.values.purchase_order_attachment;
  const updateoffer = updatefields.values.offer_notice_attachment;
  const updateipu = updatefields.values.ipu_attachment;
  const updatecargo = updatefields.values.cargo_insurance_attachment;
  const updatebl = updatefields.values.bill_of_lading_attachment;

  const [invoiceimg, setInvoiceImg] = useState("");
  const [invoicepdf, setInvoicepdf] = useState("");
  const [poimg, setPoImg] = useState("");
  const [popdf, setPopdf] = useState("");
  const [offerimg, setOfferImg] = useState("");
  const [offerpdf, setOfferpdf] = useState("");
  const [ipuimg, setIpuImg] = useState("");
  const [ipupdf, setIpupdf] = useState("");
  const [cargoimg, setCargoImg] = useState("");
  const [cargopdf, setCargopdf] = useState("");
  const [blimg, setBlImg] = useState("");
  const [blpdf, setBlpdf] = useState("");

  const [invoiceloading, setInvoiceLoading] = useState(false);
  const [invoicesuccess, setInvoiceSuccess] = useState(false);
  const [poloading, setPoLoading] = useState(false);
  const [posuccess, setPoSuccess] = useState(false);
  const [offerloading, setOfferLoading] = useState(false);
  const [offersuccess, setOfferSuccess] = useState(false);
  const [ipuloading, setIpuLoading] = useState(false);
  const [ipusuccess, setIpuSuccess] = useState(false);
  const [cargoloading, setCargoLoading] = useState(false);
  const [cargosuccess, setCargoSuccess] = useState(false);
  const [blloading, setBlLoading] = useState(false);
  const [blsuccess, setBlSuccess] = useState(false);

  useEffect(() => {
    if (updateinvoice) {
      async function geturl() {
        var uploadext = updateinvoice.split(".").pop();
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
          const b = await Storage.vault.get(updateinvoice);
          setInvoiceImg(b);
        } else {
          const c = await Storage.vault.get(updateinvoice);
          setInvoicepdf(c);
        }
      }
      geturl();
    }
  }, [updateinvoice]);

  function invoiceisimageorpdf() {
    if (invoiceimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={invoiceimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={invoicepdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (updatepo) {
      async function geturl() {
        var uploadext = updatepo.split(".").pop();
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
        const d = imageExtensions.includes(uploadext);
        if (d === true) {
          const e = await Storage.vault.get(updatepo);
          setPoImg(e);
        } else {
          const f = await Storage.vault.get(updatepo);
          setPopdf(f);
        }
      }
      geturl();
    }
  }, [updatepo]);

  function poisimageorpdf() {
    if (poimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={poimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={popdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (updateoffer) {
      async function geturl() {
        var uploadext = updateoffer.split(".").pop();
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
          const h = await Storage.vault.get(updateoffer);
          setOfferImg(h);
        } else {
          const i = await Storage.vault.get(updateoffer);
          setOfferpdf(i);
        }
      }
      geturl();
    }
  }, [updateoffer]);

  function offerisimageorpdf() {
    if (offerimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={offerimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={offerpdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (updateipu) {
      async function geturl() {
        var uploadext = updateipu.split(".").pop();
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
        const j = imageExtensions.includes(uploadext);
        if (j === true) {
          const k = await Storage.vault.get(updateipu);
          setIpuImg(k);
        } else {
          const l = await Storage.vault.get(updateipu);
          setIpupdf(l);
        }
      }
      geturl();
    }
  }, [updateipu]);

  function ipuisimageorpdf() {
    if (ipuimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={ipuimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={ipupdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (updatecargo) {
      async function geturl() {
        var uploadext = updatecargo.split(".").pop();
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
        const m = imageExtensions.includes(uploadext);
        if (m === true) {
          const n = await Storage.vault.get(updatecargo);
          setCargoImg(n);
        } else {
          const o = await Storage.vault.get(updatecargo);
          setCargopdf(o);
        }
      }
      geturl();
    }
  }, [updatecargo]);

  function cargoisimageorpdf() {
    if (cargoimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={cargoimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={cargopdf}
          />
        </>
      );
    }
  }

  useEffect(() => {
    if (updatebl) {
      async function geturl() {
        var uploadext = updatebl.split(".").pop();
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
        const p = imageExtensions.includes(uploadext);
        if (p === true) {
          const q = await Storage.vault.get(updatebl);
          setBlImg(q);
        } else {
          const r = await Storage.vault.get(updatebl);
          setBlpdf(r);
        }
      }
      geturl();
    }
  }, [updatebl]);

  function blisimageorpdf() {
    if (blimg) {
      return (
        <>
          <img className={classes.img} alt="complex" src={blimg} />
        </>
      );
    } else {
      return (
        <>
          <iframe
            title="file"
            style={{ width: "100%", height: "100%" }}
            src={blpdf}
          />
        </>
      );
    }
  }

  async function handleBlClick() {
    setBlSuccess(false);
    setBlLoading(true);
    const b = await blimg;
    if (b) {
      setBlSuccess(true);
      setBlLoading(false);
    }
  }

  async function handleCargoClick() {
    setCargoSuccess(false);
    setCargoLoading(true);
    const b = await cargoimg;
    if (b) {
      setCargoSuccess(true);
      setCargoLoading(false);
    }
  }

  async function handleIpuClick() {
    setIpuSuccess(false);
    setIpuLoading(true);
    const b = await ipuimg;
    if (b) {
      setIpuSuccess(true);
      setIpuLoading(false);
    }
  }

  async function handleOfferClick() {
    setOfferSuccess(false);
    setOfferLoading(true);
    const b = await offerimg;
    if (b) {
      setOfferSuccess(true);
      setOfferLoading(false);
    }
  }

  async function handlePoClick() {
    setPoSuccess(false);
    setPoLoading(true);
    const b = await poimg;
    if (b) {
      setPoSuccess(true);
      setPoLoading(false);
    }
  }

  async function handleInvoiceClick() {
    setInvoiceSuccess(false);
    setInvoiceLoading(true);
    const b = await invoiceimg;
    if (b) {
      setInvoiceSuccess(true);
      setInvoiceLoading(false);
    }
  }

  return (
    <React.Fragment>
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              {updateinvoice ? (
                <>{invoiceisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={invoice_attachment.name}
                    id={invoice_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={requestId}
                    userid={userId}
                  />
                  <label htmlFor={invoice_attachment.name}>
                    <LoaderButton
                      id={invoice_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={invoiceloading}
                      success={invoicesuccess}
                      loading={invoiceloading}
                      onClick={handleInvoiceClick}
                    >
                      {" "}
                      Invoice*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {updatepo ? (
                <>{poisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={purchase_order_attachment.name}
                    id={purchase_order_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={requestId}
                    userid={userId}
                  />
                  <label htmlFor={purchase_order_attachment.name}>
                    <LoaderButton
                      id={purchase_order_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={poloading}
                      success={posuccess}
                      loading={poloading}
                      onClick={handlePoClick}
                    >
                      {" "}
                      Purchase Order
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {updateoffer ? (
                <>{offerisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={offer_notice_attachment.name}
                    id={offer_notice_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={requestId}
                    userid={userId}
                  />
                  <label htmlFor={offer_notice_attachment.name}>
                    <LoaderButton
                      id={offer_notice_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={offerloading}
                      success={offersuccess}
                      loading={offerloading}
                      onClick={handleOfferClick}
                    >
                      {" "}
                      Offer File*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {updateipu ? (
                <>{ipuisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={ipu_attachment.name}
                    id={ipu_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={requestId}
                    userid={userId}
                  />
                  <label htmlFor={ipu_attachment.name}>
                    <LoaderButton
                      id={ipu_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={ipuloading}
                      success={ipusuccess}
                      loading={ipuloading}
                      onClick={handleIpuClick}
                    >
                      {" "}
                      IPU File*
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              {updatebl ? (
                <>{blisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={bill_of_lading_attachment.name}
                    id={bill_of_lading_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={requestId}
                    userid={userId}
                  />
                  <label htmlFor={bill_of_lading_attachment.name}>
                    <LoaderButton
                      id={bill_of_lading_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={blloading}
                      success={blsuccess}
                      loading={blloading}
                      onClick={handleBlClick}
                    >
                      {" "}
                      Bill of Lading
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {updatecargo ? (
                <>{cargoisimageorpdf()}</>
              ) : (
                <>
                  <NewUploadField
                    name={cargo_insurance_attachment.name}
                    id={cargo_insurance_attachment.name}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    ident={requestId}
                    userid={userId}
                  />
                  <label htmlFor={cargo_insurance_attachment.name}>
                    <LoaderButton
                      id={cargo_insurance_attachment.name}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={cargoloading}
                      success={cargosuccess}
                      loading={cargoloading}
                      onClick={handleCargoClick}
                    >
                      {" "}
                      Cargo Insurance
                    </LoaderButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={invoice_amount.name}
                label={invoice_amount.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectListField
                name={invoice_currency.name}
                label={invoice_currency.label}
                data={curr}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={invoice_date.name}
                label={invoice_date.label}
                format="dd/MM/yyyy"
                minDate={subDays(new Date(), 30)}
                maxDate={new Date()}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerField
                name={invoice_due_date.name}
                label={invoice_due_date.label}
                format="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={addDays(new Date(), 270)}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={sold_goods_description.name}
                label={sold_goods_description.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name={cargo_insurance_name.name}
                label={cargo_insurance_name.label}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
