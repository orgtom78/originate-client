import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import * as queries from "src/graphql/queries.js";
import { Auth, API, graphqlOperation } from "aws-amplify";
import PlaidLink from "./PlaidLink";
import {
  AppBar,
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  Tab,
  Tabs,
} from "@material-ui/core";
import Page from "src/components/Page";
import LoaderButton from "src/components/LoaderButton.js";
import { green } from "@material-ui/core/colors";
import { Key as KeyIcon } from "react-feather";

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

const apiName = "plaid";

export default function NewBank() {
  const classes = useStyles();
  const [linkToken, setLinkToken] = useState("");
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function checkexistingtoken() {
      try {
        let user = await Auth.currentAuthenticatedUser();
        let id = user.attributes["custom:groupid"];
        const data = await API.graphql(
          graphqlOperation(queries.getPlaidauth, { id })
        );
        const {data: { getPlaidauth: { accessToken1: token }}} = data;
        setSuccess(true);
        setDisabled(true);
        return token;
      } catch (err) {
        console.log("error fetching data..", err);
      }
    }
    setLinkToken(checkexistingtoken());
  }, []);

  async function getLinkToken() {
    const user = await Auth.currentAuthenticatedUser();
    const { attributes = {} } = user;
    const sub = attributes["custom:groupid"];
    const myInit = {
      queryStringParameters: {
        id: sub,
      },
    };
    const token = await API.get(apiName, "/api/create_link_token", myInit);
    var t = token.link_token;
    setLinkToken(t);
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Page title="Bank Accounts">
      <React.Fragment>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Remittance Account" {...a11yProps(0)} />
            <Tab label="Collection Account" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={classes.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <Container maxWidth="lg">
              <React.Fragment>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <LoaderButton
                    id="plaid-link"
                    fullWidth
                    component="span"
                    startIcon={<KeyIcon />}
                    disabled={disabled}
                    success={success}
                    loading={loading}
                    onClick={getLinkToken}
                  >
                    Connect Bank Account
                  </LoaderButton>
                </Grid>
                {linkToken ? <PlaidLink token={linkToken} /> : null}
              </React.Fragment>
            </Container>
          </TabPanel>
        </SwipeableViews>
      </React.Fragment>
    </Page>
  );
}
