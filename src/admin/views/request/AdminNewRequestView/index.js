import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
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
  const [brokerid, setBrokerid] = useState("");
  const [spvid, setSpvid] = useState("");
  const [buyername, setBuyername] = useState("");
  const [suppliername, setSuppliername] = useState("");
  const [investEmail, setInvestEmail] = useState("");
  const [buyer_loan_discount_fee, setBuyer_loan_discount_fee] = useState("");
  const [buyer_loan_transaction_fee, setBuyer_loan_transaction_fee] =
    useState("");
  const [buyer_loan_broker_fee, setBuyer_loan_broker_fee] = useState("");
  const [buyer_loan_rate, setBuyer_loan_rate] = useState("");
  const [dynamic_discount, setDynamic_discount] = useState("");
  const [payout_date, setPayout_date] = useState("");
  const [advance_rate, setAdvance_rate] = useState("");
  const { id } = useParams();
  const { supId } = useParams();
  const requestId = "request-" + uuid();
  const [sofr, setSofr] = useState([]);

  React.useEffect(() => {
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
            buyer_loan_advance_rate,
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
      if (buyer_loan_advance_rate) {
        setAdvance_rate(buyer_loan_advance_rate);
      } else {
        setAdvance_rate(100);
      }
    }
    load();
  }, [id]);

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
      const uId = await items[0].userId;
      setSuppliername(suppliername);
      setUserId(uId);
    }
    load();
  }, [supId]);

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

  React.useEffect(() => {
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

  React.useEffect(() => {
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
          console.log(dyndisc);
          setDynamic_discount(dyndisc);
        } else if (sofrterm === "SOFR(Daily)") {
          const dyndisc = Number(sofr.SOFR) + Number(buyer_loan_discount_fee);
          setDynamic_discount(dyndisc);
        }
      }
    }
    checkifmatch();
  }, [sofr, buyer_loan_discount_fee, buyer_loan_rate]);

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values) {
    await _sleep(1000);
    try {
      const sortkey = requestId;
      const supplierId = supId;
      const identityId = ident;
      const investorId = investid;
      const buyerId = id;
      const brokerId = brokerid;
      const spvId = spvid;
      const investor_email = investEmail;
      const period =
        moment(values["invoice_due_date"]).diff(payout_date, "days") + 1;
      const base_rate = buyer_loan_rate;
      const transaction_fee_rate = buyer_loan_transaction_fee;
      const discount_fee_rate = buyer_loan_discount_fee;
      const broker_fee_rate = buyer_loan_broker_fee;
      const transaction_fee_amount =
        values["invoice_amount"] *
        (buyer_loan_discount_fee / 100) *
        (transaction_fee_rate / 100) *
        (period / 360);
      const discount_fee_amount =
        (((values["invoice_amount"] * dynamic_discount) / 100) * period) / 360;
      const broker_fee_amount =
        transaction_fee_amount * (broker_fee_rate / 100);
      const buyer_name = buyername;
      const supplier_name = suppliername;
      const purchase_order_attachment = values["purchase_order_attachment"];
      const sold_goods_description = values["sold_goods_description"];
      const invoice_amount = values["invoice_amount"];
      const invoice_currency = values["invoice_currency"];
      const invoice_date = moment(values["invoice_date"]).utc().startOf("day");
      const invoice_due_date = moment(values["invoice_due_date"])
        .utc()
        .startOf("day");
      console.log(invoice_due_date);
      const invoice_attachment = values["invoice_attachment"];
      const offer_notice_attachment = values["offer_notice_attachment"];
      const ipu_attachment = values["ipu_attachment"];
      const invoice_number = values["invoice_number"];
      const cargo_insurance_attachment = values["cargo_insurance_attachment"];
      const bill_of_lading_attachment = values["bill_of_lading_attachment"];
      const request_status = "Under Review";
      const invoice_purchase_amount =
        (invoice_amount * advance_rate) / 100 - discount_fee_amount;

      await createRequest({
        userId,
        sortkey,
        requestId,
        supplierId,
        buyerId,
        investorId,
        brokerId,
        spvId,
        identityId,
        investor_email,
        base_rate,
        discount_fee_rate,
        transaction_fee_rate,
        discount_fee_amount,
        transaction_fee_amount,
        broker_fee_rate,
        broker_fee_amount,
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
        payout_date,

        invoice_purchase_amount,
        advance_rate,
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

  function _handleSubmit(values) {
    _submitForm(values);
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
