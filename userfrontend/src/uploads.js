import React from "react";
import Resizer from "react-image-file-resizer";
import instance from './axios-orders'

export const fileUploadAndResize = (res) => {
  return new Promise((resolve, reject) => {
    let allUploadedFiles = ''

    if (res) {
      instance
        .post(
          `/uploads`,
          { image: res },

        )
        .then((res) => {
          allUploadedFiles = res.data.url;
          resolve(allUploadedFiles);
        })
        .catch((err) => {
          reject('dfsdfd')
        });
    } // send back to server to upload cloudinary

  })
};