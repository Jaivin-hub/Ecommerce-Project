import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.css'
import instance from '../axios-orders'
import { fileUploadAndResize } from '../FileUpload'
import { Modal, Button } from 'react-bootstrap'


export function BasicElements() {

  const [categorydata, setCategoryData] = useState([])
  const [selectedImage, setSelectedimage] = useState([])
  const [value, setValues] = useState()
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [subcategory, setSubCategory] = useState('')
  const [categoryDetails, setCategoryDetails] = useState([])
  const [srcImg, setSrcImg] = useState(null);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [showImageHandler, setShowImageHandler] = useState(false)



  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    instance.get('/findCategories').then((response) => {
      setCategoryDetails(response.data)
    })
  }

  const onHide = () => {
    setShowImageHandler(false)

  }



  // const fetchImage = () => {
  //   console.log('ggggggggg')
  //   axios.post('http://localhost:5000/users/fetchUserImage', { 'email': email }).then((res) => {
  //     setUserImage(res.data.image)
  //     setSpinner(false)
  //   })
  // }


  // firstImg crop..
  const cropImage = (e) => {
    console.log('hhdjhskjdskjsdkj')
    setSrcImg(URL.createObjectURL(e.target.files[0]));
    setShowImageHandler(true)
  }

  const arr = []
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
      // setImage1(urlArray)
      for (var i = 0; i < 4; i++) {
        arr[i] = urlArray
      }
      console.log('data came here')

    } catch (e) {
      console.log("crop the image");
    }
  };

  console.log('this is the array...', arr)

  // end

  // secondImg crop...


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
    instance.post('/addproducts', productdetails).then(() => {
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



  const categoryHandler = (e) => {
    const data = e.target.value
    const newValues = { ...value }
    newValues[e.target.id] = e.target.value
    setValues(newValues)
    instance.get(`/getsubcategorydetails/${data}`).then((res) => {
      console.log('data fetched to frontend')
      setCategoryData(res.data.Subcategory)
    })
  }

  const subCategoryHandler = (e) => {
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
                  {/* {image1?
                  <img src={image1} alt="" />
                  :null} */}
                </div>
                <div className="col-md-10">
                  <div className="row results ps-4">
                  </div>
                </div>
              </div>
              <form onSubmit={submitHandler} autocomplete='off' className="forms-sample pt-4">
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
                    <option>Select</option>
                    {categorydata.map((item, key) => {
                      return (
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

                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={showImageHandler}>
                      <Modal.Body>
                        <div>
                          {srcImg && (
                            <div>
                              <ReactCrop
                                style={{ maxWidth: "50%" }}
                                src={srcImg}
                                onImageLoaded={setImage}
                                crop={crop}
                                onChange={setCrop}
                              />
                              <Button
                                onClick={getCroppedImg}>
                                crop
                              </Button>
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




                    <form >

                      <div className="row">
                        <div className="col-md-3">
                          <img src={image1} alt="" />
                        </div>

                      </div>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={cropImage} name="Img1" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <div className="row">
                        <div className="col-md-3">
                          <img src={image1} alt="" />
                        </div>

                      </div>
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={cropImage} name="Img2" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <div className="row">
                        <div className="col-md-3">
                          <img src={image1} alt="" />
                        </div>

                      </div>
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={cropImage} name="Img3" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <div className="row">
                        <div className="col-md-3">
                          <img src={image1} alt="" />
                        </div>

                      </div>
                      <label className="label-text">File upload</label>
                      <div className="file-upload-wrapper" data-text="Select your file!">
                        <input type="file" onChange={cropImage} name="Img4" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>



                  </div>
                </div>
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
