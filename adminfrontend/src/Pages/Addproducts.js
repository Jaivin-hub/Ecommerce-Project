import React, { useState } from 'react';
import './addproducts.css'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { AiOutlineSave } from "react-icons/ai";
import img from '../imgs/upload.png'

function Addproducts() {

    const [value, setValue] = useState({ name: "", description: "", regularprice: "", price: "", stockdetails: "", quantity: "", size: "", subcategory: "", maincategory: '' })
    const [file, setFile] = useState({ firstimg: "", secondimg: "", thirdimg: "", fourthimg: "" })
    const [uploadimg, setUploadimg] = useState('https://www.xaprb.com/media/2018/08/kitten.jpg')
    const [isUploading, setUploading] = useState(false)

    const textChange = (e) => {
        const newValues = { ...value }
        newValues[e.target.id] = e.target.value
        console.log(newValues)
        setValue(newValues)
    }

    const addImg = async (e) => {
        // console.log(e.target.files[0])
        const files = { ...file }
        files[e.target.id] = e.target.files[0]
        setFile(files)

        console.log(file)


        let formData = new FormData()
        formData.append('file1', file.firstimg)
        formData.append('file2', file.secondimg)
        formData.append('file3', file.thirdimg)
        formData.append('file4', file.fourthimg)
        setUploading(true)
        // const fullData = {formData,value}
        // console.log(fullData)

        console.log(formData)
        let { data } = await axios.post('http://localhost:3000/users/addImg', formData).then(() => {
            console.log('success')
        }).catch((err) => {
            console.log(err)
        })
        setUploading(false)
        console.log('ummm')
        console.log(data)


    }

    // console.log(value)

    // const submitHandler = async (e) => {
    //     e.preventDefault()
        
       
        

        //     let formData = new FormData()
        //     formData.append("all", JSON.stringify(value))
        //     formData.append("image1", value.firstimg)
        //     formData.append("image2", value.secondimg)
        //     formData.append("image3", value.thirdimg)
        //     formData.append("image4", value.forthimg)
        //     console.log('function called...')
        //     axios.post('http://localhost:3000/users/addproducts', formData).then(() => {
        //         console.log('success')
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    // }

    const [pricediv, setpricediv] = useState(false)
    const [Inventory, setInventory] = useState(false)
    const [Shipping, setShipping] = useState(false)
    const [Category, setCategory] = useState(false)

    const pricedivClicked = () => {
        setInventory(false)
        setShipping(false)
        setCategory(false)
        setpricediv(true)
    }

    const InventorydivClicked = () => {
        setpricediv(false)
        setCategory(false)
        setShipping(false)
        setInventory(true)
    }

    const ShippingdivClicked = () => {
        setInventory(false)
        setCategory(false)
        setpricediv(false)
        setShipping(true)
    }

    const CategorydivClicked = () => {
        setpricediv(false)
        setInventory(false)
        setShipping(false)
        setCategory(true)
    }


    return (

        <div>
            <Navbar />
            <div className="addproductmain col-md-12">
                <form  >
                {/* onSubmit={submitHandler} */}
                    <div className="alldetails">
                        <div className="row pt-4">
                            <h3><strong>Product Name</strong></h3>
                        </div>
                        <div className="row pt-3">
                            <div className="General-Infodiv">

                                <div className="row">
                                    <div className="General-Info col-md-3">
                                        <div className="row pt-5">

                                        </div>
                                        <div className="row text-center pt-5">
                                            <h3><strong><small>General Info</small></strong></h3>
                                            <small>Add here the product description with all details and necessary information.</small>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="row pt-5 text-end">
                                                    <small>Product Name</small>
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <input onChange={textChange} id="name" className="productnameinp" type="text" />
                                            </div>
                                            <hr className="mt-3" />
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="row pt-5 text-end">
                                                        <small>Product Description</small>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <input onChange={textChange} id="description" className="text-area" type="text" />
                                                    {/* <textarea onChange={textChange} id="description" className="text-area" name="" id="" cols="30" rows="10"></textarea> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="General-Infodiv">

                                <div className="row">
                                    <div className="General-Info col-md-3">
                                        <div className="row pt-5">

                                        </div>
                                        <div className="row text-center pt-5">
                                            <h3><strong><small>Product Image</small></strong></h3>
                                            <small>Upload your Product image. You can add multiple images</small>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="container">
                                            <div className="row">
                                                <div className="forimg">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <div className="addimg">
                                                                <input id="firstimg" onChange={addImg} className="form-control inputcontainer" type="file" />
                                                                <div className="image-mask d-flex justify-content-center align-items-center">
                                                                    <img src={img} alt="" className="upload-icon" />
                                                                    {/* <img src={uploadimg} className="upload-img" alt="" /> */}
                                                                </div>
                                                                {/* <div className="image-mask d-flex justify-content-center align-items-center">
                                                                    <img src={img} alt="" className="upload-icon" />
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="addimg">
                                                                <input id="secondimg" onChange={addImg} className="form-control inputcontainer" type="file" />
                                                                <div className="image-mask d-flex justify-content-center align-items-center">
                                                                    <img src={img} alt="" className="upload-icon" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="addimg">
                                                                <input id="thirdimg" onChange={addImg} className="form-control inputcontainer" type="file" />
                                                                <div className="image-mask d-flex justify-content-center align-items-center">
                                                                    <img src={img} alt="" className="upload-icon" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="addimg">
                                                                <input id="forthimg" onChange={addImg} className="form-control inputcontainer" type="file" />
                                                                <div className="image-mask d-flex justify-content-center align-items-center">
                                                                    <img src={img} alt="" className="upload-icon" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="row mt-5">
                            <div className="General-Infodiv">

                                <div className="row">
                                    <div className="General-Info col-md-3">
                                        <div className="row mt-3">
                                            <div onClick={pricedivClicked} className="subdetails">
                                                <h3><strong><small><small><small>Price</small></small></small></strong></h3>
                                                <hr />
                                            </div>

                                            <div onClick={InventorydivClicked} className="subdetails">
                                                <h3><strong><small><small><small>Inventory</small></small></small></strong></h3>
                                                <hr />
                                            </div>

                                            <div onClick={ShippingdivClicked} className="subdetails">
                                                <h3><strong><small><small><small>Attributes</small></small></small></strong></h3>
                                                <hr />
                                            </div>
                                            <div onClick={CategorydivClicked} className="subdetails">
                                                <h3><strong><small><small><small>Category</small></small></small></strong></h3>
                                                <hr />
                                            </div>

                                        </div>
                                        <div className="row text-center pt-5">

                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        {pricediv ?
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="row pt-5 text-end">
                                                        <small>Regular Price ($)
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <input onChange={textChange} id="regularprice" className="productnameinp" type="text" />
                                                </div>
                                                <hr className="mt-3" />
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="row pt-5 text-end">
                                                            <small>Sale Price ($)</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <input onChange={textChange} id="price" className="text-area" type="text" />
                                                        {/* <textarea onChange={textChange}  className="text-area" name="" id="" cols="30" rows="10"></textarea> */}
                                                    </div>
                                                </div>
                                            </div>
                                            : null}

                                        {Inventory ?
                                            <div className="row pt-5">
                                                <div className="col-md-3 pt-5">
                                                    <div className="row pt-5 text-end">
                                                        <small>Stock Status
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-9 pt-5">
                                                    {/* <input className="productnameinp" type="text" /> */}

                                                    <select onChange={textChange} id="stockdetails" className="productnameinp">
                                                        <option value="In Stock">In Stock</option>
                                                        <option value="Out of Stock">Out of Stock</option>
                                                    </select>
                                                </div>

                                            </div>
                                            : null}


                                        {Shipping ?
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="row pt-5 text-end">
                                                        <small>Quantity
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <input onChange={textChange} id="quantity" className="productnameinp" type="text" />
                                                </div>
                                                <hr className="mt-5" />
                                                <div className="row pt-3">
                                                    <div className="col-md-3">
                                                        <div className="row pt-5 text-end">
                                                            <small>Size</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <input onChange={textChange} id="size" className="productnameinp" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
                                        {Category ?
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="row pt-5 text-end">
                                                        <small>Sub Category
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <input onChange={textChange} id="subcategory" className="productnameinp" type="text" />
                                                </div>
                                                <hr className="mt-5" />
                                                <div className="row pt-3">
                                                    <div className="col-md-3">
                                                        <div className="row pt-5 text-end">
                                                            <small>Main Category</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <input onChange={textChange} id="maincategory" className="productnameinp" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-6">
                                    <button type="submit" className="savebtn"><strong><AiOutlineSave />Save Product</strong></button>
                                    <button className="cancelbtn"><strong>Cancle</strong></button>
                                </div>
                                <div className="col-md-6">
                                    <button className="deletebtn"><strong>Delete Product</strong></button>
                                </div>
                            </div>
                        </div>


                    </div>
                </form>
            </div>

            {/* const [value, setValues] = useState()
  const [fileUpload, setFileupload] = useState()

  const imageHandleChange = (e) => {
    // const newFiles = { ...fileUpload }
    // newFiles[e.target.id] = e.target.files[0]
    // setFileupload(newFiles)
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      console.log(fileArray)

      setSelectedimage((prevImages) => prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file)
      )
    }
  }

  console.log(fileUpload);

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('ok');
    // let formData = new FormData()
    // formData.append("all", JSON.stringify(value))
    // formData.append("image1", value.firstimg)
    // formData.append("image2", value.secondimg)
    // formData.append("image3", value.thirdimg)
    // formData.append("image4", value.forthimg)
    // console.log('function called...')
    // axios.post('http://localhost:3000/users/addproducts', formData).then(() => {
    //     console.log('success')
    // }).catch((err) => {
    //     console.log(err)
    // })
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
  } */}

        </div>
    )
}

export default Addproducts;