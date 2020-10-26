const dev = {

    AWS: {
      ID: "AKIAYWUJXSYAI2BD5AOA",
      KEY: "qTnPBOus0SfhwIhsBj8eeAoC/jDwY6xrvl7qkqn6",
      REGION: "us-east-2"
    },
    s3: {
      REGION: "us-east-2",
      BUCKET: "originate-upload-bucket",
    },
    graphql: {
      REGION: "us-east-2",
      URL: "https://umy3beijojdzvddet23q43bcty.appsync-api.us-east-2.amazonaws.com/graphql",
      AUTHENTICATION_TYPE: 'AMAZON_COGNITO_USER_POOLS'
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_5NVnP7Wpx",
      APP_CLIENT_ID: "51lsdklgav3a7cu2tbk9rsmipq",
      IDENTITY_POOL_ID: "us-east-2:8ee71b1c-bc20-4549-af6c-3053c0c5ca76"
    },
    social: {
      GA: "688117828898-78s8innpshsshike08051291gkqkdjl8.apps.googleusercontent.com"
    }
  };
  
  const prod = {
    AWS: {
      AWS_ACCESS_KEY_ID: "AKIAYWUJXSYAI2BD5AOA",
      AWS_SECRET_ACCESS_KEY: "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",
      AWS_REGION: "us-east-2"
    },
    s3: {
      REGION: "us-east-2",
      BUCKET: "originate-upload-bucket"
    },
    apiGateway: {
      REGION: "us-east-2",
      URL: "https://aombphun44.execute-api.us-east-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-2",
      USER_POOL_ID: "us-east-2_5NVnP7Wpx",
      APP_CLIENT_ID: "51lsdklgav3a7cu2tbk9rsmipq",
      IDENTITY_POOL_ID: "us-east-2:8ee71b1c-bc20-4549-af6c-3053c0c5ca76"
    },
    social: {
      GA: "688117828898-78s8innpshsshike08051291gkqkdjl8.apps.googleusercontent.com"
    }
  };
  
  // Default to dev if not set
  const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };
  