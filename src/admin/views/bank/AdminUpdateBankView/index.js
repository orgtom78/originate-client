import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { onError } from "src/libs/errorLib.js";
import { Storage } from "aws-amplify";
import countries from "src/components/FormLists/countries.js";

const cr = countries;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
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
  wrapper: {
    margin: "auto",
    position: "relative",
  },
}));

const UpdateBankForm = ({ className, value, user, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const sub = value;
  const userId = user;

  const [id, setId] = useState("");
  const [bankId, setBankId] = useState("");
  const [identityId, setIdentityId] = useState("");
  const [account_statement_attachment, setAccount_statement_attachment] =
    useState("");
  const [bank_account_name, setBank_account_name] = useState("");
  const [bank_account_number, setBank_account_number] = useState("");
  const [bank_account_sortcode, setBank_account_sortcode] = useState("");
  const [bank_address_city, setBank_address_city] = useState("");
  const [bank_address_number, setBank_address_number] = useState("");
  const [bank_address_postalcode, setBank_address_postalcode] = useState("");
  const [bank_address_street, setBank_address_street] = useState("");
  const [bank_country, setBank_country] = useState("");
  const [bank_name, setBank_name] = useState("");
  const [bank_routing_number, setBank_routing_number] = useState("");
  const [bic_swift_code, setBic_swift_code] = useState("");
  const [iban, setIban] = useState("");

  const [accountimg, setAccountimg] = useState("");
  const [accountpdf, setAccountpdf] = useState("");

  const [accountloading, setAccountLoading] = useState(false);
  const [accountsuccess, setAccountSuccess] = useState(false);
  const [bankloading, setBankLoading] = useState(false);
  const [banksuccess, setBankSuccess] = useState(false);

  const file = useRef(null);

  const accountlabel = "account_statement_attachment";
  const accountname = "Bank Statement";

  useEffect(() => {
    var supplierId = sub;
    getBank(supplierId);
  }, [sub]);

  async function getBank(input) {
    let filter = {
      supplierId: { eq: input },
    };
    try {
      const {
        data: {
          listBanks: { items: itemsPage1, nextToken },
        },
      } = await API.graphql(
        graphqlOperation(queries.listBanks, { filter: filter })
      );
      const n = { data: { listBanks: { items: itemsPage1, nextToken } } };
      const bank = n.data.listBanks.items[0];
      const {
        id,
        bankId,
        identityId,
        bank_name,
        bank_account_name,
        bank_account_number,
        bank_account_sortcode,
        bank_address_city,
        bank_address_street,
        bank_address_number,
        bank_address_postalcode,
        bank_country,
        bank_routing_number,
        bic_swift_code,
        iban,
        account_statement_attachment,
      } = bank;
      setId(id);
      setBankId(bankId);
      setIdentityId(identityId);
      setBank_name(bank_name);
      setBank_account_name(bank_account_name);
      setBank_account_number(bank_account_number);
      setBank_account_sortcode(bank_account_sortcode);
      setBank_address_city(bank_address_city);
      setBank_address_street(bank_address_street);
      setBank_address_number(bank_address_number);
      setBank_address_postalcode(bank_address_postalcode);
      setBank_country(bank_country);
      setBank_routing_number(bank_routing_number);
      setBic_swift_code(bic_swift_code);
      setIban(iban);
      setAccount_statement_attachment(account_statement_attachment);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function handleBankSubmit() {
    setBankSuccess(false);
    setBankLoading(true);
    try {
      if (id === "") {
        const supplierId = sub;
        await createBank({
          userId,
          supplierId,
          bank_name,
          bank_account_name,
          bank_account_number,
          bank_account_sortcode,
          bank_address_city,
          bank_address_street,
          bank_address_number,
          bank_address_postalcode,
          bank_country,
          bank_routing_number,
          bic_swift_code,
          iban,
        });
      } else {
        await updateBank({
          id,
          bank_name,
          bank_account_name,
          bank_account_number,
          bank_account_sortcode,
          bank_address_city,
          bank_address_street,
          bank_address_number,
          bank_address_postalcode,
          bank_country,
          bank_routing_number,
          bic_swift_code,
          iban,
        });
      }
    } catch (e) {
      onError(e);
    }
    setBankSuccess(true);
    setBankLoading(false);
  }

  function updateBank(input) {
    return API.graphql(
      graphqlOperation(mutations.updateBank, { input: input })
    );
  }

  function createBank(input) {
    return API.graphql(
      graphqlOperation(mutations.createBank, { input: input })
    );
  }

  async function s3Up(file, name) {
    const userid = sub;
    const sectorid = bankId;
    var fileExtension = file.name.split(".").pop();
    const filename = `${userid}${sectorid}${name}.${fileExtension}`;
    const stored = await Storage.put(filename, file, {
      level: "private",
      identityId: identityId,
      contentType: file.type,
    });
    return stored.key;
  }

  useEffect(() => {
    if (account_statement_attachment) {
      async function getbankaccountimgurl() {
        var uploadext = account_statement_attachment.split(".").pop();
        var imageExtensions = [
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "png",
          "tiff",
          "eps",
          "svg",
        ];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(account_statement_attachment, {
            level: "private",
            identityId: identityId,
          });
          setAccountimg(y);
        }
      }
      getbankaccountimgurl();
    }
  }, [account_statement_attachment, identityId]);

  useEffect(() => {
    if (account_statement_attachment) {
      async function getbankidpdfurl() {
        var uploadext = account_statement_attachment.split(".").pop();
        var imageExtensions = ["pdf", "PDF"];
        var x = imageExtensions.includes(uploadext);
        if (x === true) {
          var y = await Storage.get(account_statement_attachment, {
            level: "private",
            identityId: identityId,
          });
          setAccountpdf(y);
        }
      }
      getbankidpdfurl();
    }
  }, [account_statement_attachment, identityId]);

  function accountisimageorpdf(label, name) {
    var regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
    if (regex.test(accountimg)) {
      return (
        <>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <img className={classes.img} alt="complex" src={accountimg} />
                <div>
                  <input
                    id={accountimg}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => handlebankidChange(event)}
                  />
                  <label htmlFor={accountimg}>
                    <LoaderButton
                      id={accountimg}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={accountloading}
                      success={accountsuccess}
                      loading={accountloading}
                    >
                      {" "}
                      Update File
                    </LoaderButton>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    } else if (regex.test(accountpdf)) {
      return (
        <>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <iframe
                  title="file"
                  style={{ width: "100%", height: "100%" }}
                  allowFullScreen
                  src={accountpdf}
                />
                <div>
                  <input
                    id={accountpdf}
                    accept="image/*,application/pdf"
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => handlebankidChange(event)}
                  />
                  <label htmlFor={accountpdf}>
                    <LoaderButton
                      id={accountpdf}
                      fullWidth
                      component="span"
                      startIcon={<UploadIcon />}
                      disabled={accountloading}
                      success={accountsuccess}
                      loading={accountloading}
                    >
                      {" "}
                      Update File
                    </LoaderButton>
                  </label>
                </div>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <input
            name={label}
            id={label}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
            type="file"
            onChange={(event) => handlebankidChange(event)}
          />
          <label htmlFor={label}>
            <LoaderButton
              id={label}
              fullWidth
              component="span"
              startIcon={<UploadIcon />}
              disabled={accountloading}
              success={accountsuccess}
              loading={accountloading}
            >
              {" "}
              {name}
            </LoaderButton>
          </label>
        </>
      );
    }
  }

  function handlebankidChange(event) {
    file.current = event.target.files[0];
    const newbankidfile = file.current;
    onbankidChange(newbankidfile);
  }

  async function onbankidChange(newfile) {
    setAccountSuccess(false);
    setAccountLoading(true);
    try {
      const u = newfile
        ? await s3Up(newfile, "account_statement_attachment")
        : null;
      console.log(u);
      var account_statement_attachment = u;
      const userId = sub;
      await updateBank({
        id,
        userId,
        account_statement_attachment,
      });
    } catch (e) {
      onError(e);
    }
    setAccountSuccess(true);
    setAccountLoading(false);
    navigate("/admin/suppliers");
  }

  return (
    <Page title="Update Bank">
      <Container>
        <form
          autoComplete="off"
          noValidate
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Name"
                    name="bank_name"
                    onChange={(e) => setBank_name(e.target.value)}
                    required
                    value={bank_name || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Account Number"
                    name="bank_account_number"
                    onChange={(e) => setBank_account_number(e.target.value)}
                    required
                    value={bank_account_number || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Sortcode"
                    name="bank_account_sortcode"
                    onChange={(e) => setBank_account_sortcode(e.target.value)}
                    value={bank_account_sortcode || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Routing Number"
                    name="bank_routing_number"
                    onChange={(e) => setBank_routing_number(e.target.value)}
                    value={bank_routing_number || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="SWIFT/BIC Code"
                    name="bic_swift_code"
                    onChange={(e) => setBic_swift_code(e.target.value)}
                    required
                    value={bic_swift_code || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="IBAN"
                    name="iban"
                    onChange={(e) => setIban(e.target.value)}
                    value={iban || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank City"
                    name="bank_address_city"
                    onChange={(e) => setBank_address_city(e.target.value)}
                    required
                    value={bank_address_city || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Street Number"
                    name="bank_address_number"
                    onChange={(e) => setBank_address_number(e.target.value)}
                    required
                    value={bank_address_number || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Street"
                    name="bank_address_street"
                    onChange={(e) => setBank_address_street(e.target.value)}
                    required
                    value={bank_address_street || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Company Bank Zipcode"
                    name="bank_address_postalcode"
                    onChange={(e) => setBank_address_postalcode(e.target.value)}
                    value={bank_address_postalcode || ""}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Select
                    fullWidth
                    label="Bank Country"
                    name="bank_country"
                    onChange={(e) => setBank_country(e.target.value)}
                    required
                    value={bank_country || ""}
                    variant="outlined"
                  >
                    {cr.map((item, index) => (
                      <MenuItem key={index} value={item.label}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <LoaderButton
                startIcon={<UploadIcon />}
                disabled={bankloading}
                success={banksuccess}
                loading={bankloading}
                onClick={handleBankSubmit}
              >
                Update Bank details
              </LoaderButton>
            </Box>
          </Card>
        </form>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <>
                <Typography>Bank Statement:</Typography>
                {accountisimageorpdf(accountlabel, accountname)}
              </>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Page>
  );
};

export default UpdateBankForm;
