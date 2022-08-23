import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  getIn,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import currencies from "src/components/FormLists/currencies.js";
import * as mutations from "src/graphql/mutations.js";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import LoaderButton from "src/components/LoaderButton.js";
import { Upload as UploadIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import DOMPurify from "dompurify";
import { useUser } from "src/components/context/usercontext.js";

import Page from "src/components/Page";

const curr = currencies;

const validationSchema = Yup.object().shape({
  invoice: Yup.array().of(
    Yup.object().shape({
      invoice_amount: Yup.string().required("Invoice Amount is required"),
      sold_goods_description: Yup.string().required("Description is required"),
      currency: Yup.string().required("Currency is required"),
      invoice_date: Yup.string().required("Invoice Date is required"),
      invoice_due_date: Yup.string().required("Invoice Due Date is required"),
      invoice_number: Yup.string().required("Invoice Number is required"),
      invoice_attachment: Yup.object().shape({
        value: Yup.string().required("Invoice is required"),
        loading: Yup.boolean(),
        success: Yup.boolean(),
      }),
      bill_of_lading_attachment: Yup.object().shape({
        value: Yup.string().required("BL is required"),
        loading: Yup.boolean(),
        success: Yup.boolean(),
      }),
    })
  ),
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  invoice_attachment: {
    margin: theme.spacing(1),
  },
  field: {
    margin: theme.spacing(1),
  },
}));

export default function MyForm() {
  const classes = useStyles();
  const { buyId } = useParams();
  const { supId } = useParams();
  const { id } = useParams();
  const context = useUser();
  const navigate = useNavigate();
  const [number_of_invoices, setNumber_of_invoices] = useState("");

  const [esign_template_ipu, setEsign_template_ipu] = useState("");
  const [ipu_buyer_action_id, setIpu_buyer_action_id] = useState("");
  const [ipu_supplier_action_id, setIpu_supplier_action_id] = useState("");

  const [esign_template_offer, setEsign_template_offer] = useState("");
  const [offer_supplier_action_id, setOffer_supplier_action_id] = useState("");

  const [ipu_signature_email, setIpu_signature_email] = useState("");
  const [ipu_email_error, setIpu_email_error] = useState(true);

  const [ident, setIdent] = useState("");
  const [userId, setUserId] = useState("");
  const [investid, setInvestid] = useState("");
  const [brokerid, setBrokerid] = useState("");
  const [spvid, setSpvid] = useState("");
  const [buyername, setBuyername] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [supplier_contact_email, setSupplier_contact_email] = useState("");

  const [investEmail, setInvestEmail] = useState("");
  const [buyer_loan_discount_fee, setBuyer_loan_discount_fee] = useState("");
  const [buyer_loan_transaction_fee, setBuyer_loan_transaction_fee] =
    useState("");
  const [buyer_loan_broker_fee, setBuyer_loan_broker_fee] = useState("");
  const [buyer_loan_rate, setBuyer_loan_rate] = useState("");
  const [dynamic_discount, setDynamic_discount] = useState("");
  const [sofr, setSofr] = useState([]);
  const [esignobj, setEsignobj] = useState({
    InvoiceNo1: "",
    InvoiceDate1: "",
    InvoiceCurr1: "",
    InvoiceDD1: "",
    InvoiceFV1: "",
    InvoiceNo2: "",
    InvoiceDate2: "",
    InvoiceCurr2: "",
    InvoiceDD2: "",
    InvoiceFV2: "",
    InvoiceNo3: "",
    InvoiceDate3: "",
    InvoiceCurr3: "",
    InvoiceDD3: "",
    InvoiceFV3: "",
    InvoiceNo4: "",
    InvoiceDate4: "",
    InvoiceCurr4: "",
    InvoiceDD4: "",
    InvoiceFV4: "",
    InvoiceNo5: "",
    InvoiceDate5: "",
    InvoiceCurr5: "",
    InvoiceDD5: "",
    InvoiceFV5: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const buyer = await getbuyername({ id });
      const {
        data: {
          getBuyer: {
            buyer_name,
            investorId,
            brokerId,
            spvId,
            identityId,
            buyer_loan_discount_fee,
            buyer_loan_transaction_fee,
            buyer_loan_broker_fee,
            buyer_loan_rate,
          },
        },
      } = buyer;
      const buyername = await buyer_name;
      setIdent(identityId);
      setInvestid(investorId);
      setBrokerid(brokerId);
      setSpvid(spvId);
      setBuyername(buyername);
      setBuyer_loan_discount_fee(buyer_loan_discount_fee);
      setBuyer_loan_transaction_fee(buyer_loan_transaction_fee);
      setBuyer_loan_broker_fee(buyer_loan_broker_fee);
      setBuyer_loan_rate(buyer_loan_rate);
    }
    load();
  }, [id]);

  function getbuyername(input) {
    return API.graphql(graphqlOperation(queries.getBuyer, input));
  }

  useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { sub, identity, supplier_name, supplier_contact_email } = data;
      setIdent(identity);
      setSupplier_contact_email(supplier_contact_email);
      setSuppliername(supplier_name);
      setUserId(sub);
    }
    onLoad();
  }, [context]);

  useEffect(() => {
    async function load() {
      const investor = await getInvestoremail(investid);
      const {
        data: {
          listInvestors: { items: itemsPage1, nextToken },
        },
      } = investor;
      const n = { data: { listInvestors: { items: itemsPage1, nextToken } } };
      const res = n.data.listInvestors.items[0];
      const email = await res.investor_email;
      setInvestEmail(email);
    }
    load();
  }, [investid]);

  function getInvestoremail(input) {
    let filter = { userId: { eq: input } };
    return API.graphql(
      graphqlOperation(queries.listInvestors, { filter: filter })
    );
  }

  useEffect(() => {
    async function listSOFR() {
      const queryenddate = moment().utc().startOf("day").format("MM/DD/YYYY");
      const querystartdate = moment(queryenddate)
        .subtract(10, "days")
        .format("MM/DD/YYYY");
      let filter = { id: { between: [querystartdate, queryenddate] } };
      const {
        data: {
          listSOFRs: { items },
        },
      } = await API.graphql(
        graphqlOperation(queries.listSOFRs, { filter: filter })
      );
      if (items === null || items === undefined || items.length <= 0) {
        return 0;
      } else {
        const filteredarray = items.filter(
          (e) => moment(queryenddate).diff(moment(e.id), "days") >= 2
        );
        const d = filteredarray.sort(function (a, b) {
          return new Date(b.id) - new Date(a.id);
        });
        setSofr(d[0]);
      }
    }
    listSOFR();
  }, []);

  useEffect(() => {
    async function checkifmatch() {
      if (sofr === null || sofr === undefined || sofr.length <= 0) {
        return 0;
      } else {
        const sofrterm = buyer_loan_rate;
        if (sofrterm === "SOFR(1M)") {
          const dyndisc = Number(sofr.SOFRM1) + Number(buyer_loan_discount_fee);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(3M)") {
          const dyndisc = Number(sofr.SOFRM3) + Number(buyer_loan_discount_fee);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(Daily)") {
          const dyndisc = Number(sofr.SOFR) + Number(buyer_loan_discount_fee);
          setDynamic_discount(dyndisc);
        }
      }
    }
    checkifmatch();
  }, [sofr, buyer_loan_discount_fee, buyer_loan_rate]);

  useEffect(() => {
    async function getEsign() {
      try {
        let filter = {
          supplierId: { contains: supId },
          buyerId: { eq: buyId },
        };
        const {
          data: {
            listEsigns: { items: itemsPage1, nextToken },
          },
        } = await API.graphql(
          graphqlOperation(queries.listEsigns, { filter: filter })
        );
        const n = { data: { listEsigns: { items: itemsPage1, nextToken } } };
        const items = n.data.listEsigns.items[0];
        console.log(items);
        setEsign_template_ipu(items.esign_template_ipu);
        setIpu_buyer_action_id(items.ipu_buyer_action_id);
        setIpu_supplier_action_id(items.ipu_supplier_action_id);
        setEsign_template_offer(items.esign_template_offer);
        setOffer_supplier_action_id(items.offer_supplier_action_id);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getEsign();
  }, [supId, buyId]);

  const initialValues = {
    invoice: [
      {
        id: "request-" + uuid(),
        invoice_amount: "",
        sold_goods_description: "",
        currency: "",
        invoice_date: "",
        invoice_due_date: "",
        invoice_number: "",
        invoice_attachment: "",
        bill_of_lading_attachment: "",
        cargo_insurance_attachment: "",
        purchase_order_attachment: "",
      },
    ],
  };

  function handleNumberChange(e, field, values, setValues) {
    const invoice = [...values.invoice];
    const numberOfInvoices = e.target.value || 1;
    setNumber_of_invoices(e.target.value);
    const previousNumber = parseInt(field.value || 1);
    if (previousNumber < numberOfInvoices) {
      for (let i = previousNumber; i < numberOfInvoices; i++) {
        invoice.push({
          id: "request-" + uuid(),
          invoice_amount: "",
          sold_goods_description: "",
          currency: "",
          invoice_date: "",
          invoice_due_date: "",
          invoice_number: "",
          invoice_attachment: "",
          bill_of_lading_attachment: "",
          cargo_insurance_attachment: "",
          purchase_order_attachment: "",
        });
      }
    } else {
      for (let i = previousNumber; i >= numberOfInvoices; i--) {
        invoice.splice(i, 1);
      }
    }
    setValues({ ...values, invoice });
    // call formik onChange method
    field.onChange(e);
  }

  const DatePickerField = ({ ...props }) => {
    const [field, , { setValue }] = useField(props);
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setValue(moment(val).utc().startOf("day").toISOString());
          }}
          renderInput={(params) => (
            <TextField className={classes.field} fullWidth {...params} />
          )}
        />
      </LocalizationProvider>
    );
  };

  const UploadField = ({ ...props }) => {
    const [field, meta] = useField(props);
    const { touched, error } = meta;
    const { setFieldValue } = useFormikContext();
    const isError = touched && error && true;
    const file = useState(null);

    async function s3Up(file) {
      const userid = userId;
      const sectorid = props.sectorid;
      const name = props.name;
      var fileExtension = file.name.split(".").pop();
      const filename = `${userid}${sectorid}${name}.${fileExtension}`;
      const stored = await Storage.put(filename, file, {
        level: "private",
        identityId: ident,
        contentType: file.type,
      });
      return stored.key;
    }

    async function _onChange(event) {
      setFieldValue(props.id, { value: "", success: false, loading: true });
      file.current = event.target.files[0];
      const newfile = file.current ? await s3Up(file.current) : null;
      //setFieldValue(props.id, {value: file.current.name, success: true, loading: false});
      setFieldValue(props.id, {
        value: newfile,
        success: true,
        loading: false,
      });
    }

    return (
      <FormControl error={isError}>
        <input
          type="file"
          {...field}
          {...props}
          value={""}
          onChange={_onChange}
        />
      </FormControl>
    );
  };

  function updateEsignobj(invoices) {
    if (invoices.length === 1) {
      const object = {
        InvoiceNo1: invoices[0].invoice_number,
        InvoiceDate1: moment(invoices[0].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr1: invoices[0].currency,
        InvoiceDD1: moment(invoices[0].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV1: invoices[0].invoice_amount,
      };
      let newobj = {
        ...esignobj,
        ...object,
      };
      setEsignobj(newobj);
      return newobj;
    } else if (invoices.length === 2) {
      const object = {
        InvoiceNo1: invoices[0].invoice_number,
        InvoiceDate1: moment(invoices[0].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr1: invoices[0].currency,
        InvoiceDD1: moment(invoices[0].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV1: invoices[0].invoice_amount,
        InvoiceNo2: invoices[1].invoice_number,
        InvoiceDate2: moment(invoices[1].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr2: invoices[1].currency,
        InvoiceDD2: moment(invoices[1].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV2: invoices[1].invoice_amount,
      };
      let newobj = {
        ...esignobj,
        ...object,
      };
      setEsignobj(newobj);
      return newobj;
    } else if (invoices.length === 3) {
      const object = {
        InvoiceNo1: invoices[0].invoice_number,
        InvoiceDate1: moment(invoices[0].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr1: invoices[0].currency,
        InvoiceDD1: moment(invoices[0].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV1: invoices[0].invoice_amount,
        InvoiceNo2: invoices[1].invoice_number,
        InvoiceDate2: moment(invoices[1].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr2: invoices[1].currency,
        InvoiceDD2: moment(invoices[1].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV2: invoices[1].invoice_amount,
        InvoiceNo3: invoices[2].invoice_number,
        InvoiceDate3: moment(invoices[2].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr3: invoices[2].currency,
        InvoiceDD3: moment(invoices[2].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV3: invoices[2].invoice_amount,
      };
      let newobj = {
        ...esignobj,
        ...object,
      };
      setEsignobj(newobj);
      return newobj;
    } else if (invoices.length === 4) {
      const object = {
        InvoiceNo1: invoices[0].invoice_number,
        InvoiceDate1: moment(invoices[0].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr1: invoices[0].currency,
        InvoiceDD1: moment(invoices[0].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV1: invoices[0].invoice_amount,
        InvoiceNo2: invoices[1].invoice_number,
        InvoiceDate2: moment(invoices[1].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr2: invoices[1].currency,
        InvoiceDD2: moment(invoices[1].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV2: invoices[1].invoice_amount,
        InvoiceNo3: invoices[2].invoice_number,
        InvoiceDate3: moment(invoices[2].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr3: invoices[2].currency,
        InvoiceDD3: moment(invoices[2].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV3: invoices[2].invoice_amount,
        InvoiceNo4: invoices[3].invoice_number,
        InvoiceDate4: moment(invoices[3].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr4: invoices[3].currency,
        InvoiceDD4: moment(invoices[3].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV4: invoices[3].invoice_amount,
      };
      let newobj = {
        ...esignobj,
        ...object,
      };
      setEsignobj(newobj);
      return newobj;
    } else if (invoices.length === 5) {
      const object = {
        InvoiceNo1: invoices[0].invoice_number,
        InvoiceDate1: moment(invoices[0].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr1: invoices[0].currency,
        InvoiceDD1: moment(invoices[0].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV1: invoices[0].invoice_amount,
        InvoiceNo2: invoices[1].invoice_number,
        InvoiceDate2: moment(invoices[1].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr2: invoices[1].currency,
        InvoiceDD2: moment(invoices[1].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV2: invoices[1].invoice_amount,
        InvoiceNo3: invoices[2].invoice_number,
        InvoiceDate3: moment(invoices[2].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr3: invoices[2].currency,
        InvoiceDD3: moment(invoices[2].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV3: invoices[2].invoice_amount,
        InvoiceNo4: invoices[3].invoice_number,
        InvoiceDate4: moment(invoices[3].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr4: invoices[3].currency,
        InvoiceDD4: moment(invoices[3].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV4: invoices[3].invoice_amount,
        InvoiceNo5: invoices[4].invoice_number,
        InvoiceDate5: moment(invoices[4].invoice_date).format("MM/DD/YYYY"),
        InvoiceCurr5: invoices[4].currency,
        InvoiceDD5: moment(invoices[4].invoice_due_date).format("MM/DD/YYYY"),
        InvoiceFV5: invoices[4].invoice_amount,
      };
      let newobj = {
        ...esignobj,
        ...object,
      };
      setEsignobj(newobj);
      return newobj;
    }
  }

  async function _createSignRequest(values) {
    const invoices = values.invoice;
    const obj = updateEsignobj(invoices);
    const date = new moment().format("DD MMMM YYYY");
    const client = process.env.REACT_APP_ZOHO_CLIENT_ID;
    const secret = process.env.REACT_APP_ZOHO_CLIENT_SECRET;
    const token = process.env.REACT_APP_ZOHO_TOKEN;
    const auth = await fetch(
      `https://cors-anywhere-oc.herokuapp.com/https://accounts.zoho.com/oauth/v2/token?refresh_token=${token}&client_id=${client}&client_secret=${secret}&grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          Connection: "keep-alive",
        },
      }
    );
    const tokenData = await auth.json();
    const accessToken = await tokenData.access_token;
    const reqid = DOMPurify.sanitize(esign_template_ipu);
    console.log(reqid);
    // file deepcode ignore Ssrf: <please specify a reason of ignoring this>
    const res1 = await fetch(
      //`https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${reqid}/createdocument?testing=true`,
      `https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${reqid}/createdocument`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        body: new URLSearchParams({
          data: `{
            "templates": {
                "field_data": {
                    "field_text_data": {
                      "Date": "${date}",
                      "Invoice-No1": "${obj.InvoiceNo1}",
                      "Invoice-Date1": "${obj.InvoiceDate1}",
                      "Invoice-Curr1": "${obj.InvoiceCurr1}",
                      "Invoice-DD1": "${obj.InvoiceDD1}",
                      "Invoice-FV1": "${Number(obj.InvoiceFV1).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No2": "${obj.InvoiceNo2}",
                      "Invoice-Date2": "${obj.InvoiceDate2}",
                      "Invoice-Curr2": "${obj.InvoiceCurr2}",
                      "Invoice-DD2": "${obj.InvoiceDD2}",
                      "Invoice-FV2": "${Number(obj.InvoiceFV2).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No3": "${obj.InvoiceNo3}",
                      "Invoice-Date3": "${obj.InvoiceDate3}",
                      "Invoice-Curr3": "${obj.InvoiceCurr3}",
                      "Invoice-DD3": "${obj.InvoiceDD3}",
                      "Invoice-FV3": "${Number(obj.InvoiceFV3).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No4": "${obj.InvoiceNo4}",
                      "Invoice-Date4": "${obj.InvoiceDate4}",
                      "Invoice-Curr4": "${obj.InvoiceCurr4}",
                      "Invoice-DD4": "${obj.InvoiceDD4}",
                      "Invoice-FV4": "${Number(obj.InvoiceFV4).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No5": "${obj.InvoiceNo5}",
                      "Invoice-Date5": "${obj.InvoiceDate5}",
                      "Invoice-Curr5": "${obj.InvoiceCurr5}",
                      "Invoice-DD5": "${obj.InvoiceDD5}",
                      "Invoice-FV5": "${Number(obj.InvoiceFV5).toLocaleString(
                        "en-US"
                      )}",
                    },
                    "field_boolean_data": {},
                    "field_date_data": {}
                },
                "actions": [
                    {
                        "recipient_name": ${ipu_signature_email},
                        "recipient_email": ${ipu_signature_email},
                        "action_id": ${ipu_buyer_action_id},
                        "signing_order": 2,
                        "role": "Buyer",
                        "verify_recipient": false,
                        "private_notes": ""
                    },
                    {
                        "recipient_name": ${supplier_contact_email},
                        "recipient_email": ${supplier_contact_email},
                        "action_id": ${ipu_supplier_action_id},
                        "signing_order": 3,
                        "role": "Supplier",
                        "verify_recipient": false,
                        "private_notes": ""
                    }
                ],
                "notes": ""
            }
        }`,
          is_quicksend: "true",
          locale: "en",
        }),
      }
    );
    const data = await res1.json();
    const eid = data.requests.request_id;
    const reqid2 = DOMPurify.sanitize(esign_template_offer);
    const res2 = await fetch(
      //`https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${reqid2}/createdocument?testing=true`,
      `https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${reqid2}/createdocument`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        body: new URLSearchParams({
          data: `{
            "templates": {
                "field_data": {
                    "field_text_data": {
                      "Invoice-No1": "${obj.InvoiceNo1}",
                      "Invoice-Date1": "${obj.InvoiceDate1}",
                      "Invoice-Curr1": "${obj.InvoiceCurr1}",
                      "Invoice-DD1": "${obj.InvoiceDD1}",
                      "Invoice-FV1": "${Number(obj.InvoiceFV1).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No2": "${obj.InvoiceNo2}",
                      "Invoice-Date2": "${obj.InvoiceDate2}",
                      "Invoice-Curr2": "${obj.InvoiceCurr2}",
                      "Invoice-DD2": "${obj.InvoiceDD2}",
                      "Invoice-FV2": "${Number(obj.InvoiceFV2).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No3": "${obj.InvoiceNo3}",
                      "Invoice-Date3": "${obj.InvoiceDate3}",
                      "Invoice-Curr3": "${obj.InvoiceCurr3}",
                      "Invoice-DD3": "${obj.InvoiceDD3}",
                      "Invoice-FV3": "${Number(obj.InvoiceFV3).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No4": "${obj.InvoiceNo4}",
                      "Invoice-Date4": "${obj.InvoiceDate4}",
                      "Invoice-Curr4": "${obj.InvoiceCurr4}",
                      "Invoice-DD4": "${obj.InvoiceDD4}",
                      "Invoice-FV4": "${Number(obj.InvoiceFV4).toLocaleString(
                        "en-US"
                      )}",
                      "Invoice-No5": "${obj.InvoiceNo5}",
                      "Invoice-Date5": "${obj.InvoiceDate5}",
                      "Invoice-Curr5": "${obj.InvoiceCurr5}",
                      "Invoice-DD5": "${obj.InvoiceDD5}",
                      "Invoice-FV5": "${Number(obj.InvoiceFV5).toLocaleString(
                        "en-US"
                      )}",
                    },
                    "field_boolean_data": {},
                    "field_date_data": {}
                },
                "actions": [
                    {
                        "recipient_name": ${supplier_contact_email},
                        "recipient_email": ${supplier_contact_email},
                        "action_id": ${offer_supplier_action_id},
                        "signing_order": 3,
                        "role": "Supplier",
                        "verify_recipient": false,
                        "private_notes": ""
                    }
                ],
                "notes": ""
            }
        }`,
          is_quicksend: "true",
          locale: "en",
        }),
      }
    );
    const data2 = await res2.json();
    const oid = data2.requests.request_id;

    return { ipu_esign_id: eid, offer_esign_id: oid };
  }

  async function _submitForm(values) {
    const zoho_object = await _createSignRequest(values);
    const ipu_esign_id = zoho_object.ipu_esign_id;
    const offer_esign_id = zoho_object.offer_esign_id;
    const invoices = values.invoice;
    invoices.forEach((element) => {
      try {
        const ipu_e_signatureId = ipu_esign_id;
        const offer_notice_e_signatureId = offer_esign_id;
        const buyerId = buyId;
        const supplierId = supId;
        const investorId = investid;
        const brokerId = brokerid;
        const spvId = spvid;
        const identityId = ident;
        const investor_email = investEmail;
        const payout_date = moment().utc().startOf("day").toISOString();
        var period =
          moment(element.invoice_due_date).diff(payout_date, "days") + 1;
        const base_rate = buyer_loan_rate;
        const transaction_fee_rate = buyer_loan_transaction_fee;
        const discount_fee_rate = buyer_loan_discount_fee;
        const broker_fee_rate = buyer_loan_broker_fee;
        var transaction_fee_amount =
          element.invoice_amount *
          (buyer_loan_discount_fee / 100) *
          (transaction_fee_rate / 100) *
          (period / 360);
        var discount_fee_amount =
          (((element.invoice_amount * dynamic_discount) / 100) * period) / 360;
        const broker_fee_amount =
          transaction_fee_amount * (broker_fee_rate / 100);
        const buyer_name = buyername;
        const supplier_name = suppliername;

        var id = element.id;
        var requestId = element.id;
        var invoice_amount = element.invoice_amount;
        var invoice_currency = element.currency;
        var invoice_number = element.invoice_number;
        var invoice_date = moment(element.invoice_date)
          .utc()
          .startOf("day")
          .toISOString();
        var invoice_due_date = moment(element.invoice_due_date)
          .utc()
          .startOf("day")
          .toISOString();
        var sold_goods_description = element.sold_goods_description;

        var invoice_attachment = element.invoice_attachment.value;
        var purchase_order_attachment = element.purchase_order_attachment.value;
        var cargo_insurance_attachment =
          element.cargo_insurance_attachment.value;
        var bill_of_lading_attachment = element.bill_of_lading_attachment.value;
        const request_status = "Under Review";

        createRequest({
          id,
          requestId,
          userId,
          supplierId,
          buyerId,
          investorId,
          brokerId,
          spvId,
          identityId,
          investor_email,

          ipu_e_signatureId,
          offer_notice_e_signatureId,

          base_rate,
          discount_fee_rate,
          transaction_fee_rate,
          discount_fee_amount,
          transaction_fee_amount,
          broker_fee_rate,
          broker_fee_amount,
          buyer_name,
          supplier_name,

          invoice_amount,
          invoice_currency,
          invoice_number,
          invoice_date,
          invoice_due_date,
          sold_goods_description,

          invoice_attachment,
          purchase_order_attachment,
          cargo_insurance_attachment,
          bill_of_lading_attachment,

          request_status,
        });
      } catch (e) {
        onError(e);
      }
    });
  }

  function createRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.createRequest, { input: input })
    );
  }

  async function _handleSubmit(values) {
    setOpen(!open);
    await _submitForm(values);
    setTimeout(4000);
    handleClose();
    navigate("/app/requests");
  }

  const handleClose = () => {
    setOpen(false);
  };

  function ValidateEmail(input) {
    setIpu_signature_email(input);
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.match(validRegex)) {
      setIpu_email_error(false);
    } else {
      setIpu_email_error(true);
    }
  }

  return (
    <Page className={classes.root} title="Payout request">
      <Container maxWidth="lg">
        <br></br>
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Payout request for {buyername}
          </Typography>
          <br></br>
          <React.Fragment>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={_handleSubmit}
            >
              {({
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
                setValues,
                isValid,
                isSubmitting,
              }) => (
                <Form noValidate autoComplete="off">
                  <Field name="numberOfInvoices">
                    {({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="numberOfInvoices">
                          Number of Invoices
                        </InputLabel>
                        <Select
                          id="numberOfInvoices"
                          name="numberOfInvoices"
                          label="Number of Invoices"
                          value={number_of_invoices || ""}
                          onChange={(e) =>
                            handleNumberChange(e, field, values, setValues)
                          }
                          required
                          variant="outlined"
                        >
                          {[1, 2, 3, 4, 5].map((k) => (
                            <MenuItem key={k} value={k}>
                              {k}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                  <Field name="ipu_signature_email">
                    {({ field }) => (
                      <FormControl fullWidth>
                        <TextField
                          id="ipu_signature_email"
                          name="ipu_signature_email"
                          label="Ipu Signature Email (Buyer)"
                          value={ipu_signature_email || ""}
                          onChange={(e) => ValidateEmail(e.target.value)}
                          required
                          error={ipu_email_error || undefined}
                          helperText={
                            ipu_email_error === true
                              ? "The email address of your buyer's contact who is signing the IPU is not valid"
                              : ""
                          }
                          variant="outlined"
                        />
                      </FormControl>
                    )}
                  </Field>

                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                  <FieldArray name="invoice">
                    {() => (
                      <div>
                        {values.invoice.map((p, index) => {
                          const invoice_amount = `invoice[${index}].invoice_amount`;
                          const touchedinvoice_amount = getIn(
                            touched,
                            invoice_amount
                          );
                          const errorinvoice_amount = getIn(
                            errors,
                            invoice_amount
                          );

                          const sold_goods_description = `invoice[${index}].sold_goods_description`;
                          const touchedsold_goods_description = getIn(
                            touched,
                            sold_goods_description
                          );
                          const errorsold_goods_description = getIn(
                            errors,
                            sold_goods_description
                          );

                          const currency = `invoice[${index}].currency`;
                          const touchedcurrency = getIn(touched, currency);
                          const errorcurrency = getIn(errors, currency);

                          const invoice_date = `invoice[${index}].invoice_date`;
                          const toucheddate = getIn(touched, invoice_date);
                          const errordate = getIn(errors, invoice_date);

                          const invoice_due_date = `invoice[${index}].invoice_due_date`;
                          const touchedduedate = getIn(
                            touched,
                            invoice_due_date
                          );
                          const errorduedate = getIn(errors, invoice_due_date);

                          const invoice_number = `invoice[${index}].invoice_number`;
                          const touchedinvoice_number = getIn(
                            touched,
                            invoice_number
                          );
                          const errorinvoice_number = getIn(
                            errors,
                            invoice_number
                          );

                          const invoice_attachment = `invoice[${index}].invoice_attachment`;
                          const touchedinvoice_attachment = getIn(
                            touched,
                            invoice_attachment
                          );
                          const errorinvoice_attachment = getIn(
                            errors,
                            invoice_attachment
                          );

                          const bill_of_lading_attachment = `invoice[${index}].bill_of_lading_attachment`;
                          const touchedbill_of_lading_attachment = getIn(
                            touched,
                            bill_of_lading_attachment
                          );
                          const errorbill_of_lading_attachment = getIn(
                            errors,
                            bill_of_lading_attachment
                          );

                          const cargo_insurance_attachment = `invoice[${index}].cargo_insurance_attachment`;
                          const touchedcargo_insurance_attachment = getIn(
                            touched,
                            cargo_insurance_attachment
                          );
                          const errorcargo_insurance_attachment = getIn(
                            errors,
                            cargo_insurance_attachment
                          );

                          const purchase_order_attachment = `invoice[${index}].purchase_order_attachment`;
                          const touchedpurchase_order_attachment = getIn(
                            touched,
                            purchase_order_attachment
                          );
                          const errorpurchase_order_attachment = getIn(
                            errors,
                            purchase_order_attachment
                          );

                          return (
                            <div key={p.id}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    fullWidth
                                    className={classes.field}
                                    margin="normal"
                                    variant="outlined"
                                    label="Invoice Amount"
                                    type="number"
                                    name={invoice_amount}
                                    value={p.invoice_amount}
                                    required
                                    helperText={
                                      touchedinvoice_amount &&
                                      errorinvoice_amount
                                        ? errorinvoice_amount
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedinvoice_amount &&
                                        errorinvoice_amount
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <FormControl
                                    fullWidth
                                    className={classes.field}
                                  >
                                    <Select
                                      id="currency"
                                      label="Currency"
                                      labelId="currency_label"
                                      name={currency}
                                      value={p.currency}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      required
                                      variant="outlined"
                                      helperText={
                                        touchedcurrency && errorcurrency
                                          ? errorcurrency
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedcurrency && errorcurrency
                                      )}
                                    >
                                      {curr.map((item, index) => (
                                        <MenuItem
                                          key={index}
                                          value={item.label}
                                        >
                                          {item.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <DatePickerField
                                    id="invoice_date"
                                    label="Invoice Date"
                                    name={invoice_date}
                                    helperText={
                                      toucheddate && errordate ? errordate : ""
                                    }
                                    error={Boolean(toucheddate && errordate)}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <DatePickerField
                                    id="invoice_due_date"
                                    label="Invoice Due Date"
                                    name={invoice_due_date}
                                    helperText={
                                      touchedduedate && errorduedate
                                        ? errorduedate
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedduedate && errorduedate
                                    )}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    fullWidth
                                    className={classes.field}
                                    margin="normal"
                                    variant="outlined"
                                    label="Invoice Number"
                                    name={invoice_number}
                                    value={p.invoice_number}
                                    required
                                    helperText={
                                      touchedinvoice_number &&
                                      errorinvoice_number
                                        ? errorinvoice_number
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedinvoice_number &&
                                        errorinvoice_number
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    fullWidth
                                    className={classes.field}
                                    margin="normal"
                                    variant="outlined"
                                    label="Goods Description "
                                    name={sold_goods_description}
                                    value={p.sold_goods_description}
                                    required
                                    helperText={
                                      touchedsold_goods_description &&
                                      errorsold_goods_description
                                        ? errorsold_goods_description
                                        : ""
                                    }
                                    error={Boolean(
                                      touchedsold_goods_description &&
                                        errorsold_goods_description
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <>
                                    <UploadField
                                      name={"invoice_attachment"}
                                      id={invoice_attachment}
                                      accept="image/*,application/pdf"
                                      style={{ display: "none" }}
                                      sectorid={p.id}
                                      helperText={
                                        touchedinvoice_attachment &&
                                        errorinvoice_attachment
                                          ? errorinvoice_attachment
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedinvoice_attachment &&
                                          errorinvoice_attachment
                                      )}
                                    />
                                    <label htmlFor={invoice_attachment}>
                                      <LoaderButton
                                        id={invoice_attachment}
                                        key={invoice_attachment}
                                        fullWidth
                                        component="span"
                                        startIcon={<UploadIcon />}
                                        disabled={p.invoice_attachment.loading}
                                        success={p.invoice_attachment.success}
                                        loading={p.invoice_attachment.loading}
                                      >
                                        {" "}
                                        Invoice*
                                      </LoaderButton>
                                    </label>
                                  </>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <>
                                    <UploadField
                                      name={"bill_of_lading_attachment"}
                                      id={bill_of_lading_attachment}
                                      accept="image/*,application/pdf"
                                      style={{ display: "none" }}
                                      sectorid={p.id}
                                      helperText={
                                        touchedbill_of_lading_attachment &&
                                        errorbill_of_lading_attachment
                                          ? errorbill_of_lading_attachment
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedbill_of_lading_attachment &&
                                          errorbill_of_lading_attachment
                                      )}
                                    />
                                    <label htmlFor={bill_of_lading_attachment}>
                                      <LoaderButton
                                        id={bill_of_lading_attachment}
                                        key={bill_of_lading_attachment}
                                        fullWidth
                                        component="span"
                                        startIcon={<UploadIcon />}
                                        disabled={
                                          p.bill_of_lading_attachment.loading
                                        }
                                        success={
                                          p.bill_of_lading_attachment.success
                                        }
                                        loading={
                                          p.bill_of_lading_attachment.loading
                                        }
                                      >
                                        {" "}
                                        Bill of Lading*
                                      </LoaderButton>
                                    </label>
                                  </>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <>
                                    <UploadField
                                      name={"cargo_insurance_attachment"}
                                      id={cargo_insurance_attachment}
                                      accept="image/*,application/pdf"
                                      style={{ display: "none" }}
                                      sectorid={p.id}
                                      helperText={
                                        touchedcargo_insurance_attachment &&
                                        errorcargo_insurance_attachment
                                          ? errorcargo_insurance_attachment
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedcargo_insurance_attachment &&
                                          errorcargo_insurance_attachment
                                      )}
                                    />
                                    <label htmlFor={cargo_insurance_attachment}>
                                      <LoaderButton
                                        id={cargo_insurance_attachment}
                                        key={cargo_insurance_attachment}
                                        fullWidth
                                        component="span"
                                        startIcon={<UploadIcon />}
                                        disabled={
                                          p.cargo_insurance_attachment.loading
                                        }
                                        success={
                                          p.cargo_insurance_attachment.success
                                        }
                                        loading={
                                          p.cargo_insurance_attachment.loading
                                        }
                                      >
                                        {" "}
                                        Cargo Insurance
                                      </LoaderButton>
                                    </label>
                                  </>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <>
                                    <UploadField
                                      name={"purchase_order_attachment"}
                                      id={purchase_order_attachment}
                                      accept="image/*,application/pdf"
                                      style={{ display: "none" }}
                                      sectorid={p.id}
                                      helperText={
                                        touchedpurchase_order_attachment &&
                                        errorpurchase_order_attachment
                                          ? errorpurchase_order_attachment
                                          : ""
                                      }
                                      error={Boolean(
                                        touchedpurchase_order_attachment &&
                                          errorpurchase_order_attachment
                                      )}
                                    />
                                    <label htmlFor={purchase_order_attachment}>
                                      <LoaderButton
                                        id={purchase_order_attachment}
                                        key={purchase_order_attachment}
                                        fullWidth
                                        component="span"
                                        startIcon={<UploadIcon />}
                                        disabled={
                                          p.purchase_order_attachment.loading
                                        }
                                        success={
                                          p.purchase_order_attachment.success
                                        }
                                        loading={
                                          p.purchase_order_attachment.loading
                                        }
                                      >
                                        {" "}
                                        Purchase Order
                                      </LoaderButton>
                                    </label>
                                  </>
                                </Grid>
                              </Grid>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </FieldArray>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                  <Button
                    className={classes.button}
                    disabled={isSubmitting}
                    type="submit"
                    color="primary"
                    variant="contained"
                    // disabled={!isValid || values.invoice.length === 0}
                  >
                    Submit
                  </Button>
                  <Divider style={{ marginTop: 20, marginBottom: 20 }} />
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </React.Fragment>
      </Container>
    </Page>
  );
}
