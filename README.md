Frontend [Serverless Stack](https://serverless-stack.com) tutorial done, including Best Practices & Extra Credit. 

### ✨ [Demo](https://serverless-stack-s4nt14go.netlify.app)
<a href="https://github.com/s4nt14go/serverless-stack-client">
  <img src="https://api.netlify.com/api/v1/badges/cd1da1f3-170e-4192-8c8a-2293a99518e0/deploy-status" alt="netlify build badge" />
</a><br /><br />

The backend part consists of two repos:
* [Infrastructure](https://github.com/s4nt14go/serverless-stack-ext-resources): Deploys S3, DynamoDB & Cognito, it doesn't change a lot and can be shared between several Serverless API stages. It uses [AWS CDK](https://aws.amazon.com/cdk) with [SST](https://github.com/serverless-stack/serverless-stack) for deployment.
* [API](https://github.com/s4nt14go/serverless-stack-ext-api): Deploys API Gateway and Lambdas, most of the development iterations are done on this repo. It uses [Serverless Framework](https://github.com/serverless/serverless) for deployment.  
