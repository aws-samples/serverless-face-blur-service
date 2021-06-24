/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const s3 = new AWS.S3()

const { detectFaces } = require('./detectFaces')
const { blurFaces } = require('./blurFaces')

// The Lambda handler
exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2))

  // Get settings from the incoming event
	const s3Event = JSON.parse(event.Records[0].body)

  // Ignore initial test event sent by S3
  if (s3Event.Event === 's3:TestEvent') return

  // Get bucket/key from message
  const Bucket = s3Event.Records[0].s3.bucket.name
  const Key = decodeURIComponent(s3Event.Records[0].s3.object.key.replace(/\+/g, " "))

  // Detect faces in the image
  const results = await detectFaces(Bucket, Key)
  console.log(JSON.stringify(results, null, 2))

  // Blur faces in the image
  const buffer = await blurFaces(Bucket, Key, results)

  // Save to S3
  const object = await s3.putObject({
    Body: buffer,
    Bucket: process.env.DestinationBucketName,
    Key
  }).promise()
}