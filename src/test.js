/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

// Mock event
const event = require('./testEvent.json')

// Mock environment variables
process.env.AWS_REGION = 'us-east-1'
process.env.localTest = true
process.env.TempPath = './'
process.env.DestinationBucketName = 's3-face-blur-destination'

// Lambda handler
const { handler } = require('./app')

const main = async () => {
  console.time('localTest')
  console.dir(await handler(event))
  console.timeEnd('localTest')
}

main().catch(error => console.error(error))