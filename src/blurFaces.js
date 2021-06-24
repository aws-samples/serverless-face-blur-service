/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
const s3 = new AWS.S3()
const gm = require('gm').subClass({imageMagick: process.env.localTest})

const blurFaces = async (Bucket, Key, faceDetails) => {

  const object = await s3.getObject({ Bucket, Key }).promise()
  let img = gm(object.Body)

  return new Promise ((resolve, reject) => {
    img.size(function(err, dimensions) {
        if (err) reject(err)
        console.log('Image size', dimensions)

        faceDetails.map((faceDetail) => {
            const box = faceDetail.BoundingBox
            const width  = box.Width * dimensions.width
            const height = box.Height * dimensions.height
            const left = box.Left * dimensions.width
            const top = box.Top * dimensions.height

            img.region(width, height, left, top).blur(0, 70)
        })

        img.toBuffer((err, buffer) => resolve(buffer))
    })
  })
}

module.exports = { blurFaces }