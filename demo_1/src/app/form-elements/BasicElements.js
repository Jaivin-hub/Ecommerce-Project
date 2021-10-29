import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import './style.css'
import axios from 'axios';
import { fileUploadAndResize } from '../FileUpload'

export function BasicElements() {

  const [categoryDetails, setCategoryDetails] = useState([])


  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    axios.get('http://localhost:3000/users/findCategories').then((response) => {
      setCategoryDetails(response.data)
    })
  }

  const [categorydata,setCategoryData] = useState([])
  const [selectedImage, setSelectedimage] = useState([])
  const [value, setValues] = useState()
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')

  const [subcategory,setSubCategory] = useState('')


  const imageHandleChange = async (e) => {
    const urlArray = await fileUploadAndResize(e)
    setImage1(urlArray)
  }

  const imageHandleSecond = async (e) => {
    const urlArray = await fileUploadAndResize(e)
    setImage2(urlArray)
  }

  const imageHandlethird = async (e) => {
    const urlArray = await fileUploadAndResize(e)
    setImage3(urlArray)
  }

  const imageHandlefourth = async (e) => {
    const urlArray = await fileUploadAndResize(e)
    setImage4(urlArray)
  }



  const submitHandler = async (e) => {
    e.preventDefault()
    const productdetails = { image1, image2, image3, image4, value }
    axios.post('http://localhost:3000/users/addproducts', productdetails).then(() => {
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

  

  const categoryHandler= (e)=>{
     const data = e.target.value 
    const newValues = { ...value }
    newValues[e.target.id] = e.target.value
    setValues(newValues)
    axios.get(`http://localhost:3000/users/getsubcategorydetails/${data}`).then((res)=>{
      console.log('data fetched to frontend')
      setCategoryData(res.data.Subcategory)
    })
  }

  const subCategoryHandler=(e)=>{
    const newValues = { ...value }
    newValues[e.target.id] = e.target.value
    setValues(newValues)
  }

  

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
                  <label htmlFor="exampleInputPassword4">Category</label>
                  <select className="form-control" onChange={categoryHandler} id="maincategory">
                  <option>Select</option>
                  {categoryDetails.map((item, key)=>{
                    return(
                      <option>{item.Categoryname}</option>
                    )
                  })}
                  </select>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputPassword4">SubCategory</label>
                  <select className="form-control" onChange={subCategoryHandler} id="subcategory">
                  <option>Select</option>
                    {categorydata.map((item, key)=>{
                      return(
                        <option>{item}</option>
                      )
                    })}
                  </select>
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
                        <input type="file" onChange={imageHandleSecond} name="Img2" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={imageHandlethird} name="Img3" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={imageHandlefourth} name="Img4" className="file-upload-field" id="file-upload-field" />
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
