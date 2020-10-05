export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "note-app-uploads-4785"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://zpdr1m6ct2.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_jCJCbFGSA",
    APP_CLIENT_ID: "5s5l2tbs9khnm7abguan14lnm8",
    IDENTITY_POOL_ID: "us-east-1:bc5a044d-de0a-4d2c-8d6d-8dca743cb766"
  }
};
