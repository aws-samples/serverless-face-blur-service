/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const rekognition = new AWS.Rekognition()

const detectFaces = async (Bucket, Name) => {

	const params = {
    Image: {
      S3Object: {
       Bucket,
       Name
      }
     }    
	}

  console.log('detectFaces: ', params)

  try {
    const result = await rekognition.detectFaces(params).promise()
    return result.FaceDetails
  } catch (err) {
    console.error('detectFaces error: ', err)
    return []
  }  

}

module.exports = { detectFaces }