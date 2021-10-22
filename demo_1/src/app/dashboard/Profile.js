import React from 'react';
import './style.css'
import { Form } from 'react-bootstrap';


 function Profile() {

  

  return (
    <div>
      <div className="row pt-5">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-9">
                  <h1>lsdk</h1>
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
      <div className="row">
        <div className="col-md-4 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Profile</h4>
              <div className="aligner-wrapper text-center">
                <img className="profileImg" src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="" />
                <div className="absolute center-content">
                  {/* <h5 className="font-weight-normal text-whiite text-center mb-2 text-white">1200</h5>
                    <p className="text-small text-muted text-center mb-0">Total</p> */}
                </div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  {/* <h6 className="mb-1">Transfer to Paypal</h6>
                    <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p> */}
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  {/* <h6 className="font-weight-bold mb-0">$236</h6> */}
                </div>
              </div>
              <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                <div className="text-md-center text-xl-left">
                  <h6 className="mb-1">Tranfer to Stripe</h6>
                  <p className="text-muted mb-0">07 Jan 2019, 09:12AM</p>
                </div>
                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                  <h6 className="font-weight-bold mb-0">$593</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <h4 className="card-title mb-1">Details</h4>
                <p className="text-muted mb-1">Your data status</p>
              </div>
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Horizontal Form</h4>
                      <p className="card-description"> Horizontal form layout </p>
                      <form className="forms-sample">
                        <Form.Group className="row">
                          <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Username</label>
                          <div className="col-sm-9">
                            <Form.Control type="text" className="form-control" id="exampleInputUsername2" placeholder="Username" />
                          </div>
                        </Form.Group>
                        <Form.Group className="row">
                          <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">Email</label>
                          <div className="col-sm-9">
                            <Form.Control type="email" className="form-control" id="exampleInputEmail2" placeholder="Email" />
                          </div>
                        </Form.Group>
                        <Form.Group className="row">
                          <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Mobile</label>
                          <div className="col-sm-9">
                            <Form.Control type="text" className="form-control" id="exampleInputMobile" placeholder="Mobile number" />
                          </div>
                        </Form.Group>
                        <button type="submit" className="btn btn-primary mr-2">Edit</button>
                        <button className="btn btn-dark">Cancel</button>
                      </form>
                    </div>
                  </div>
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
  );

}

export default Profile;