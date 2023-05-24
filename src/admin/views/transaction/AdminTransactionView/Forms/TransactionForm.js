import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import makeStyles from "@mui/styles/makeStyles";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import { green } from "@mui/material/colors";
import * as queries from "src/graphql/queries.js";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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

const TransactionForm = ({ className, value, ...rest }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(20);

  const [transaction_description, setTransaction_description] = useState("");
  const [transaction_source_amount, setTransaction_source_amount] =
    useState("");
  const [transaction_date, setTransaction_date] = useState("");
  const [transactionId_payback, setTransactionId_payback] = useState("");

  const [request, setRequest] = useState([]);
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState("");

  const handleClickOpen = (input) => {
    setOpen(true);
    setParams(input);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        setTransactionId_payback(id);
        setTransaction_description(transaction_description);
        setTransaction_source_amount(transaction_source_amount);
        setTransaction_date(transaction_date);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getTransaction();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      const c = await getRequests(transaction_date);
      const d = c.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setRequest(d);
      setMaxSteps(c.length);
    }
    fetchData();
  }, [transaction_date]);

  async function getRequests(input) {
    const format = "YYYY-MM-DD";
    const start = moment(input).subtract(45, "days").format(format);
    const end = moment(input).add(14, "days").format(format);
    let filter = {
      invoice_due_date: { between: [start, end] },
    };
    const {
      data: {
        listRequests: { items: itemsPage1, nextToken },
      },
    } = await API.graphql(
      graphqlOperation(queries.listRequests, { filter: filter, limit: 10000 })
    );
    const n = { data: { listRequests: { items: itemsPage1, nextToken } } };
    const items = n.data.listRequests.items;
    return items;
  }

  async function handlePaybackAssociation() {
    const id = params.id;
    const payback_date = transaction_date;
    const request_status = "Settled";
    try {
      await updateRequest({
        id,
        transactionId_payback,
        payback_date,
        request_status,
      });
    } catch (e) {
      onError(e);
    }
    navigate("/admin/transactions");
  }

  function updateRequest(input) {
    return API.graphql(
      graphqlOperation(mutations.updateRequest, { input: input })
    );
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion defaultExpanded={true}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>
              Transaction Details
            </Typography>
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
              <Divider />

              <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
                <Paper
                  square
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    pl: 2,
                    bgcolor: "background.default",
                  }}
                >
                  <Typography>{""}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {request.map((step, index) => (
                    <div key={step.id}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          sx={{
                            display: "block",
                            overflow: "hidden",
                            width: "100%",
                          }}
                        >
                          <Card>
                            <CardContent>
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    name="buyer_name"
                                    label="Buyer Name"
                                    fullWidth
                                    variant="standard"
                                    value={step.buyer_name || ""}
                                    inputProps={{ readOnly: true }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    name="invoice_number"
                                    label="Invoice Number"
                                    fullWidth
                                    variant="standard"
                                    value={step.invoice_number || ""}
                                    inputProps={{ readOnly: true }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    name="invoice_amount"
                                    label="Invoice Amount"
                                    fullWidth
                                    variant="standard"
                                    value={step.invoice_amount || ""}
                                    inputProps={{ readOnly: true }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    name="supplier_name"
                                    label="Supplier Name"
                                    fullWidth
                                    variant="standard"
                                    value={step.supplier_name || ""}
                                    inputProps={{ readOnly: true }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    name="invoice_due_date"
                                    label="Invoice Due Date"
                                    fullWidth
                                    variant="standard"
                                    value={
                                      moment(step.invoice_due_date).format(
                                        "YYYY-MM-DD"
                                      ) || ""
                                    }
                                    inputProps={{ readOnly: true }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Button
                                    variant="outlined"
                                    onClick={() => {
                                      handleClickOpen(step);
                                    }}
                                  >
                                    Associate Transaction
                                  </Button>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Box>
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Associate the transaction to an invoice"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure that this is the correct invoice that has
                      been paid back as stated above?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handlePaybackAssociation} autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Box>
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
