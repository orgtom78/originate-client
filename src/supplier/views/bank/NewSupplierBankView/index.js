import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { useUser } from "src/components/context/usercontext.js";

import Page from "src/components/Page";

import BankForm from "./Forms/BankForm";

import validationSchema from "./FormModel/validationSchema";
import NewSupplierBankFormModel from "./FormModel/NewSupplierBankFormModel";
import formInitialValues from "./FormModel/formInitialValues";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const { formId, formField } = NewSupplierBankFormModel;

export default function NewAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const [sub, setSub] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [identity, setIdentity] = useState("");

  const [suppliername, setSuppliername] = useState("");
  const context = useUser();

  React.useEffect(() => {
    // attempt to fetch the info of the user that was already logged in
    async function onLoad() {
      const data = await context;
      const { sub, identity, supplier_name, supplierId } = data;
      setSub(sub);
      setIdentity(identity);
      setSuppliername(supplier_name);
      setSupplierId(supplierId);
    }
    onLoad();
  }, [context]);

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
    await _sleep(1000);
    try {
      const userId = sub;
      const b = uuid();
      const bankId = "bank-supplier" + b;
      const sortkey = bankId;
      const identityId = identity;
      const account_statement_attachment =
        values["account_statement_attachment"];
      const balance = values["balance"];
      const balance_available = values["balance_available"];
      const bank_account_name = values["bank_account_name"];
      const bank_account_number = values["bank_account_number"];
      const bank_account_sortcode = values["bank_account_sortcode"];
      const bank_address_city = values["bank_address_city"];
      const bank_address_number = values["bank_address_number"];
      const bank_address_postalcode = values["bank_address_postalcode"];
      const bank_address_refinment = values["bank_address_refinment"];
      const bank_address_street = values["bank_address_street"];
      const bank_branch = values["bank_branch"];
      const bank_country = values["bank_country"];
      const bank_name = values["bank_name"];
      const bank_routing_number = values["bank_routing_number"];
      const bic_swift_code = values["bic_swift_code"];
      const iban = values["iban"];
      const iso_currency_code = values["iso_currency_code"];
      const overdraft = values["overdraft"];
      const payments_incoming = values["payments_incoming"];
      const payments_outgoing = values["payments_outgoing"];
      const pre_auth_amount = values["pre_auth_amount"];
      const reporting_end_date = values["reporting_end_date"];
      const reporting_start_date = values["reporting_start_date"];
      const bank_status = "Under Review";

      await createBank({
        userId,
        sortkey,
        supplierId,
        identityId,
        account_statement_attachment,
        balance,
        balance_available,
        bank_account_name,
        bank_account_number,
        bank_account_sortcode,
        bank_address_city,
        bank_address_number,
        bank_address_postalcode,
        bank_address_refinment,
        bank_address_street,
        bank_branch,
        bank_country,
        bank_name,
        bank_routing_number,
        bic_swift_code,
        iban,
        iso_currency_code,
        overdraft,
        payments_incoming,
        payments_outgoing,
        pre_auth_amount,
        reporting_end_date,
        reporting_start_date,
        bank_status,
      });
    } catch (e) {
      onError(e);
    }
  }

  function createBank(input) {
    return API.graphql(
      graphqlOperation(mutations.createBank, { input: input })
    );
  }

  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
    navigate("/app/account");
  }

  return (
    <Page className={classes.root} title="Add Bank Account">
      <Container maxWidth="lg">
        <React.Fragment>
          <Typography component="h1" variant="h4" align="center">
            Add a bank account to {suppliername}
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
                  <BankForm formField={formField} />
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
