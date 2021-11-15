import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
export const fileUploadAndResize = (res) => {
  console.log('fileill')
  return new Promise((resolve, reject) => {
    let allUploadedFiles = ''

    if (res) {
      axios
        .post(
          `http://localhost:5000/users/uploads`,
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
