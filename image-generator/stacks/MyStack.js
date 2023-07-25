import { Api } from "@serverless-stack/resources";
import * as lambda from "aws-cdk-lib/aws-lambda";

const layerArn = "arn:aws:lambda:us-east-1:824714483059:layer:chromium_v109:1";
// const layerArn = "arn:aws:lambda:us-east-1:824714483059:layer:chromium_v114:1";

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
          layers: [
            lambda.LayerVersion.fromLayerVersionArn(
              stack,
              "ChromeLayer",
              layerArn
            ),
          ],
          // Exclude bundling it in the Lambda function
          bundle: { externalModules: ["@sparticuz/chromium"] },
        },
      },
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
