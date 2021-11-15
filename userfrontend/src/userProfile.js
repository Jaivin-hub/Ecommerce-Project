import React, { useState, useEffect } from 'react';
import './style.css'
import { Form, Table } from 'react-bootstrap';
import axios from 'axios'
import Uploads from './uploads'
import { fileUploadAndResize } from './uploads';
import ReactCrop from 'react-image-crop';
import { MdDelete } from 'react-icons/md';
import './hystory.css'
import { BiRupee } from "react-icons/bi";
import Footer from './Footer'
import Modalcomponent from './Modal'
//import { Modal, Button } from 'antd';
import { Modal, Button, Accordion } from 'react-bootstrap'






export function Profile() {


  var userName = localStorage.getItem('username');
  var email = localStorage.getItem('email');
  var phone = localStorage.getItem('phone');
  var lastname = localStorage.getItem('lastname');
  let UserId = localStorage.getItem('id')

  const [deleteAddress, setDeleteAddress] = useState(false)
  const [userImage, setUserImage] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [changeDetails, setChangeDetails] = useState(false)
  const [userPassword, setUserPassword] = useState('')
  const [addressDetails, setAddressDetails] = useState([])
  const name = userName.toUpperCase()
  const lname = lastname.toUpperCase()
  const [Uname, setUname] = useState(userName)
  const [lstName, setLastName] = useState(lastname)
  const [Umail, setUemail] = useState(email)
  const [Uphone, setUphone] = useState(phone)
  const [address, setAddress] = useState(false)
  const [orders, setOrders] = useState(false)
  const [orderDetails, setOrderDetails] = useState([])
  const [details, setDetails] = useState([])
  const [billingAddress, setBillingAddress] = useState(true)
  const [settings, setSettings] = useState(false)
  const [pass, setPass] = useState(false)
  const [success, setSuccess] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [forPass, setForPass] = useState()
  const [newPassword, setNewPassword] = useState()
  const [orderStatus, setOrderStatus] = useState()
  const [showProfile, setShowProfile] = useState(true)

  //const [isModalVisible, setIsModalVisible] = useState(tru);
  const [srcImg, setSrcImg] = useState(null);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });


  useEffect(() => {
    fetchImage()
    billingAddressHandler()
  }, [deleteAddress])

  const checkPassword = (e) => {
    const newData = { ...userPassword }
    newData[e.target.id] = e.target.value
    setUserPassword(newData)
  }

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const newPassHandler = (e) => {
    const newData = { ...newPassword }
    newData[e.target.id] = e.target.value
    setNewPassword(newData)
  }
  const [showImageHandler, setShowImageHandler] = useState(false)
  const onHide = () => {
    setShowImageHandler(false)

  }

  const cropImage = (e) => {
    setSrcImg(URL.createObjectURL(e.target.files[0]));
    setShowImageHandler(true)
  }

  const imageUploadHandler = async (e) => {
    console.log('here is the data')
    setSpinner(true)
    const urlArray = await fileUploadAndResize(e)
    const details = { email, urlArray }
    axios.post('http://localhost:5000/users/addUserImage', details).then((response) => {
      if (response) {
        fetchImage()
      }
    })
  }

  const fetchImage = () => {
    console.log('ggggggggg')
    axios.post('http://localhost:5000/users/fetchUserImage', { 'email': email }).then((res) => {
      setUserImage(res.data.image)
      setSpinner(false)
    })
  }

  const submitPassword = (e) => {
    e.preventDefault()
    const data = { email, userPassword }
    axios.post(`http://localhost:5000/users/checkpassword`, data).then((res) => {
      if (res.data.res === true) {
        setForPass(true)
        setSettings(false)
      } else {
        setForPass(false)
      }
    })
  }

  const billingAddressHandler = () => {
    axios.get(`http://localhost:5000/users/getUserDetailsfromProfile/${UserId}`).then((res) => {
      setAddressDetails(res.data[0].address)
    })
  }

  const AddressDeleteHandler = (id) => {
    setDeleteAddress(!deleteAddress)
    const data = { id, UserId }
    axios.post(`http://localhost:3000/users/deleteAddress`, data).then((res) => {
    })
  }

  const [hideBtn,setHideBtn] = useState()

  const cancelHandler = (id, productId) => {
    const data = { id: id, UserId, productId }
    console.log('ivide ethyyy')
    axios.post(`http://localhost:3000/users/cancelproduct`, data).then((res) => {
      console.log(res.data.msg)
      if(res.data.msg==true){
        setHideBtn(res.data.msg)
      }
    })
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const data = { Uname, lstName, Umail, Uphone, userName, UserId }
    axios.post(`http://localhost:5000/users/EditUserDetails`, data).then((res) => {
      if (res) {
        localStorage.removeItem('email');
        localStorage.removeItem('username')
        localStorage.removeItem('lastname')
        localStorage.removeItem('phone')
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('username', res.data.firstname)
        localStorage.setItem('lastname', res.data.lastname)
        localStorage.setItem('phone', res.data.phone)
        setChangeDetails(false)
      }
    })
  }


  const setOrdersHandler = () => {
    setShowProfile(false)
    setBillingAddress(false)
    setAddress(false)
    setOrders(true)
    axios.get(`http://localhost:5000/users/forhistory/${UserId}`).then((res) => {
      if (res) {
        console.log('najajjajjjakajn')
        console.log(res.data)
        axios.get(`http://localhost:5000/users/findAddress/${UserId}`).then((response) => {
          setOrderDetails(response)
        })
      }
      setOrderStatus(res.data.orderStatus)
      setDetails(res.data)
    }).catch((err) => {
    })
  }

  console.log('this is the data')
  // console.log(details[0].addressid)
  console.log('makkasaayii')
  console.log(orderDetails)

  const ChangeNewPasswordHandler = (e) => {
    e.preventDefault()
    if (newPassword.newPassword === newPassword.retypePassword) {
      const newOne = newPassword.newPassword
      axios.post('http://localhost:5000/users/changePassword', { data: newOne, email: email }).then((response) => {
        console.log('return to react')
        if (response.data.res === true) {
          setSuccess(false)
          setShowSuccess(true)
        }
      })
    } else {
      console.log('error found')
    }
  }

  const getCroppedImg = async () => {
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
      setSpinner(true)
      const urlArray = await fileUploadAndResize(base64Image)
      console.log(urlArray)
      const details = { email, urlArray }
      axios.post('http://localhost:5000/users/addUserImage', details).then((response) => {
        if (response) {
          fetchImage()
        }
      })
      console.log(result);
    } catch (e) {
      console.log("crop the image");
    }
  };

  const textChanged = (e) => {
    setUname(e.target.value)
  }

  const lastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const emailChanged = (e) => {
    setUemail(e.target.value)
  }

  const phoneNumberChanged = (e) => {
    setUphone(e.target.value)
  }

  const setComponents = () => {
    setBillingAddress(false)
    setOrders(false)
    setAddress(true)
    setShowSuccess(false)
  }

  const [productDetails, setProductDetails] = useState([])

  const text = (addressId, id) => {
    console.log(addressId)
    axios.get(`http://localhost:5000/users/picImage/${id}`).then((res) => {
      setProductDetails(res.data)
      console.log(res.data)
    })
  }


  const myAccount = () => {
    setBillingAddress(true)
    setAddress(false)
    setOrders(false)
    setShowSuccess(false)
  }

  const settingsHandler = () => {
    setSettings(true)
    setBillingAddress(false)
    setAddress(false)
    setOrders(false)
    setShowSuccess(false)
  }


  return (
    <div>
      <div className="container">
        <div className="row pt-5 mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-12 ">
                    <button onclick={myAccount} className="btn "> <small><strong>MY Account</strong></small></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-12">
                    <button onClick={setComponents} className="btn "> <small><strong>Address</strong></small></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-12">
                    <button onClick={setOrdersHandler} className="btn "> <small><strong>Orders</strong></small></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-12">
                    <button onClick={settingsHandler} className="btn "> <small><strong>Setings</strong></small></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 py-3 ">
          {showProfile ?
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="aligner-wrapper text-center">
                    {spinner ?
                      <div style={{ position: 'absolute', top: "33%", right: "48%" }} class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      : null}

                    {userImage ?
                      <img className="profileImg" style={{ width: "80%", height: "15em", borderRadius: "10px" }} src={userImage}
                        alt="" />
                      :
                      <img className="profileImg" style={{ width: "80%", height: "15em" }} src=
                        'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
                        alt="" />
                    }
                    {userImage ?

                      <button className="btn mt-3"><input onChange={(e) => { cropImage(e) }} style={{ width: "50%", height: "1em", opacity: "0", cursor: "pointer" }} type="file" />EditImage</button>
                      :
                      <button className="btn mt-3"><input onInput={(e) => { cropImage(e) }} style={{ width: "50%", height: "1em", opacity: "0", cursor: "pointer" }} type="file" />AddImage</button>
                    }
                  </div>
                </div>
              </div>
            </div>
            : null}

          {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                  >
                    crop
                  </Button>
                </div>
              )}
            </div>
          </Modal> */}

          <Modal

            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showImageHandler}
          >

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


          {billingAddress ?
            <div className="col-md-8 grid-margin stretch-card ">
              <div style={{ height: '100%' }} className="card">
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">
                    <h6 className="card-title mb-1"><strong><u>Details</u></strong></h6>
                    {!changeDetails ?
                      <button onClick={() => { setChangeDetails(!changeDetails) }} className="btn">Edit Details</button>
                      :
                      <button onClick={() => { setChangeDetails(!changeDetails) }} className="btn">Cancel</button>
                    }
                  </div>
                  <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                      {!changeDetails ?
                        <div>
                          <div className="container">
                            <div className="row pt-5">
                              <div className="card">
                                <h3><strong>{name} {lname}</strong></h3>
                              </div>
                            </div>
                          </div>
                          <div className="container">
                            <div className="row pt-2 pt-5">

                              <div className="card">
                                <h5>{email}</h5>
                              </div>
                              <div className="card mt-3">
                                <h6 className="mt-3"><strong>{phone}</strong></h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        : null
                      }
                      {changeDetails ?

                        <div className="card">
                          <div className="card-body">
                            <h6 className="card-title"><strong><u>Edit profile</u></strong></h6>
                            <p className="card-description">  </p>
                            <form className="forms-sample" onSubmit={formSubmitHandler}>
                              <Form.Group className="row pt-3">
                                <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                  <Form.Control type="text" onInput={textChanged} className="form-control" id="exampleInputUsername2" value={Uname} />
                                </div>
                              </Form.Group>
                              <Form.Group className="row pt-3">
                                <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Last Name</label>
                                <div className="col-sm-9">
                                  <Form.Control type="text" onInput={lastNameChange} className="form-control" id="exampleInputUsername2" value={lstName} />
                                </div>
                              </Form.Group>
                              <Form.Group className="row pt-3">
                                <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-9">
                                  <Form.Control type="email" onInput={emailChanged} className="form-control" id="exampleInputEmail2" value={Umail} />
                                </div>
                              </Form.Group>
                              <Form.Group className="row pt-3">
                                <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Mobile</label>
                                <div className="col-sm-9">
                                  <Form.Control type="text" onInput={phoneNumberChanged} className="form-control" id="exampleInputMobile" value={Uphone} />
                                </div>
                              </Form.Group>
                              <button style={{ width: '30%' }} type="submit" className="btn mt-3 mr-2">Edit</button>
                            </form>
                          </div>
                        </div>
                        : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            : null

          }

          {address ?
            <div className="col-md-8">
              <div style={{ height: '100%' }} className="card">
                <div className="card-body" style={{height:"4em",overflow: 'scroll',overflowX: 'hidden'}}>
                  <div className="d-flex flex-row justify-content-between">
                    <h6 className="card-title mb-1"><strong><u>Billing Address</u></strong></h6>
                  </div>
                  {addressDetails.map((item, key) => {
                    return (
                      <div className="row ">
                        <div className="col-md-10 pt-3">
                          <p>{item.addressline1}</p>
                          <p>{item.addressline2}</p>
                          <p>{item.cityname}</p>
                          <p>{item.postcode}</p>
                          <p>{item.phone}</p>
                          <hr />
                        </div>
                        <div className="col-md-2 pt-5">
                          <button onClick={() => AddressDeleteHandler(item.id)} className="btn"><MdDelete /></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            : null}

          {orders ?
            <div className="col-md-12">
              <div style={{ height: '40em', width: '100%' }} className="card">
                <div className="card-body">
                  <div className="d-flex flex-row justify-content-between">

                    <div className="row mt-5" style={{ overflowY: 'scroll', height: "500px", overflowX: "hidden", width: '100%' }}>
                      <div className="col-md-12 ">


                        {/* <Table striped bordered hover variant="">

                          <thead>
                            <th>OrderID</th>
                            <th>Billing Address</th>
                            <th>Order placed</th>
                            <th>Total</th>

                          </thead>
                          <tbody > */}
                        {/* {details.map((item, key) => {
                              return (
                                <>
                                  <tr style={{ backgroundColor: "#fff" }}>
                                    {/* <td style={{ width: "10%" }}>
                                    {item.images.map((image, i) => {
                                      return (
                                        <img style={{ width: "100%", height: "5em", borderRadius: "10%" }} src={image.image1} alt="" />
                                      )
                                    })}
                                  </td> */}
                        {/* <td className="pt-2"><small><small>{item._id}</small></small><h5><strong>{item.orderId}</strong></h5></td>
                                    <td className="pt-4"></td>
                                    <td className="pt-4">{item.date}</td>
                                    <td className="pt-4"><BiRupee />{item.total}</td>
                                    <td><button style={{ borderRadius: "10%" }} onClick={() => { cancelHandler(item._id) }} className="btn-danger mt-3">Cancel</button></td>
                                  </tr>

                                  <tr>
                                    <td colSpan="6" >
                                      <div className="row px-3">
                                        <div className="col">
                                          {item.orderStatus == 'Delivered' ?
                                            <ul id="progressbar">
                                              <li className="step0 active" id="step1">PLACED</li>
                                              <li className="step0 active  text-center" id="step2">SHIPPED</li>
                                              <li className="step0 active  text-muted text-right" id="step3">DELIVERED</li>
                                            </ul>
                                            : null}
                                          {item.orderStatus == 'Pending' ?
                                            <ul id="progressbar">
                                              <li className="step0 active" id="step1">PLACED</li>
                                              <li className="step0 active  text-center" id="step2">SHIPPED</li>
                                              <li className="step0  text-muted text-right" id="step3">DELIVERED</li>
                                            </ul>
                                            : null}
                                          {item.orderStatus == 'placed' ?
                                            <ul id="progressbar">
                                              <li className="step0 active" id="step1">PLACED</li>
                                              <li className="step0   text-center" id="step2">SHIPPED</li>
                                              <li className="step0  text-muted text-right" id="step3">DELIVERED</li>
                                            </ul>
                                            : null}


                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )
                            })} */}
                        {/* </tbody>  */}

                        {/* </Table> */}

                        <Accordion>
                          <div className="row text-center">
                            <div className="col-md-3">
                              <h5><strong>OrderId</strong></h5>
                            </div>
                            <div className="col-md-2">
                              <h5><strong>Payment</strong></h5>

                            </div>
                            <div className="col-md-2">
                              <h5><strong>PlacedDate</strong></h5>

                            </div>
                            <div className="col-md-3">
                              <h5><strong>Status</strong></h5>

                            </div>
                            <div className="col-md-2">
                              <h5><strong></strong></h5>

                            </div>
                          </div>

                          {details.map((item, key) => {
                            return (
                              <Accordion.Item onClick={() => { text(item.addressid, item._id) }} eventKey={key}>


                                <Accordion.Header>
                                  <div className="row">
                                    <div className="col-md-3 pt-4">
                                      {item._id}
                                    </div>
                                    <div className="col-md-2 pt-4">
                                      {item.payment}
                                    </div>
                                    <div className="col-md-2 pt-4">
                                      {item.date}
                                    </div>
                                    <div className="col-md-5">
                                      {item.orderStatus == 'Delivered' ?
                                        <ul id="progressbar">
                                          <li className="step0 active" id="step1">PLACED</li>
                                          <li className="step0 active  text-center" id="step2">SHIPPED</li>
                                          <li className="step0 active  text-muted text-right" id="step3">DELIVERED</li>
                                        </ul>
                                        : null}
                                      {item.orderStatus == 'Pending' ?
                                        <ul id="progressbar">
                                          <li className="step0 active" id="step1">PLACED</li>
                                          <li className="step0 active  text-center" id="step2">SHIPPED</li>
                                          <li className="step0  text-muted text-right" id="step3">DELIVERED</li>
                                        </ul>
                                        : null}
                                      {item.orderStatus == 'placed' ?
                                        <ul id="progressbar">
                                          <li className="step0 active" id="step1">PLACED</li>
                                          <li className="step0   text-center" id="step2">SHIPPED</li>
                                          <li className="step0  text-muted text-right" id="step3">DELIVERED</li>
                                        </ul>
                                        : null}
                                    </div>

                                  </div>

                                </Accordion.Header>
                                <Accordion.Body>
                                  {productDetails.map((product, key) => {
                                    return (
                                      <div className="row">
                                        {product.images.map((image, index) => {
                                          return (
                                            <div className="col-md-2 mt-4">
                                              <img style={{ width: '80%', height: '5em', borderRadius: '5px' }} src={image.image1} alt="" />
                                            </div>
                                          )
                                        })}

                                        <div className="col-md-2 mt-5">
                                          <h5><strong>{product.name}</strong></h5>
                                          <h6><strong><small>{product.maincategory}</small></strong></h6>
                                        </div>
                                        <div className="col-md-2 mt-5">
                                          <h6><strong><small>{product.subcategory}</small></strong></h6>
                                        </div>
                                        <div className="col-md-2 mt-5">
                                          <h6><strong><small>{product.size}</small></strong></h6>
                                        </div>
                                        <div className="col-md-2 mt-5">
                                          <h6><small><BiRupee />{product.price}</small></h6>
                                        </div>
                                        {item.orderStatus == 'Delivered' ?
                                          null
                                          :
                                          <div className="col-md-2 mt-5">
                                            <button onClick={() => { cancelHandler(item._id, product._id) }} className="btn btn-danger">Cancel</button>
                                          </div>
                                        }

                                      </div>
                                    )
                                  })}

                                </Accordion.Body>
                              </Accordion.Item>
                            )
                          })}
                        </Accordion>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : null}



          {settings ?
            <div className="col-md-8">
              <div style={{ height: '100%' }} className="card">
                <div className="card-body">
                  {!pass ?
                    <button onClick={() => { setPass(true) }} className="btn">Change password</button>
                    :
                    <button onClick={() => { setPass(false) }} className="btn">Cancel</button>
                  }
                  {pass ?
                    <div className="pt-5">
                      <h5 className="card-title"><strong>Enter your password</strong></h5>
                      {forPass == false ?
                        <h5 style={{ color: "red" }}>Incorrect Password!</h5>
                        : null}
                      <p className="card-description">  </p>
                      <form className="forms-sample">
                        <Form.Group className="row pt-3">
                          <div className="col-sm-9">
                            <Form.Control type="text" onChange={checkPassword} className="form-control" id="password" />
                          </div>
                        </Form.Group>
                        <button onClick={submitPassword} style={{ marginTop: "2%", }} className="btn">Enter</button>
                      </form>
                    </div>
                    : null}
                </div>
              </div>
            </div>
            : null}

          {forPass ?
            <div className="col-md-8">
              <div style={{ height: '100%' }} className="card">
                <div className="card-body">
                  {success ?
                    <div>
                      <h4 className="card-title">Change Password</h4>
                      <p className="card-description">  </p>
                      <form className="forms-sample" onSubmit={ChangeNewPasswordHandler}>
                        <Form.Group className="row pt-3">
                          <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">NewPassword</label>
                          <div className="col-sm-9">
                            <Form.Control onChange={newPassHandler} type="password" className="form-control" id="newPassword" />
                          </div>
                        </Form.Group>
                        <Form.Group className="row pt-3">
                          <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Retype Password</label>
                          <div className="col-sm-9">
                            <Form.Control onChange={newPassHandler} type="password" className="form-control" id="retypePassword" />
                          </div>
                        </Form.Group>
                        <button type="submit" className="btn mt-3 mr-2">Cancel</button>
                        <button style={{ marginTop: "2%", }} className="btn">Apply</button>
                      </form>
                    </div>
                    :
                    null
                  }

                  {showSuccess ?
                    <h3>Password Updated</h3>
                    : null}
                </div>
              </div>
            </div>
            :
            null
          }

        </div>
        <div className="row">
          <div className="col-sm-3 grid-margin">
            <div className="card">
              <div className="card-body">

              </div>
            </div>
          </div>
          <div className="col-sm-3 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">

                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 grid-margin">
            <div className="card">
              <div className="card-body">

                <div className="row">


                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3 grid-margin">
            <div className="card">
              <div className="card-body">

                <div className="row">


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default Profile;