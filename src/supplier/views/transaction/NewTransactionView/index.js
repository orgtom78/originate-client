import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import * as queries from "src/graphql/queries.js";
import { useUser } from "src/components/context/usercontext.js";

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
      const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
      const res = n.data.listRequests.items[0];
      const email = res.investor_email;
      setInvestEmail(email);
    }
    load();
  }, [investid]);

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = sub;
      const sortkey = requestId;
      const supplierId = supid;
      const identityId = ident;
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
        ipu_attachment,
        cargo_insurance_attachment,
        bill_of_lading_attachment,
        request_status,
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

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
    navigate("/app/transactions");
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
