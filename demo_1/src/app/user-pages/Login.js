import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import instance from '../axios-orders'
import { useHistory } from "react-router-dom"

function Login() {
  let history = useHistory();
  const [userName,setUserName] = useState()
  const [password,setPassword] = useState()
  const usernameHandler = (e)=>{
    setUserName(e.target.value)
  }
  const passwordHandler = (e)=>{
    setPassword(e.target.value)
  }
  console.log(userName)
  console.log(password)

  const submitHandler = (e)=>{
    e.preventDefault()
    const data = {userName:userName,password:password}
    if(userName!=null,password!=null){
      console.log('uuuuuu8888uuuuuuu')
      instance.post('/checkadmin',data).then((response)=>{
      console.log('returning')
      if(response.data.msg=='admin'){
        localStorage.setItem("admin",'admin');
        history.push("/dashboard");
      }
    })

    }
    console.log('function activated')
  }
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <h2>YourOwn</h2>
                <h4 className="pt-3">Welcome! Admin</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form onSubmit={submitHandler} className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control onInput={usernameHandler} type="text" placeholder="Username" size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control onInput={passwordHandler} type="password" placeholder="Password" size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/register">SIGN IN</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  
}

export default Login
