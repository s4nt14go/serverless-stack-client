const configs = {
  dev: {
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
    s3: {
      REGION: process.env.REACT_APP_dev_S3_REGION,
      BUCKET: process.env.REACT_APP_dev_S3_BUCKET
    },
    apiGateway: {
      REGION: process.env.REACT_APP_dev_API_REGION,
      URL: process.env.REACT_APP_dev_API_URL
    },
    cognito: {
      REGION: process.env.REACT_APP_dev_COGNITO_REGION,
      USER_POOL_ID: process.env.REACT_APP_dev_COGNITO_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_dev_COGNITO_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_dev_COGNITO_IDENTITY_POOL_ID
    }
  },

  prod: {
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
    s3: {
      REGION: process.env.REACT_APP_prod_S3_REGION,
      BUCKET: process.env.REACT_APP_prod_S3_BUCKET
    },
    apiGateway: {
      REGION: process.env.REACT_APP_prod_API_REGION,
      URL: process.env.REACT_APP_prod_API_URL
    },
    cognito: {
      REGION: process.env.REACT_APP_prod_COGNITO_REGION,
      USER_POOL_ID: process.env.REACT_APP_prod_COGNITO_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_prod_COGNITO_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_prod_COGNITO_IDENTITY_POOL_ID
    }
  },

  work: {
    STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,
    s3: {
      REGION: process.env.REACT_APP_dev_S3_REGION,
      BUCKET: process.env.REACT_APP_work_S3_BUCKET
    },
    apiGateway: {
      REGION: process.env.REACT_APP_dev_API_REGION,
      URL: process.env.REACT_APP_work_API_URL
    },
    cognito: {
      REGION: process.env.REACT_APP_dev_COGNITO_REGION,
      USER_POOL_ID: process.env.REACT_APP_work_COGNITO_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_work_COGNITO_APP_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_work_COGNITO_IDENTITY_POOL_ID
    }
  },

};

if (!process.env.REACT_APP_STAGE) throw Error('Set REACT_APP_STAGE environmental variable');
if (!configs[process.env.REACT_APP_STAGE]) throw Error(`Config ${process.env.REACT_APP_STAGE} doesn't exist`);

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...configs[process.env.REACT_APP_STAGE],
};
