import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Divider, Grid, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Page from "src/components/Page";
import * as queries from "src/graphql/queries.js";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "src/graphql/mutations.js";
import LoaderButton from "src/components/LoaderButton.js";
import { UploadCloud as UploadIcon } from "react-feather";
import { green } from "@mui/material/colors";
import { onError } from "src/libs/errorLib.js";
import { v4 as uuid } from "uuid";

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

const UpdateTemplateForm = ({ className, value, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { buyerid } = useParams();
  const { supplierid } = useParams();

  const [esignId, setEsignId] = useState("");
  const [esign_template_ipu, setEsign_template_ipu] = useState("");
  const [esign_template_offer, setEsign_template_offer] = useState("");
  const [esign_template_raa_offer, setEsign_template_raa_offer] = useState("");

  const [supplierloading, setTemplateLoading] = useState(false);
  const [suppliersuccess, setTemplateSuccess] = useState(false);

  useEffect(() => {
    async function getEsign() {
      try {
        let filter = {
          supplierId: { eq: supplierid },
          buyerId: { eq: buyerid },
        };
        const {
          data: {
            listEsigns: { items: itemsPage1, nextToken },
          },
        } = await API.graphql(
          graphqlOperation(queries.listEsigns, { filter: filter })
        );
        const n = { data: { listEsigns: { items: itemsPage1, nextToken } } };
        const items = n.data.listEsigns.items[0];
        setEsignId(items.id);
        setEsign_template_ipu(items.esign_template_ipu);
        setEsign_template_offer(items.esign_template_offer);
        setEsign_template_raa_offer(items.esign_template_raa_offer);
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    getEsign();
  }, [supplierid, buyerid]);

  async function handleTemplateSubmit() {
    setTemplateSuccess(false);
    setTemplateLoading(true);
    try {
      const id = esignId;
      if (id !== "") {
        await updateTemplates({
          id,
          esign_template_ipu,
          esign_template_offer,
          esign_template_raa_offer,
        });
      } else {
        const esignId = "esign-" + uuid();
        const buyerId = buyerid;
        const supplierId = supplierid;
        await createTemplate({
          esignId,
          supplierId,
          buyerId,
          esign_template_ipu,
          esign_template_offer,
          esign_template_raa_offer,
        });
      }
    } catch (e) {
      onError(e);
    }
    setTemplateSuccess(true);
    setTemplateLoading(false);
    navigate("/admin/suppliers");
  }

  function updateTemplates(input) {
    return API.graphql(
      graphqlOperation(mutations.updateEsign, { input: input })
    );
  }

  function createTemplate(input) {
    return API.graphql(
      graphqlOperation(mutations.createEsign, { input: input })
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
                name="esign_template_ipu"
                onChange={(e) => setEsign_template_ipu(e.target.value)}
                required
                value={esign_template_ipu || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                label="Offer File Template Number"
                name="esign_template_offer"
                onChange={(e) => setEsign_template_offer(e.target.value)}
                required
                value={esign_template_offer || ""}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                fullWidth
                label="RAA Offer File Template Number"
                name="esign_template_raa_offer"
                onChange={(e) => setEsign_template_raa_offer(e.target.value)}
                required
                value={esign_template_raa_offer || ""}
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
              onClick={handleTemplateSubmit}
            >
              Update Template details
            </LoaderButton>
          </Box>
        </React.Fragment>
      </Container>
    </Page>
  );
};

export default UpdateTemplateForm;
