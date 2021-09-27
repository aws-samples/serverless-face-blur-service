# Serverless face blurring service for images stored in Amazon S3

The SAM template deploys a Lambda function, an SQS queue, and two S3 buckets. When JPG images are stored in the first (source) S3 bucket, this triggers the Lambda function. The function uses (Amazon Rekoginition)[https://aws.amazon.com/rekognition/] to find faces in the photos and then uses (GraphicsMagick)[http://www.graphicsmagick.org/] to blur the part of the image containing the faces. The result is stored in the second (destination) S3 bucket.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

To learn more about how this application works, see the article on the AWS Compute Blog: https://aws.amazon.com/blogs/compute/creating-a-serverless-face-blurring-service-for-photos-in-amazon-s3/.

```bash
.
├── README.MD                   <-- This instructions file
├── src                         <-- Source code for a lambda function
│   └── app.js                  <-- Main Lambda handler
│   └── blurFaces.js            <-- Face blurring function
│   └── detectFaces.js          <-- Face detection function
│   └── test.js                 <-- Local test wrapper
│   └── testEvent.js            <-- Local test event
│   └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## Requirements

* [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in. The IAM user that you use must have sufficient permissions to make necessary AWS service calls and manage AWS resources.
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
* [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [AWS Serverless Application Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) (AWS SAM) installed

## Deployment Instructions

1. Create a new directory, navigate to that directory in a terminal and clone the GitHub repository:
    ``` 
    git clone https://github.com/aws-samples/s3-face-blurring-service
    ```
1. From the command line, use AWS SAM to deploy the AWS resources for the pattern as specified in the template.yml file:
    ```
    sam deploy --guided
    ```
1. During the prompts:
    * Enter unique source and destination bucket names
    * Enter the desired AWS Region
    * Allow SAM CLI to create IAM roles with the required permissions.

    Once you have run `sam deploy -guided` mode once and saved arguments to a configuration file (samconfig.toml), you can use `sam deploy` in future to use these defaults.
  
### Testing

Upload a JPG file containing a face to the source S3 bucket. After a few seconds, the destination bucket will contains the same image with the face blurred.

## Cleanup
 
1. Delete the stack
    ```bash
    aws cloudformation delete-stack --stack-name STACK_NAME
    ```
1. Confirm the stack has been deleted
    ```bash
    aws cloudformation list-stacks --query "StackSummaries[?contains(StackName,'STACK_NAME')].StackStatus"
    ```

### Questions

Please contact the author or raise an issue on this GitHub repo if you have questions.

----
Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0
