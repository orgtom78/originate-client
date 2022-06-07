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
  const [ident, setIdent] = useState("");
  const [userId, setUserId] = useState("");
  const [investid, setInvestid] = useState("");
  const [buyername, setBuyername] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [buyer_loan_discount_fee, setBuyer_loan_discount_fee] = useState("");
  const [buyer_loan_transaction_fee, setBuyer_loan_transaction_fee] = useState("");
  const { id } = useParams();
  const { buyId } = useParams();
  const { supId } = useParams();
  const requestId = "request-" + uuid();

  React.useEffect(() => {
    async function load() {
      const buyer = await getbuyername({ id });
      const {
        data: {
          getBuyer: { buyer_name, investorId, identityId, userId, buyer_loan_discount_fee, buyer_loan_transaction_fee },
        },
      } = buyer;
      const buyername = await buyer_name;
      setIdent(identityId);
      setUserId(userId);
      setInvestid(investorId);
      setBuyername(buyername);
      setBuyer_loan_discount_fee(buyer_loan_discount_fee);
      setBuyer_loan_transaction_fee(buyer_loan_transaction_fee);
    }
    load();
  }, [id, buyId]);

  React.useEffect(() => {
    async function load() {
      let filter = { supplierId: { eq: supId } };
      const {
        data: {
          listSuppliers: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listSuppliers, {
          filter: filter,
        })
      );
      const n = {
        data: { listSuppliers: { items: itemsPage1, nextToken } },
      };
      const items = n.data.listSuppliers.items;
      const suppliername = await items[0].supplier_name;
      setSuppliername(suppliername);
    }
    load();
  }, [supId]);

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const sortkey = requestId;
      const supplierId = supId;
      const identityId = ident;
      const investorId = investid;
      const buyerId = id;
      const period = moment(values["invoice_due_date"]).diff(moment(), "days");
      const transaction_fee_rate = buyer_loan_transaction_fee;
      const discount_fee_rate = buyer_loan_discount_fee;
      const transaction_fee_amount = values["invoice_amount"] * transaction_fee_rate/100 * period / 360;
      const discount_fee_amount = values["invoice_amount"] * discount_fee_rate/100 * period / 360;
      const buyer_name = buyername;
      const supplier_name = suppliername;
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
        investorId,
        identityId,
        discount_fee_rate,
        transaction_fee_rate,
        discount_fee_amount,
        transaction_fee_amount,
        buyer_name,
        supplier_name,
        purchase_order_attachment,
        sold_goods_description,
        invoice_amount,
        invoice_currency,
        invoice_date,
        invoice_due_date,
        invoice_attachment,
        offer_notice_attachment,
        ipu_attachment,
        invoice_number,
        cargo_insurance_attachment,
        bill_of_lading_attachment,
        request_status,
      });
    } catch (e) {
      onError(e);
    }
    navigate("/admin/requests");
    // window.location.reload();
  }

  function createRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.createRequest, { input: input })
    );
  }

  function getbuyername(input) {
    return API.graphql(graphqlOperation(queries.getBuyer, input));
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
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
                    vuser={id}
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
