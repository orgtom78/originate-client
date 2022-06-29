import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
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

const apiName = "ocdefi";

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
  const [buyid, setBuyid] = useState("");
  const [investid, setInvestid] = useState("");
  const [brokerid, setBrokerid] = useState("");
  const [spvid, setSpvid] = useState("");
  const [investEmail, setInvestEmail] = useState("");
  const [buyername, setBuyername] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [buyer_loan_discount_fee, setBuyer_loan_discount_fee] = useState("");
  const [buyer_loan_transaction_fee, setBuyer_loan_transaction_fee] =
    useState("");
  const [buyer_loan_broker_fee, setBuyer_loan_broker_fee] = useState("");
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
          getBuyer: {
            buyer_name,
            buyerId,
            investorId,
            brokerId,
            spvId,
            buyer_loan_discount_fee,
            buyer_loan_transaction_fee,
            buyer_loan_broker_fee,
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
    async function load() {
      const token = await API.get(apiName, "/api/balance");
      console.log(token);
    }
    load();
  }, []);

  React.useEffect(() => {}, []);

  async function burn(id) {
    const myInit = {
      body: { requestid: id }, // replace this with attributes you need
    };
    const res = await API.post(apiName, "/api/burn", myInit);
    console.log(res);
  }

  async function mint(id) {
    const myInit = {
      body: {
        url: `https://app.originate.capital/${id}`,
        requestid: id,
        amount: "45000",
      }, // replace this with attributes you need
    };
    const res = await API.post(apiName, "/api/mint", myInit);
    console.log(res);
  }

  async function approve() {
    const res = await API.post(apiName, "/api/approveall");
    console.log(res);
  }

  async function wrap(id) {
    const myInit = {
      body: { requestid: id, amount: "45000" }, // replace this with attributes you need
    };
    const res = await API.post(apiName, "/api/wrap", myInit);
    console.log(res);
  }

  async function withdraw(id) {
    const myInit = {
      body: { requestid: id, amount: "45000" }, // replace this with attributes you need
    };
    const res = await API.post(apiName, "/api/withdraw", myInit);
    console.log(res);
  }

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
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
    navigate("/app/requests");
    handleClose();
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
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Submit
                      </Button>
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
