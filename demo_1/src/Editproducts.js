import React from 'react'
import { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import { useParams } from 'react-router-dom'
import { fileUploadAndResize } from '../src/app/FileUpload';
import './editproduct.css'
import { Modal, Button, Form } from 'react-bootstrap'

import instance from './app/axios-orders';


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


    const [proImgs, setProImgs] = useState()
    const searchProduct = () => {
        instance.get(`/findProduct/${productId}`).then((res) => {
            setProductDetails(res.data)
            console.log('WORK SITE')
            setProImgs(res.data[0].images[0])
            setName(res.data[0].name)
            setQuantity(res.data[0].quantity)
            setSize(res.data[0].size)
            setProductSubCategory(res.data[0].subcategory)
            setMainCategory(res.data[0].maincategory)
            setPrice(res.data[0].price)
            setDescription(res.data[0].description)
        })
    }
    console.log("ithaanu...ellam....", proImgs)

    const onHide = () => {
        setShowImageHandler(false)

    }

    const getCategories = () => {
        instance.get('/findCategories').then((response) => {
            setCategoryDetails(response.data)
        })
    }


    // images handlers...

    // const [image1, setImage1] = useState('')
    // const [image2, setImage2] = useState('')
    // const [image3, setImage3] = useState('')
    // const [image4, setImage4] = useState('')

    const [tempImage, setTempImage] = useState()
    const [srcImg, setSrcImg] = useState(null);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [showImageHandler, setShowImageHandler] = useState(false)
    const [mainImage, setMainImage] = useState([]);
    const [text1, setText1] = useState(false)
    const [text2, setText2] = useState(false)
    const [text3, setText3] = useState(false)
    const [text4, setText4] = useState(false)



    const imageHandleChange = async (e, type) => {
        console.log('imageUpload function')
        console.log(e, type)
        if (type == "first") {
            setSrcImg(URL.createObjectURL(e));
            setShowImageHandler(true)
            setText1(true);
        } else if (type == "second") {
            setSrcImg(URL.createObjectURL(e));
            setShowImageHandler(true)
            setText2(true);
        } else if (type == "third") {
            setSrcImg(URL.createObjectURL(e));
            setShowImageHandler(true)
            setText3(true);
        } else if (type == "fourth") {
            setSrcImg(URL.createObjectURL(e));
            setShowImageHandler(true)
            setText4(true);
        } else {

        }


        // const urlArray = await fileUploadAndResize(e)
        // console.log('url array....')
        // console.log(urlArray)
        // proImgs.image1= urlArray

        // setImage1(urlArray)
    }

    const getCroppedImg = async () => {
        console.log('crop function')
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
            const base64Image = canvas.toDataURL("image/jpeg", 1);
            setResult(base64Image);
            setShowImageHandler(false)
            const urlArray = await fileUploadAndResize(base64Image)
            console.log(urlArray)
            if (text1 == true) {
                proImgs.image1 = urlArray
                console.log('first---')
            } else if (text2 == true) {
                proImgs.image2 = urlArray
                console.log('second---')
            } else if (text3 == true) {
                proImgs.image3 = urlArray
                console.log('third---')
            } else if (text4 == true) {
                proImgs.image4 = urlArray
                console.log('fourth---')
            }
            // setMainImage(urlArray)
            console.log('data came here')
        } catch (e) {
            console.log("crop the image");
        }
    };

    const imageHandleSecond = async (e) => {
        const urlArray = await fileUploadAndResize(e)
        // setImage2(urlArray)
    }

    const imageHandlethird = async (e) => {
        const urlArray = await fileUploadAndResize(e)
        // setImage3(urlArray)
    }

    const imageHandlefourth = async (e) => {
        const urlArray = await fileUploadAndResize(e)
        // setImage4(urlArray)
    }

    // images handlers ends...

    const categoryHandler = (e) => {
        const data = e.target.value
        const newValues = { ...value }
        newValues[e.target.id] = e.target.value
        setValues(newValues)
        instance.get(`/getsubcategorydetails/${data}`).then((res) => {
            setCategoryData(res.data.Subcategory)
        })
    }


    const [subcategory, setSubCategory] = useState('')

    const subCategoryHandler = (e) => {
        setSubCategory(e.target.value)
    }


    const textChange1 = (e) => {
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
        // const main = value.maincategory
        const data = { name, stock, price, quantity, description, size, subcategory, productId }
        const { image1, image2, image3, image4 } = proImgs
        const productdetails = { image1, image2, image3, image4, data }
        console.log('Edit product data', productdetails)
        // instance.post('/editProductdetails', productdetails).then(() => {
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    console.log('----',proImgs)


    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit Products </h3>
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


                                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showImageHandler}>
                                    <Modal.Body>
                                        <div>
                                            {srcImg && (
                                                <div>
                                                    <ReactCrop cropBoxResizable={false} cropBoxData={{ width: 100, height: 50 }} style={{ maxWidth: "50%" }} src={srcImg} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                                                    <Button onClick={getCroppedImg}>crop</Button>
                                                </div>
                                            )}
                                            {result && (
                                                <div>
                                                    <img src={result} alt="cropped image" />
                                                </div>
                                            )}
                                        </div>
                                        <Button onClick={onHide}>Close</Button>
                                    </Modal.Body>
                                </Modal>
                                <div className="row">



                                    {/* {proImgs.map((item, k) => {
                                        return ( */}
                                            {/* <div className="col-md-3">
                                            <img src={proImgs.image1} alt="" />
                                            </div> */}
                                        {/* )
                                    })} */}
                                </div>

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
                                                                    {/* <img style={{ width: "50%", height: "13em" }} src={image.image1} alt="" /> */}
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={(e) => { imageHandleChange(e.target.files[0], 'first') }} name="Img1" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="form col-md-3">
                                                                <form >
                                                                    <label className="label-text">Edit file</label><br />
                                                                    {/* <img style={{ width: "50%", height: "13em" }} src={image.image2} alt="" /> */}
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={(e) => { imageHandleChange(e.target.files[0], 'second') }} name="Img2" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="form col-md-3">
                                                                <form >
                                                                    <label className="label-text">Edit file</label><br />
                                                                    {/* <img style={{ width: "50%", height: "13em" }} src={image.image3} alt="" /> */}
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={(e) => { imageHandleChange(e.target.files[0], 'third') }} name="Img3" className="file-upload-field" id="file-upload-field" />
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div className="form col-md-3">
                                                                <form >
                                                                    <label className="label-text">Edit file</label><br />
                                                                    {/* <img style={{ width: "50%", height: "13em" }} src={image.image4} alt="" /> */}
                                                                    <div className="file-upload-wrapper mt-3" data-text="Select your file!">
                                                                        <input type="file" onChange={(e) => { imageHandleChange(e.target.files[0], 'fourth') }} name="Img4" className="file-upload-field" id="file-upload-field" />
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
