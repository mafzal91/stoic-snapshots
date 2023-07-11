import { Api } from "@serverless-stack/resources";
import * as lambda from "aws-cdk-lib/aws-lambda";

export function MyStack({ stack }) {
  // const layer = new lambda.LayerVersion(stack, "chromium", {
  //   code: lambda.Code.fromAsset("layers/chromium.zip"),
  // });

  const api = new Api(stack, "api", {
    routes: {
      "GET /": {
        function: {
          handler: "functions/lambda.handler",
          // Increase the timeout for generating screenshots
          timeout: 15,
          // Load Chrome in a Layer
          // layers: [layer],
          // Exclude bundling it in the Lambda function
          // bundle: { externalModules: ["chrome-aws-lambda"] },
        },
      },
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
