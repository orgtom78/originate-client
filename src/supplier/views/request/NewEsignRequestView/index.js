import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Tooltip, Typography } from "@mui/material";
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
  const [sub, setSub] = useState("");
  const [supid, setSupid] = useState("");
  const [ident, setIdent] = useState("");
  const [investid, setInvestid] = useState("");
  const [investEmail, setInvestEmail] = useState("");
  const [supEmail, setSupEmail] = useState("");
  const [buyername, setBuyername] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const context = useUser();
  const { id } = useParams();
  const requestId = "request-" + uuid();

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { sub, supplierId, identity, supplier_name } = data;
      setSub(sub);
      setIdent(identity);
      setSupid(supplierId);
      setSuppliername(supplier_name);
    }
    onLoad();
  }, [context]);

  React.useEffect(() => {
    async function load() {
      const buyer = await getbuyername({ id });
      const {
        data: {
          getBuyer: { buyer_name, investorId },
        },
      } = buyer;
      const buyername = await buyer_name;
      const invid = investorId;
      setInvestid(invid);
      setBuyername(buyername);
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
      "https://cors-anywhere-oc.herokuapp.com/https://sign.zoho.com/api/v1/templates/277571000000027081/createdocument?testing=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
        body: new URLSearchParams({
          data: `{"templates":{"field_data":{"field_text_data":{"SellerName1":"${suppliername}","ObligorName1":"${buyername}","SellerName2":"${suppliername}","ObligorName2":"${buyername}","InvoiceNumber":"${values["invoice_number"]}","InvoiceDate":"${invoicedate}","InvoiceDueDate":"${invoiceduedate}","PaymentDate":"${invoiceduedate}","Currency":"${values["invoice_currency"]}","Amount":"${values["invoice_amount"]}","GoodsDescription":"${values["sold_goods_description"]}","SellerName3":"${suppliername}","ObligorName3":"${buyername}"},"field_boolean_data":{},"field_date_data":{"Date1":"${date}","Date2":"${date}"}},"actions":[{"action_id":"277571000000027102","action_type":"SIGN","recipient_name":"Tobias Pfuetze","role":"Purchaser","recipient_email":"tobias.pfuetze@originatecapital.co","recipient_phonenumber":"","recipient_countrycode":"","private_notes":"","verify_recipient":false,"language":"en"},{"action_id":"277571000000027146","action_type":"SIGN","recipient_name":"${supEmail}","role":"Seller","recipient_email":"${supEmail}","recipient_phonenumber":"","recipient_countrycode":"","private_notes":"","verify_recipient":false,"language":"en"},{"action_id":"277571000000027148","action_type":"SIGN","recipient_name":"${values["ipu_signature_name"]}","role":"Obligor","recipient_email":"${values["ipu_signature_email"]}","recipient_phonenumber":"","recipient_countrycode":"","private_notes":"","verify_recipient":false,"language":"en"}],"notes":"","request_name":"ObIigor Notice and Irrevocable Payment Undertaking"}}`,
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
      const ipu_e_signatureId = iid;
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
      const invoice_number = values["invoice_number"];
      const cargo_insurance_attachment = values["cargo_insurance_attachment"];
      const bill_of_lading_attachment = values["bill_of_lading_attachment"];
      const ipu_signature_name = values["ipu_signature_name"];
      const ipu_signature_email = values["ipu_signature_email"];
      const request_status = "Under Review";

      await createRequest({
        userId,
        sortkey,
        requestId,
        supplierId,
        identityId,
        investorId,
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
        cargo_insurance_attachment,
        bill_of_lading_attachment,
        ipu_signature_name,
        ipu_signature_email,
        ipu_e_signatureId,
        request_status,
      });
      await _sleep(1000);
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

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
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
