import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "src/graphql/queries.js";

const TransactionForm = ({ className, value, ...rest }) => {
  const { id } = useParams();

  const [transaction_description, setTransaction_description] = useState("");
  const [transaction_source_amount, setTransaction_source_amount] =
    useState("");
  const [transaction_date, setTransaction_date] = useState("");

  useEffect(() => {
    async function getTransaction() {
      try {
        const transaction = await API.graphql(
          graphqlOperation(queries.getTransaction, { id })
        );
        const {
          data: {
            getTransaction: {
              transaction_description,
              transaction_source_amount,
              transaction_date,
            },
          },
        } = transaction;
        setTransaction_description(transaction_description);
        setTransaction_source_amount(transaction_source_amount);
        setTransaction_date(transaction_date);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getTransaction();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion defaultExpanded={true}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Transaction Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="transaction_description"
                      label="transaction_description"
                      fullWidth
                      variant="outlined"
                      value={transaction_description || ""}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="transaction_date"
                      label="transaction_date"
                      fullWidth
                      variant="outlined"
                      value={transaction_date || ""}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="transaction_source_amount"
                      label="Amount"
                      fullWidth
                      variant="outlined"
                      value={transaction_source_amount || ""}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

TransactionForm.propTypes = {
  className: PropTypes.string,
};

export default TransactionForm;
