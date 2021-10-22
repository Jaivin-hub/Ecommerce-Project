import React, { useState, useEffect } from 'react';
import './style.css'
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import Uploads from './uploads'
import { fileUploadAndResize } from './uploads';




export function Profile() {

  useEffect(() => {
    fetchImage()
  },[])

  let history = useHistory();

  

  var userName = localStorage.getItem('username');
  var email = localStorage.getItem('email');
  var phone = localStorage.getItem('phone');
  var lastname = localStorage.getItem('lastname');
  console.log(email)

  const [image, setImage] = useState('')
  const [userImage, setUserImage] = useState('')
  const [spinner,setSpinner] = useState(false)
  const [changeDetails,setChangeDetails] = useState(true)
  const [userPassword,setUserPassword] = useState('')
  const [openChangePass,setOpenChangePass] = useState(true)

  const imageUploadHandler = async (e) => {
    setSpinner(true)
    // console.log(e)
    const urlArray = await fileUploadAndResize(e)
    const details = { email, urlArray }
    axios.post('http://localhost:5000/users/addUserImage', details).then((response) => {
      console.log('rerutn from router')
      if (response) {
        fetchImage()
      }

    })
    console.log(urlArray);
  }



  const fetchImage = () => {
    console.log('fetchImage function called')

    axios.post('http://localhost:5000/users/fetchUserImage', { 'email': email }).then((res) => {
      console.log('Image fetched')
      setUserImage(res.data.image)
      setSpinner(false)
    })
  }


  const textChanged = (e) => {
    console.log(e.target.value)
  }

  const switchHistory = () => {
    history.push("/history");
  }

  const imageHandler = (e) => {
    console.log('called')
    console.log(e.target.files[0])
    axios.post('')
    setImage(e.target.files[0])
  }

  const checkPassword=(e)=>{
    console.log(e)
    const newData = {...userPassword}
    newData[e.target.id] = e.target.value
    setUserPassword(newData)
  }

  const submitPassword=()=>{
    setOpenChangePass(false)
    console.log('here')
    const data = {email,userPassword}
    axios.post(`http://localhost:5000/users/checkpassword`,data).then((res)=>{
      console.log('responding')
      if(res){
        
      }
    })
  }

  console.log(userPassword)


  console.log(image)


  return (
    <div>
      <div className="container">
        <div className="row pt-5 mt-5">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">

                  </div>
                  <div className="col-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">

                  </div>
                  <div className="col-3">

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">

                  </div>
                  <div className="col-3">

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">

                  </div>
                  <div className="col-3">

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="row pt-5 py-3 ">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Profile</h4>
                <div className="aligner-wrapper text-center">
                  {spinner?
                   <div style={{position: 'absolute',top:"33%",right:"48%"}} class="spinner-border text-success" role="status">
                   <span class="visually-hidden">Loading...</span>
                 </div>
                  :null}
                 
                  {userImage ?
                    <img className="profileImg" style={{ width: "80%", height: "15em", borderRadius: "10px" }} src={userImage}
                      alt="" />
                    :
                    <img className="profileImg" style={{ width: "80%", height: "15em" }} src=
                      'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
                      alt="" />
                  }
                  {userImage ?
                    <button className="btn mt-3"><input onInput={(e) => { imageUploadHandler(e) }} style={{ width: "80%", height: "2em", opacity: "0", cursor: "pointer" }} type="file" />EditImage</button>
                    :
                    <button className="btn mt-3"><input onInput={(e) => { imageUploadHandler(e) }} style={{ width: "80%", height: "2em", opacity: "0", cursor: "pointer" }} type="file" />AddImage</button>

                  }

                  <div className="absolute center-content">
                    <h4 className="text-small text-muted text-center mb-0">{userName} {lastname}</h4>
                    <h6 className="text-small text-muted text-center mb-0">{email}</h6>
                    <h6 className="text-small text-muted text-center mb-0">{phone}</h6>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="col-md-8 grid-margin stretch-card pt-5">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Details</h4>
                  <button onClick={switchHistory} className="btn">ViewOrder history</button>
                </div>
                <div className="row">
                  <div className="col-md-12 grid-margin stretch-card">
                    {changeDetails?
                    
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Edit profile</h4>
                        <p className="card-description">  </p>
                        <form className="forms-sample">
                          <Form.Group className="row pt-3">
                            <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-9">
                              <Form.Control type="text" onInput={textChanged} className="form-control" id="exampleInputUsername2" value={userName} />
                            </div>
                          </Form.Group>
                          <Form.Group className="row pt-3">
                            <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                              <Form.Control type="email" className="form-control" id="exampleInputEmail2" value={email} />
                            </div>
                          </Form.Group>
                          <Form.Group className="row pt-3">
                            <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Mobile</label>
                            <div className="col-sm-9">
                              <Form.Control type="text" className="form-control" id="exampleInputMobile" value={phone} />
                            </div>
                          </Form.Group>
                          <button style={{ width: '30%' }} type="submit" className="btn mt-3 mr-2">Edit</button>
                          <button onClick={() =>setChangeDetails(false)} style={{marginTop:"2%",}} className="btn">Change Password</button>
                        </form> 
                      </div>
                    </div>
                    :
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Enter your password</h4>
                        <p className="card-description">  </p>
                        <form className="forms-sample">
                          <Form.Group className="row pt-3">
                            <div className="col-sm-9">
                              <Form.Control type="text" onChange={checkPassword} className="form-control" id="password"  />
                            </div>
                          </Form.Group>
                          <button onClick={submitPassword} style={{marginTop:"2%",}} className="btn">Enter</button>
                        </form> 
                      </div>
                    </div>
                    }

                    {!openChangePass?
                    <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Change Password</h4>
                      <p className="card-description">  </p>
                      <form className="forms-sample">
                        <Form.Group className="row pt-3">
                          <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">NewPassword</label>
                          <div className="col-sm-9">
                            <Form.Control type="password" className="form-control" id="exampleInputUsername2" />
                          </div>
                        </Form.Group>
                        <Form.Group className="row pt-3">
                          <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Retype Password</label>
                          <div className="col-sm-9">
                            <Form.Control type="password" className="form-control" id="exampleInputEmail2" />
                          </div>
                        </Form.Group>
                        <button style={{ width: '30%' }} type="submit" className="btn mt-3 mr-2">Cancel</button>
                        <button style={{marginTop:"2%",}} className="btn">Apply</button>
                      </form> 
                    </div>
                  </div>
                    :null}

                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );

}

export default Profile;