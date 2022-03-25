/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["PLAID_SECRET"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIENDPOINTOUTPUT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIIDOUTPUT
	API_ORIGINATECLIENTDEV_PLAIDAUTHTABLE_ARN
	API_ORIGINATECLIENTDEV_PLAIDAUTHTABLE_NAME
	AUTH_ORIGINATECLIENT84CF992C_USERPOOLID
	ENV
	REGION
	STORAGE_OCDYNAMOPLAIDDB_ARN
	STORAGE_OCDYNAMOPLAIDDB_NAME
	STORAGE_OCDYNAMOPLAIDDB_STREAMARN
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
var moment = require("moment");

AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.CLIENT_ID,
      "PLAID-SECRET": "ac990b93abfb9d201235ad31854371",
      "Plaid-Version": "2020-09-14",
    },
  },
});

const client = new PlaidApi(configuration);

/****************************
 * Example post method *
 ****************************/

app.get("/api/create_link_token", async function(req, res) {
  // Get the client_user_id by searching for the current user
  const clientUserId = req.query.id;
  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: "OCDev",
    products: ["auth", "transactions"],
    language: "en",
    country_codes: ["US"],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);
    res.json(createTokenResponse.data);
  } catch (error) {
    return res.json((error.response && error.response.data) || error);
  }
});

app.get("/api/exchange_public_token1", async function(req, res) {
  const publicToken = req.query.token;
  const userId = req.query.id;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
    let putItemParams = {
      TableName: "Plaidauth",
      Item: {
        id: userId,
        accessToken1: accessToken,
      },
    };

    dynamodb.put(putItemParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "oh no!", url: req.url, body: req.body });
      } else {
        res.json({ success: "post call succeed!", url: req.url, data: data });
      }
    });

    res.json(response.data);
  } catch (error) {
    return res.json((error.response && error.response.data) || error);
  }
});

app.get("/api/exchange_public_token2", async function(req, res) {
  const publicToken = req.query.token;
  const userId = req.query.id;
  try {
    const response = await client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
    let putItemParams = {
      TableName: "Plaidauth",
      Item: {
        id: userId,
        accessToken2: accessToken,
      },
    };

    dynamodb.put(putItemParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "oh no!", url: req.url, body: req.body });
      } else {
        res.json({ success: "post call succeed!", url: req.url, data: data });
      }
    });

    res.json(response.data);
  } catch (error) {
    return res.json((error.response && error.response.data) || error);
  }
});

app.get("/api/accounts1", async function(req, res, next) {
  const accessToken = req.query.accessToken;
  try {
    const accountsResponse = await client.accountsGet({
      access_token: accessToken,
    });
    res.json(accountsResponse.data);
  } catch (error) {
    return res.json((error.response && error.response.data) || error);
  }
});

app.get("/api/transactions1", async function(req, res) {
  const tableName = "Plaidauth";
  const clientUserId = req.query.id;
  const params = {
    TableName: tableName,
    Key: {
      id: clientUserId,
    },
  };

  dynamodb.get(params, async (err, data) => {
    if (err) {
      return { err };
    } else {
      if (data.Item) {
        try {
          const token = data.Item.accessToken1
          console.log(token);
          const request = {
            access_token: token,
            start_date: moment()
              .subtract(30, "days")
              .format("YYYY-MM-DD"),
            end_date: moment().format("YYYY-MM-DD"),
            options: {
              count: 250,
              offset: 0,
            },
          };
          const transResp = await client.transactionsGet(request);
          console.log(transResp);
          res.json(transResp.data);
        } catch (error) {
          return res.json((error.response && error.response.data) || error);
        }
      }
    }
  });
});

app.listen(3000, function() {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
