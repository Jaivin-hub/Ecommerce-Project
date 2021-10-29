import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
//import { useSelector } from "react-redux";
//import { Avatar, Badge } from "antd";

//const FileUpload = (
    //{ values, setValues, setLoading }
    //values) => {
        //const { user } = useSelector((state) => ({ ...state }));
        export const fileUploadAndResize = (e) => {
            //   console.log(e.target.files);
            return new Promise((resolve, reject)=>{
    // resize
    let files = e.target.files;
    let allUploadedFiles = ''
    //values.images;

    if (files) {
      //setLoading(true);
      //for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[0],
          720,
          720,
          "JPEG",
          50,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `http://localhost:5000/users/uploads`,
                { image: uri },
                // {
                //   headers: {
                //     authtoken: user ? user.token : "",
                //   },
                // }
              )
              .then((res) => {
                //console.log("IMAGE UPLOAD RES DATA", res);
                //setLoading(false);
                allUploadedFiles=res.data.url;
                resolve(allUploadedFiles);
                //setValues({ ...values, images: allUploadedFiles });
            })
            .catch((err) => {
                //setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
                reject('dfsdfd')
            });
        },
        "base64"
        );
        //}
    } // send back to server to upload cloudinary
    
})
    // set url to images[] in the parent component - ProductCreate
  };
//   const handleImageRemove = (public_id) => {
//     setLoading(true);
//     // console.log("remove image", id);
//     axios.post(
//       `${process.env.REACT_APP_API}/removeimage`,
//       { public_id },
//       {
//         headers: {
//           authtoken: user ? user.token : "",
//         },
//       }
//     )
//     .then(res => {
//         setLoading(false)
//         const {images} = values
//         let filteredImages = images.filter((item) =>{
//             return item.public_id !==public_id;
//         })
//         setValues({...values, images:filteredImages });
//     })
//     .catch(err => {
//         console.log(err)
//         setLoading(false);
//     })
//   };

//   return (
//     <>
//       <div className="row">
//         {values.images &&
//           values.images.map((image) => (
//             <Badge
//               count="X"
//               key={image.public_id}
//               onClick={() => handleImageRemove(image.public_id)}
//               style={{ cursor: "pointer" }}
//             >
//               <Avatar
//                 src={image.url}
//                 size={100}
//                 shape="square"
//                 className="ml-3"
//               />
//             </Badge>
//           ))}
//       </div>
//       <div className="row">
//         <label className="btn btn-info btn-raised mt-3">
//           {" "}
//           Choose File
//           <input
//             type="file"
//             multiple
//             hidden
//             accept="images/*"
//             onChange={fileUploadAndResize}
//           />
//         </label>
//       </div>
//     </>
//   );
// };
// export default FileUpload;