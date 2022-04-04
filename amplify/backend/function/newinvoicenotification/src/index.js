/* Amplify Params - DO NOT EDIT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIENDPOINTOUTPUT
	API_ORIGINATECLIENTDEV_GRAPHQLAPIIDOUTPUT
	API_ORIGINATECLIENTDEV_REQUESTTABLE_ARN
	API_ORIGINATECLIENTDEV_REQUESTTABLE_NAME
	AUTH_ORIGINATECLIENT84CF992C_USERPOOLID
	ENV
	FUNCTION_PLAID_NAME
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const SES = new AWS.SES();

const FROM_EMAIL_ADDRESS = "notifications@originate.capital";
const TO_EMAIL_ADDRESS = "investor@originatecapital.co";


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async(event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });

  const dynamodb = event.Records[0].dynamodb;
	console.log(dynamodb);

	  const newInvoiceData = {
		  name: dynamodb.NewImage.buyer_name.S,
		  id : dynamodb.NewImage.id.S
		};
  return sendEmailToMe(newInvoiceData).then(data => {
	console.log(data);
}).catch(error => {
        console.log(error);
    });
}

function sendEmailToMe(newInvoiceData) {

    const emailParams = {
        Source: FROM_EMAIL_ADDRESS, 
        ReplyToAddresses: [FROM_EMAIL_ADDRESS],
        Destination: {
          ToAddresses: [TO_EMAIL_ADDRESS], 
        },
        Message: {
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: `Your client ${newInvoiceData.name} just uploaded a new invoice to Originate Capital\n\n
			  Please process the request as soon as possible\n
			  You can access the request here: https://app.originate.capital/investor/transaction/${newInvoiceData.id}
			  \n\n 
			  `,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'New invoice uploaded to Originate Capital',
          },
        },
    };

    console.log(emailParams)

    const promise =  SES.sendEmail(emailParams).promise();
    console.log(promise);
    return promise
}
