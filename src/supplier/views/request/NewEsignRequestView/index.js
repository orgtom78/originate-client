import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import * as queries from "src/graphql/queries.js";
import { useUser } from "src/components/context/usercontext.js";
import moment from "moment";

import Page from "src/components/Page";

import PayoutForm from "./Forms/PayoutForm";

import validationSchema from "./FormModel/validationSchema";
import NewTransactionFormModel from "./FormModel/NewTransactionFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = NewTransactionFormModel;

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const [supEmail, setSupEmail] = useState("");
  const [sub, setSub] = useState("");
  const [supid, setSupid] = useState("");
  const [ident, setIdent] = useState("");
  const [buyid, setBuyid] = useState("");
  const [investid, setInvestid] = useState("");
  const [brokerid, setBrokerid] = useState("");
  const [spvid, setSpvid] = useState("");
  const [investEmail, setInvestEmail] = useState("");
  const [buyername, setBuyername] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [supplier_address_street, setSupplier_address_street] = useState("");
  const [supplier_address_number, setSupplier_address_number] = useState("");
  const [supplier_address_postalcode, setSupplier_address_postalcode] =
    useState("");
  const [supplier_address_city, setSupplier_address_city] = useState("");
  const [buyer_address_street, setBuyer_address_street] = useState("");
  const [buyer_address_number, setBuyer_address_number] = useState("");
  const [buyer_address_postalcode, setBuyer_address_postalcode] = useState("");
  const [buyer_address_city, setBuyer_address_city] = useState("");
  const [buyer_loan_discount_fee, setBuyer_loan_discount_fee] = useState("");
  const [buyer_loan_transaction_fee, setBuyer_loan_transaction_fee] =
    useState("");
  const [buyer_loan_broker_fee, setBuyer_loan_broker_fee] = useState("");
  const [buyer_zoho_template_number, setBuyer_zoho_template_number] =
    useState("");

  const context = useUser();
  const { id } = useParams();
  const requestId = "request-" + uuid();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const {
        sub,
        supplierId,
        identity,
        supplier_name,
        supplier_address_street,
        supplier_address_number,
        supplier_address_postalcode,
        supplier_address_city,
      } = data;
      setSub(sub);
      setIdent(identity);
      setSupid(supplierId);
      setSuppliername(supplier_name);
      setSupplier_address_postalcode(supplier_address_postalcode);
      setSupplier_address_city(supplier_address_city);
      setSupplier_address_street(supplier_address_street);
      setSupplier_address_number(supplier_address_number);
    }
    onLoad();
  }, [context]);

  React.useEffect(() => {
    async function load() {
      const buyer = await getbuyername({ id });
      const {
        data: {
          getBuyer: {
            buyer_name,
            buyerId,
            investorId,
            brokerId,
            spvId,
            buyer_loan_discount_fee,
            buyer_loan_transaction_fee,
            buyer_loan_broker_fee,
            buyer_address_street,
            buyer_address_number,
            buyer_address_postalcode,
            buyer_address_city,
            buyer_zoho_template_number,
          },
        },
      } = buyer;
      const buyername = await buyer_name;
      const invid = investorId;
      const buyid = buyerId;
      setInvestid(invid);
      setBrokerid(brokerId);
      setSpvid(spvId);
      setBuyername(buyername);
      setBuyid(buyid);
      setBuyer_loan_discount_fee(buyer_loan_discount_fee);
      setBuyer_loan_transaction_fee(buyer_loan_transaction_fee);
      setBuyer_loan_broker_fee(buyer_loan_broker_fee);
      setBuyer_address_street(buyer_address_street);
      setBuyer_address_number(buyer_address_number);
      setBuyer_address_postalcode(buyer_address_postalcode);
      setBuyer_address_city(buyer_address_city);
      setBuyer_zoho_template_number(buyer_zoho_template_number);
    }
    load();
  }, [sub, id]);

  React.useEffect(() => {
    async function load() {
      const investor = await getInvestoremail(investid);
      const {
        data: {
          listInvestors: { items: itemsPage1, nextToken },
        },
      } = investor;
      const n = { data: { listInvestors: { items: itemsPage1, nextToken } } };
      const res = n.data.listInvestors.items[0];
      const email = res.investor_email;
      setInvestEmail(email);
    }
    load();
  }, [investid]);

  React.useEffect(() => {
    async function loadUser() {
      let user = await Auth.currentAuthenticatedUser();
      const { attributes = {} } = user;
      const a = attributes["email"];
      setSupEmail(a);
    }
    loadUser();
  }, []);

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _createSignRequest(values, actions) {
    const date = new moment().format("DD MMMM YYYY");
    const invoicedate = moment(values["invoice_date"]).format("DD MMMM YYYY");
    const invoiceduedate = moment(values["invoice_due_date"]).format(
      "DD MMMM YYYY"
    );
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
    const res = await fetch(
      //`https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${buyer_zoho_template_number}/createdocument?testing=true`,
      `https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/${buyer_zoho_template_number}/createdocument`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        body: new URLSearchParams({
          data: `{ "templates": { "field_data": { "field_text_data": { "Seller Name": "${suppliername}", "Seller Number": "${supplier_address_number}", "Seller Street": "${supplier_address_street}", "Seller City": "${supplier_address_city}", "Seller Postcode": "${supplier_address_postalcode}", "Buyer Contact Name": "${values["ipu_signature_name"]}", "Buyer Name": "${buyername}", "Buyer Number": "${buyer_address_number}", "Buyer Street": "${buyer_address_street}", "Buyer City": "${buyer_address_city}", "Buyer Postcode": "${buyer_address_postalcode}", "Buyer Contact Name2": "${values["ipu_signature_name"]}", "Amount": "${values["invoice_amount"]}", "Currency": "${values["invoice_currency"]}", "Issue Date": "${invoicedate}", "Invoice Number": "${values["invoice_number"]}", "Due Date": "${invoiceduedate}", "Seller Name2": "${suppliername}", "Buyer Name2": "${buyername}", "Debtor": "Debtor" }, "field_boolean_data": {}, "field_date_data": { "Date - 1": "${date}" } }, "actions": [ { "recipient_name": "admin@originatecapital.co", "recipient_email": "admin@originatecapital.co", "action_id": "277418000000062128", "signing_order": 1, "role": "Admin", "verify_recipient": false, "private_notes": "" }, { "recipient_name": "${supEmail}", "recipient_email": "${supEmail}", "action_id": "277418000000062172", "signing_order": 2, "role": "Seller", "verify_recipient": false, "private_notes": "" }, { "recipient_name": "${values["ipu_signature_name"]}", "recipient_email": "${values["ipu_signature_email"]}", "action_id": "277418000000062174", "signing_order": 3, "role": "Buyer", "verify_recipient": false, "private_notes": "" } ], "notes": "" } }`,
          is_quicksend: "true",
          locale: "en",
        }),
      }
    );
    const data = await res.json();
    const eid = data.requests.request_id;
    return eid;
  }

  async function _submitForm(values, actions) {
    const iid = await _createSignRequest(values, actions);
    try {
      const userId = sub;
      const sortkey = requestId;
      const supplierId = supid;
      const identityId = ident;
      const buyerId = id;
      const brokerId = brokerid;
      const spvId = spvid;
      const transaction_fee_rate = buyer_loan_transaction_fee;
      const discount_fee_rate = buyer_loan_discount_fee;
      const broker_fee_rate = buyer_loan_broker_fee;
      const payout_date = moment();
      const period = moment(values["invoice_due_date"]).diff(
        payout_date,
        "days"
      );
      const transaction_fee_amount =
        (((values["invoice_amount"] * transaction_fee_rate) / 100) * period) /
        360;
      const discount_fee_amount =
        (((values["invoice_amount"] * discount_fee_rate) / 100) * period) / 360;
      const broker_fee_amount =
        (((values["invoice_amount"] * broker_fee_rate) / 100) * period) / 360;
      const buyer_name = buyername;
      const supplier_name = suppliername;
      const investorId = investid;
      const investor_email = investEmail;
      const purchase_order_attachment = values["purchase_order_attachment"];
      const sold_goods_description = values["sold_goods_description"];
      const invoice_amount = values["invoice_amount"];
      const invoice_currency = values["invoice_currency"];
      const invoice_date = values["invoice_date"];
      const invoice_due_date = values["invoice_due_date"];
      const invoice_attachment = values["invoice_attachment"];
      const offer_notice_attachment = values["offer_notice_attachment"];
      const ipu_attachment = values["ipu_attachment"];
      const invoice_number = values["invoice_number"];
      const cargo_insurance_attachment = values["cargo_insurance_attachment"];
      const bill_of_lading_attachment = values["bill_of_lading_attachment"];
      const request_status = "Under Review";
      const ipu_e_signatureId = iid;
      const ipu_signature_name = values["ipu_signature_name"];
      const ipu_signature_email = values["ipu_signature_email"];

      await createRequest({
        userId,
        sortkey,
        requestId,
        supplierId,
        buyerId,
        brokerId,
        spvId,
        identityId,
        investorId,
        transaction_fee_rate,
        discount_fee_rate,
        transaction_fee_amount,
        discount_fee_amount,
        broker_fee_rate,
        broker_fee_amount,
        investor_email,
        buyer_name,
        supplier_name,
        purchase_order_attachment,
        sold_goods_description,
        invoice_amount,
        invoice_currency,
        invoice_date,
        invoice_due_date,
        invoice_attachment,
        invoice_number,
        offer_notice_attachment,
        ipu_attachment,
        cargo_insurance_attachment,
        bill_of_lading_attachment,
        request_status,
        payout_date,
        ipu_signature_name,
        ipu_signature_email,
        ipu_e_signatureId,
      });
    } catch (e) {
      onError(e);
    }
  }

  function createRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.createRequest, { input: input })
    );
  }

  function getbuyername(input) {
    return API.graphql(graphqlOperation(queries.getBuyer, input));
  }

  function getInvestoremail(input) {
    let filter = { userId: { eq: input } };
    return API.graphql(
      graphqlOperation(queries.listInvestors, { filter: filter })
    );
  }

  async function _handleSubmit(values, actions) {
    setOpen(!open);
    await _submitForm(values, actions);
    handleClose();
    navigate("/app/requests");
  }

  return (
    <Page className={classes.root} title="Payout request">
      <Container maxWidth="lg">
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
              initialValues={formInitialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form id={formId}>
                  <PayoutForm
                    formField={formField}
                    vuser={sub}
                    vrequest={requestId}
                    vident={ident}
                  />
                  <div className={classes.buttons}>
                    <div className={classes.wrapper}>
                      <Tooltip title="By submitting an email invitation to sign the IPU will be send out to your client">
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.button}
                        >
                          Submit
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </React.Fragment>
      </Container>
    </Page>
  );
}
