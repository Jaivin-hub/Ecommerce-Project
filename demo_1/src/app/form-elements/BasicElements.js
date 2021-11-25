import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.css'
import instance from '../axios-orders'
import { fileUploadAndResize } from '../FileUpload'
import { Modal, Button ,Form} from 'react-bootstrap'


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
  const [reload,setReload] = useState(true)





  useEffect(() => {
    getCategories()
  }, [reload])

  const getCategories = () => {
    instance.get('/findCategories').then((response) => {
      setCategoryDetails(response.data)
    })
  }

  const onHide = () => {
    setShowImageHandler(false)

  }


  const [srcImg, setSrcImg] = useState(null);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1/ 1});
  const [showImageHandler, setShowImageHandler] = useState(false)
  const [mainImage, setMainImage] = useState([]);
  const [fileName,setFileName] = useState([])
  console.log('444', mainImage)
  
  const cropImage = (e) => {
    console.log(e.target.files[0].name)
    var temp = e.target.files[0].name
    setFileName(prev => [...prev,temp])
    setSrcImg(URL.createObjectURL(e.target.files[0]));
    setShowImageHandler(true)
  }
  console.log('file naems;;',fileName)

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
      console.log('here toooo')
      const urlArray = await fileUploadAndResize(base64Image)
      console.log('file returning')
      console.log(urlArray)
      setMainImage(prev => [...prev, urlArray])
      console.log('data came here')
    } catch (e) {
      console.log("crop the image");
    }
  };
  // end


  const submitHandler = async (e) => {
    e.preventDefault()
    setReload(!reload)
    const [image1, image2, image3, image4] = mainImage
    const productdetails = { image1, image2, image3, image4, value }
    console.log('here is the all data', productdetails)
    instance.post('/addproducts', productdetails).then(() => {
      console.log('haavooooo')
    }).catch((err) => {
      console.log(err)
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
                </div>
                <div className="col-md-10">
                  <div className="row results ps-4">
                  </div>
                </div>
              </div>
              <form onSubmit={submitHandler} autocomplete='on' className="forms-sample pt-4">
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
                              <ReactCrop cropBoxResizable={false} cropBoxData={{ width: 100, height: 50 }} style={{ maxWidth: "50%" }} src={srcImg} onImageLoaded={setImage} crop={crop} onChange={setCrop} />
                              <Button onClick={getCroppedImg}>crop</Button>
                            </div>
                          )}
                        </div>
                        <Button onClick={onHide}>Close</Button>
                      </Modal.Body>
                    </Modal>

                    <form >
                      <div className="row">
                        <div className="col-md-3 ms-5">
                          <img src={mainImage[0]} alt="" />
                        </div>
                      </div>
                      <div className="file-upload-wrapper" data-text={fileName[0]}>
                        <input type="file" onChange={cropImage} name="Img1" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <div className="row">
                        <div className="col-md-3">
                          <img src={mainImage[1]} alt="" />
                        </div>
                      </div>
                      <div className="file-upload-wrapper" data-text={fileName[1]}>
                        <input type="file" onChange={cropImage} name="Img2" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <div className="row">
                        <div className="col-md-3">
                          <img src={mainImage[2]} alt="" />
                        </div>
                      </div>
                      <div className="file-upload-wrapper" data-text={fileName[2]}>
                        <input type="file" onChange={cropImage} name="Img3" className="file-upload-field" id="file-upload-field" />
                      </div>
                    </form>
                  </div>
                  <div className="form col-md-3">
                    <form >
                      <div className="row">
                        <div className="col-md-3">
                          <img src={mainImage[3]} alt="" />
                        </div>
                      </div>
                      <div className="file-upload-wrapper" data-text={fileName[3]}>
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
