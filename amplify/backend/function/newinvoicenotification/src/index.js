/* Amplify Params - DO NOT EDIT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIENDPOINTOUTPUT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIIDOUTPUT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIKEYOUTPUT
	API_ORIGINATECLIENTDEV_REQUESTTABLE_ARN
	API_ORIGINATECLIENTDEV_REQUESTTABLE_NAME
	AUTH_ORIGINATECLIENT84CF992C_USERPOOLID
	ENV
	FUNCTION_PLAID_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const SES = new AWS.SES();

const FROM_EMAIL_ADDRESS = "notifications@originate.capital";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  event.Records.forEach((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);
  });

  const eventType = event.Records[0].eventName;
  const dynamodb = event.Records[0].dynamodb;
  console.log(dynamodb);

  const newInvoiceData = {
    supName: dynamodb.OldImage.supplier_name.S,
    name: dynamodb.OldImage.buyer_name.S,
    id: dynamodb.OldImage.id.S,
    email: dynamodb.OldImage.investor_email.S,
  };
  if (eventType === "INSERT") {
    return sendEmailToMe(newInvoiceData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    function sendEmailToMe(newInvoiceData) {
      const html = `
      <!doctype html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Simple Transactional Email</title>
          <style>
      @media only screen and (max-width: 620px) {
        table.body h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }
      
        table.body p,
      table.body ul,
      table.body ol,
      table.body td,
      table.body span,
      table.body a {
          font-size: 16px !important;
        }
      
        table.body .wrapper,
      table.body .article {
          padding: 10px !important;
        }
      
        table.body .content {
          padding: 0 !important;
        }
      
        table.body .container {
          padding: 0 !important;
          width: 100% !important;
        }
      
        table.body .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }
      
        table.body .btn table {
          width: 100% !important;
        }
      
        table.body .btn a {
          width: 100% !important;
        }
      
        table.body .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }
      @media all {
        .ExternalClass {
          width: 100%;
        }
      
        .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
          line-height: 100%;
        }
      
        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }
      
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }
      
        .btn-primary table td:hover {
          background-color: #34495e !important;
        }
      
        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
      }
      </style>
        </head>
        <body style="background-color: #2e9787; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
          <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">A new invoice has been uploaded to Originate Capital</span>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2e9787; width: 100%;" width="100%" bgcolor="#2e9787">
            <tr>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
              <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                <br>
                  <img src="https://originatecapital.co/wp-content/uploads/2020/04/Horizontal-Dark-480.png" alt="Originate Capital Logo" ;="" margin="auto" max-width="540" padding="10" width="200" border="0" style="-ms-interpolation-mode: bicubic; max-width: 100%; border: 0; outline: none; text-decoration: none; display: block;"><br>

                  <!-- START CENTERED WHITE CONTAINER -->
                  <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">      
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                          <tr>
                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hello,</p>
                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Your client, ${newInvoiceData.supName}, just uploaded an invoice to Originate Capital which is addressed to ${newInvoiceData.name}. Please process the request in due course.</p>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                        <tbody>
                                          <tr>
                                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #171a2b;" valign="top" align="center" bgcolor="#171a2b"> <a href="https://app.originate.capital/investor/request/${newInvoiceData.id}" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #171a2b; border-color: #171a2b; color: #ffffff;">Review Now</a> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
      
                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Best regards.</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
      
                  <!-- END MAIN CONTENT AREA -->
                  </table>
                  <!-- END CENTERED WHITE CONTAINER -->
      
                  <!-- START FOOTER -->
                  <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                      <tr>
                        <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #ffffff; font-size: 12px; text-align: center;" valign="top" align="center">
                          <span class="apple-link" style="color: #ffffff; font-size: 12px; text-align: center;">Originate Capital Inc, 8 The Green, Dover DE 19901</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!-- END FOOTER -->
      
                </div>
              </td>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            </tr>
          </table>
        </body>
      </html>
`;
      const emailParams = {
        Source: FROM_EMAIL_ADDRESS,
        ReplyToAddresses: [FROM_EMAIL_ADDRESS],
        Destination: {
          ToAddresses: [newInvoiceData.email],
          BccAddresses: ['admin@originatecapital.co']
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: html,
            },
            Text: {
              Charset: "UTF-8",
              Data: `Hello,\n
			  Your client, ${newInvoiceData.supName}, just uploaded an invoice to Originate Capital which is addressed to ${newInvoiceData.name}. Please process the request in due course.\n
			  https://app.originate.capital/investor/request/${newInvoiceData.id}\n 
			  Best regards.\n 
			  \n 
			  `,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "New invoice uploaded to Originate Capital",
          },
        },
      };

      console.log(emailParams);

      const promise = SES.sendEmail(emailParams).promise();
      console.log(promise);
      return promise;
    }
  } else {
    return;
  }
};
