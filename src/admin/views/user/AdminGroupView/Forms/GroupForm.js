import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
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
import makeStyles from "@mui/styles/makeStyles";
import NumberFormat from "react-number-format";
import { UploadCloud as UploadIcon } from "react-feather";
import { API, graphqlOperation } from "aws-amplify";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { onError } from "src/libs/errorLib.js";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@mui/material/colors";
import * as queries from "src/graphql/queries.js";

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

const GroupForm = ({ className, groupvalue, subvalue, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [user_name, setUser_name] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [sub, setSub] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [group_type, setGroup_type] = useState("");
  const [group_name, setGroup_name] = useState("");
  const [group_contact_name, setGroup_contact_name] = useState("");
  const [group_contact_email, setGroup_contact_email] = useState("");
  const [group_contact_phone, setGroup_contact_phone] = useState("");
  const [user_email, setUser_email] = useState("");
  const [user_role, setUser_role] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [sortkey, setSortkey] = useState("");

  const [userloading, setUserLoading] = useState(false);
  const [usersuccess, setUserSuccess] = useState(false);

  useEffect(() => {
    const userId = subvalue;
    const sortkey = groupvalue;
    getUser({ userId, sortkey });
    async function getUser(input) {
      try {
        const user = await API.graphql(
          graphqlOperation(queries.getUsergroup, input)
        );
        const {
          data: {
            getUsergroup: {
              groupId,
              userId,
              user_name,
              investorId,
              supplierId,
              brokerId,
              sub,
              identityId,
              group_type,
              group_name,
              group_contact_name,
              group_contact_email,
              group_contact_phone,
              user_email,
              user_role,
              createdAt,
              sortkey,
            },
          },
        } = user;
        setInvestorId(investorId);
        setGroupId(groupId);
        setUserId(userId);
        setUser_name(user_name);
        setSupplierId(supplierId);
        setBrokerId(brokerId);
        setSub(sub);
        setIdentityId(identityId);
        setGroup_type(group_type);
        setGroup_name(group_name);
        setGroup_contact_name(group_contact_name);
        setGroup_contact_email(group_contact_email);
        setGroup_contact_phone(group_contact_phone);
        setUser_email(user_email);
        setUser_role(user_role);
        setUser_email(user_email);
        setCreatedAt(createdAt);
        setSortkey(sortkey);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
  }, [subvalue, groupvalue]);

  async function handleUserSubmit() {
    setUserSuccess(false);
    setUserLoading(true);
    try {
      const userId = subvalue;
      const sortkey = groupvalue;
      await updateUser({
        groupId,
        userId,
        user_name,
        investorId,
        supplierId,
        brokerId,
        sub,
        identityId,
        group_type,
        group_name,
        group_contact_name,
        group_contact_email,
        group_contact_phone,
        user_email,
        user_role,
        createdAt,
        sortkey,
      });
    } catch (e) {
      onError(e);
    }
    setUserSuccess(true);
    setUserLoading(false);
    navigate("/admin/users");
  }

  function updateUser(input) {
    return API.graphql(
      graphqlOperation(mutations.updateUsergroup, { input: input })
    );
  }

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <Container maxWidth="lg">
      <React.Fragment>
        <Accordion defaultExpanded={true}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Group Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              autoComplete="off"
              noValidate
              className={clsx(classes.root, className)}
              {...rest}
            >
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="groupId"
                        label="Group ID"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setGroupId(e.target.value)}
                        required
                        value={groupId || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="investorId"
                        label="Investor Id"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setInvestorId(e.target.value)}
                        required
                        value={investorId || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="supplierId"
                        label="Supplier Id"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setSupplierId(e.target.value)}
                        required
                        value={supplierId || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="brokerId"
                        label="Broker Id"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setBrokerId(e.target.value)}
                        required
                        value={brokerId || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="identityId"
                        label="Identity Id"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setIdentityId(e.target.value)}
                        required
                        value={identityId || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="group_type"
                        label="Group Type"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setGroup_type(e.target.value)}
                        required
                        value={group_type || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="group_name"
                        label="Group Name"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setGroup_name(e.target.value)}
                        required
                        value={group_name || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="group_contact_name"
                        label="Group Contact Name"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setGroup_contact_name(e.target.value)}
                        required
                        value={group_contact_name || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="group_contact_email"
                        label="Group Contact Email"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setGroup_contact_email(e.target.value)}
                        required
                        value={group_contact_email || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="group_contact_phone"
                        label="Group Contact Phone"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setGroup_contact_phone(e.target.value)}
                        required
                        value={group_contact_phone || ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="user_email"
                        label="User Email"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setUser_email(e.target.value)}
                        required
                        value={user_email || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="user_role"
                        label="User Role"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setUser_role(e.target.value)}
                        required
                        value={user_role || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        name="sortkey"
                        label="sortkey"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setSortkey(e.target.value)}
                        required
                        value={sortkey || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-around"
                      item
                      xs={12}
                      sm={6}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          fullWidth
                          value={createdAt || ""}
                          margin="normal"
                          variant="outlined"
                          id="createdAt"
                          name="createdAt"
                          label="Created At"
                          format="dd/MM/yyyy"
                          onChange={(date) => {
                            setCreatedAt(date);
                          }}
                          required
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <LoaderButton
                    startIcon={<UploadIcon />}
                    disabled={userloading}
                    success={usersuccess}
                    loading={userloading}
                    onClick={handleUserSubmit}
                  >
                    Update details
                  </LoaderButton>
                </Box>
              </Card>
            </form>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    </Container>
  );
};

GroupForm.propTypes = {
  className: PropTypes.string,
};

export default GroupForm;
