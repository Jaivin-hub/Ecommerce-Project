import React from "react";
import Resizer from "react-image-file-resizer";
import instance from "./axios-orders";
export const fileUploadAndResize = (res) => {
  console.log('fileill')
  return new Promise((resolve, reject) => {
    let allUploadedFiles = ''

    console.log('folder')
    if (res) {
      console.log('res und')
      instance
        .post(
          `/uploads`,
          { image: res },
        )
        .then((response) => {   
          console.log('res aanu')
          allUploadedFiles = response.data.url;
          resolve(allUploadedFiles);
        })
        .catch((err) => {
          console.log("CLOUDINARY UPLOAD ERR", err);
          reject('dfsdfd')
        });
    } // send back to server to upload cloudinary
  })
};
