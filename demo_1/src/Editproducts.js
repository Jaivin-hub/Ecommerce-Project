import React from 'react'
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import { useParams } from 'react-router-dom'
import { fileUploadAndResize } from '../src/app/FileUpload';
import './editproduct.css'




import axios from 'axios';


function Editproducts() {

    const id = useParams()
    const productId = id.id

    const [categoryDetails, setCategoryDetails] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [name, setName] = useState(null)
    const [quantity, setQuantity] = useState()
    const [size, setSize] = useState()
    const [productsubcategory, setProductSubCategory] = useState()
    const [mainCategory, setMainCategory] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [categorydata, setCategoryData] = useState([])
    const [value, setValues] = useState()
    const [stock, setStock] = useState()

    useEffect(() => {
        getCategories()
        searchProduct()
    }, [])


    const searchProduct = () => {
        axios.get(`http://localhost:3000/users/findProduct/${productId}`).then((res) => {
            setProductDetails(res.data)
            setName(res.data[0].name)
            setQuantity(res.data[0].quantity)
            setSize(res.data[0].size)
            setProductSubCategory(res.data[0].subcategory)
            setMainCategory(res.data[0].maincategory)
            setPrice(res.data[0].price)
            setDescription(res.data[0].description)
        })
    }

    const getCategories = () => {
        axios.get('http://localhost:3000/users/findCategories').then((response) => {
            setCategoryDetails(response.data)
        })
    }


    // images handlers...

    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')

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

    // images handlers ends...




    const categoryHandler = (e) => {
        const data = e.target.value
        const newValues = { ...value }
        newValues[e.target.id] = e.target.value
        setValues(newValues)
        axios.get(`http://localhost:3000/users/getsubcategorydetails/${data}`).then((res) => {
            console.log('data fetched to frontend')
            setCategoryData(res.data.Subcategory)
        })
    }


    const [subcategory, setSubCategory] = useState('')

    const subCategoryHandler = (e) => {
        console.log('fialsd')
        setSubCategory(e.target.value)
    }

    console.log(subcategory)


    const textChange1 = (e) => {
        console.log('uuuuu')
        setName(e.target.value)
    }
    const textChange2 = (e) => {
        setQuantity(e.target.value)
    }
    const textChange3 = (e) => {
        setSize(e.target.value)
    }
    const textChange4 = (e) => {
        setStock(e.target.value)
    }
    const textChange5 = (e) => {
        setPrice(e.target.value)
    }
    const textChange6 = (e) => {
        setDescription(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const main = value.maincategory
        const data = { name, stock, price, quantity, description, size, subcategory, main, productId }
        const productdetails = { image1, image2, image3, image4, data }
        console.log(productdetails)
        axios.post('http://localhost:3000/users/editProductdetails', productdetails).then(() => {
        }).catch((err) => {
            console.log(err)
        })
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
                                    </div>
                                </div>
                            </div>
                            {/* {productDetails.map((item, key) => {
                                return ( */}
                            <form onSubmit={submitHandler} className="forms-sample pt-4">
                                <Form.Group>
                                    <label htmlFor="exampleInputName1">Product Name</label>

                                    <Form.Control type="text" onChange={textChange1} value={name} className="form-control" id="name" placeholder="Name" />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="exampleInputEmail3">Quantity</label>
                                    <Form.Control type="text" onChange={textChange2} value={quantity} className="form-control" id="quantity" placeholder="quantity" />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="exampleInputEmail3">Size</label>
                                    <Form.Control type="text" onChange={textChange3} value={size} className="form-control" id="size" placeholder="size" />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="exampleInputPassword4">Category</label>
                                    <select className="form-control" onChange={categoryHandler} id="maincategory">
                                        <option>{mainCategory}</option>
                                        {categoryDetails.map((item, key) => {
                                            return (
                                                <option>{item.Categoryname}</option>
                                            )
                                        })}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="exampleInputPassword4">SubCategory</label>
                                    <select className="form-control" onChange={subCategoryHandler} id="subcategory">
                                        <option>{productsubcategory}</option>
                                        {categorydata.map((item, key) => {
                                            return (
                                                <option>{item}</option>
                                            )
                                        })}
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="exampleSelectGender">Stockdetails</label>
                                    <select className="form-control" onChange={textChange4} id="stockdetails">
                                        <option>Select</option>
                                        <option>In stock</option>
                                        <option>Out of stock</option>
                                    </select>
                                </Form.Group>

                                <div className="row">
                                    {productDetails.map((item, k) => {
                                        return (
                                            <div className="row">
                                                {item.images.map((image, i) => {
                                                    return (
                                                        <div style={{ marginLeft: "10%" }} className="row">
                                                            <div className="form col-md-3 text-center">
                                                                <form >
                                                                    <label>Edit file</label><br />
                                                                    <img style={{ width: "50%", height: "13em" }} src={image.image1} alt="" />
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={imageHandleChange} name="Img1" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="form col-md-3">
                                                                <form >
                                                                    <label className="label-text">Edit file</label><br />
                                                                    <img style={{ width: "50%", height: "13em" }} src={image.image2} alt="" />
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={imageHandleSecond} name="Img2" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="form col-md-3">
                                                                <form >
                                                                    <label className="label-text">Edit file</label><br />
                                                                    <img style={{ width: "50%", height: "13em" }} src={image.image3} alt="" />
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={imageHandlethird} name="Img3" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="form col-md-3">
                                                                <form >
                                                                    <label className="label-text">Edit file</label><br />
                                                                    <img style={{ width: "50%", height: "13em" }} src={image.image4} alt="" />
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={imageHandlefourth} name="Img4" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                        )
                                    })}
                                </div>

                                <Form.Group>
                                    <label htmlFor="exampleInputCity1">Price</label>
                                    <Form.Control type="text" onChange={textChange5} value={price} className="form-control" id="price" placeholder="price" />
                                </Form.Group>
                                <Form.Group>
                                    <label htmlFor="exampleTextarea1">Description</label>
                                    <textarea className="form-control" onChange={textChange6} value={description} id="description" rows="4"></textarea>
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

export default Editproducts
