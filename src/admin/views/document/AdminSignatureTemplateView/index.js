import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Divider, Grid, TextField } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { green } from "@mui/material/colors";
import { onError } from "src/libs/errorLib.js";


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

const UpdateSupplierForm = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { buyerid } = useParams();
  const { supplierid } = useParams();
  const [userId, setUserId] = useState("");
  const [buyerId, setBuyerId] = useState("");

  const [supplier_zoho_template_ipu, setSupplier_zoho_template_ipu] = useState("");
  const [supplier_zoho_template_offer, setSupplier_zoho_template_offer] = useState("");
  const [supplier_zoho_template_raa_offer, setSupplier_zoho_template_raa_offer] = useState("");

  const [supplierloading, setSupplierLoading] = useState(false);
  const [suppliersuccess, setSupplierSuccess] = useState(false);

  useEffect(() => {
    getSupplier({ supplierid });
  }, [supplierid]);

  async function getSupplier(input) {
    try {
      const supplier = await API.graphql(
        graphqlOperation(queries.getSupplier, input)
      );
      const {
        data: {
          getSupplier: {
            userId,
            buyerId,
            supplier_zoho_template_ipu,
            supplier_zoho_template_offer,
            supplier_zoho_template_raa_offer,
          },
        },
      } = supplier;
      setUserId(userId);
      setBuyerId(buyerId);
      setSupplier_zoho_template_ipu(supplier_zoho_template_ipu);
      setSupplier_zoho_template_offer(supplier_zoho_template_offer);
      setSupplier_zoho_template_raa_offer(supplier_zoho_template_raa_offer);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  async function handleSupplierSubmit() {
    setSupplierSuccess(false);
    setSupplierLoading(true);
    try {
      const id = supplierid
      await updateSupplier({
        id,
        supplier_zoho_template_ipu,
        supplier_zoho_template_offer,
        supplier_zoho_template_raa_offer,
      });
    } catch (e) {
      onError(e);
    }
    setSupplierSuccess(true);
    setSupplierLoading(false);
    navigate("/admin/supplier");
  }

  function updateSupplier(input) {
    return API.graphql(
      graphqlOperation(mutations.updateSupplier, { input: input })
    );
  }


  return (
    <Page className={classes.root} title="Update ESign Templates">
      <Container maxWidth="lg">
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
            <TextField
                    fullWidth
                    label="IPU Template Number" 
                    name="supplier_zoho_template_ipu"
                    onChange={(e) => setSupplier_zoho_template_ipu(e.target.value)}
                    required
                    value={supplier_zoho_template_ipu || ""}
                    variant="outlined"
                  />
            </Grid>
            <Grid item sm={12} xs={12}>
            <TextField
                    fullWidth
                    label="Supplier Offer File Template Number" 
                    name="supplier_zoho_template_offer"
                    onChange={(e) => setSupplier_zoho_template_offer(e.target.value)}
                    required
                    value={supplier_zoho_template_offer || ""}
                    variant="outlined"
                  />
            </Grid>
            <Grid item sm={12} xs={12}>
            <TextField
                    fullWidth
                    label="RAA Offer Template Number" 
                    name="supplier_zoho_template_raa_offer"
                    onChange={(e) => setSupplier_zoho_template_raa_offer(e.target.value)}
                    required
                    value={supplier_zoho_template_raa_offer || ""}
                    variant="outlined"
                  />
            </Grid>
          </Grid>
          <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <LoaderButton
                startIcon={<UploadIcon />}
                disabled={supplierloading}
                success={suppliersuccess}
                loading={supplierloading}
                onClick={handleSupplierSubmit}
              >
                Update Supplier details
              </LoaderButton>
            </Box>
        </React.Fragment>
      </Container>
    </Page>
  );
};

export default UpdateSupplierForm;
