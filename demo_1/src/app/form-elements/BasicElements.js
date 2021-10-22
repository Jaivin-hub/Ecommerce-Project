import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import './style.css'
import axios from 'axios';

export function BasicElements() {

  const [selectedImage, setSelectedimage] = useState([])
  const [value, setValues] = useState()
  const [fileUpload, setFileupload] = useState()
  const [filesecondUpload, setFilesecondupload] = useState()
  const [filethirdUpload, setFilethirdupload] = useState()
  const [filefourthUpload, setFilefourthupload] = useState()

  const imageHandleChange = (e) => {
    console.log(e.target.files)
    setFileupload(e.target.files[0])


    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setSelectedimage((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      )
    }
  }


  const imageHandsecond = (e) => {
    setFilesecondupload(e.target.files[0])


    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setSelectedimage((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      )
    }
  }

  const imageHandthird = (e) => {
    setFilethirdupload(e.target.files[0])


    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setSelectedimage((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      )
    }
  }

  const imageHandfourth = (e) => {
    setFilefourthupload(e.target.files[0])


    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setSelectedimage((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      )
    }
  }
  console.log('values...'+value)
  console.log(fileUpload);

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('ok');
    let formData = new FormData()
    // formData.append("image", JSON.stringify(fileUpload))
    formData.append("image", fileUpload)
    formData.append("image2", filesecondUpload)
    formData.append("image3", filethirdUpload)
    formData.append("image4", filefourthUpload)
    formData.append("data", JSON.stringify(value))
    console.log(value)

    // console.log('function called...')

    axios.post('http://localhost:3000/users/addproducts', formData).then(() => {
      console.log('success')
    }).catch((err) => {
      console.log(err)
    })
  }

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img className="Alignimg" src={photo} key={photo} alt="" />
    })
  }

  const textChange = (e) => {
    const newValues = { ...value }
    newValues[e.target.id] = e.target.value
    setValues(newValues)
  }

  console.log(value)

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Add Products </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>New Products</a></li>
            <li className="breadcrumb-item active" aria-current="page">Add products</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <h4 className="card-title">Product details</h4>
                </div>
                <div className="col-md-10">
                  <div className="row results ps-4">
                    {/* <div className="col-md-4 results"> */}
                    {renderPhotos(selectedImage)}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <form onSubmit={submitHandler} className="forms-sample pt-4">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Product Name</label>

                  <Form.Control type="text" onChange={textChange} className="form-control" id="name" placeholder="Name" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail3">Quantity</label>
                  <Form.Control type="text" onChange={textChange} className="form-control" id="quantity" placeholder="quantity" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail3">Size</label>
                  <Form.Control type="text" onChange={textChange} className="form-control" id="size" placeholder="size" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4">Product Brand</label>
                  <Form.Control type="text" onChange={textChange} className="form-control" id="subcategory" placeholder="Product brand" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4">Category</label>
                  <Form.Control type="text" onChange={textChange} className="form-control" id="maincategory" placeholder="category" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleSelectGender">Stockdetails</label>
                  <select className="form-control" onChange={textChange} id="stockdetails">
                    <option>In stock</option>
                    <option>Out of stock</option>
                  </select>
                </Form.Group>

                <div className="row">
                  <div className="form col-md-3">
                    <form >
                      <label>File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={imageHandleChange} name="Img1" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={imageHandsecond} name="Img2" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={imageHandthird} name="Img3" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={imageHandfourth} name="Img4" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                </div>
                <Form.Group>
                  <label htmlFor="exampleInputCity1">Regularprice</label>
                  <Form.Control type="text" onChange={textChange} className="form-control" id="regularprice" placeholder="regularprice" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputCity1">Price</label>
                  <Form.Control type="text" onChange={textChange} className="form-control" id="price" placeholder="price" />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleTextarea1">Description</label>
                  <textarea className="form-control" onChange={textChange} id="description" rows="4"></textarea>
                </Form.Group>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                <button className="btn btn-dark">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default BasicElements
