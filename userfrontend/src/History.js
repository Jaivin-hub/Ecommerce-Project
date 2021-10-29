import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import './hystory.css'


function History() {

    const userId = localStorage.getItem('id')

    const [data, setData] = useState([])
    const [address,setAddress] = useState([])


    useEffect(() => {
        getProduct()
    }, [])

    

    const getProduct = () => {
       
        axios.get(`http://localhost:5000/users/forhistory/${userId}`).then((res) => {
           
            if(res){
                axios.get(`http://localhost:5000/users/findAddress/${userId}`).then((response) => {
                    
                    setAddress(response)
                })
            }
            setData(res.data)
        }).catch((err) => {
           
        })
    }

   
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




                <div className="row  py-3 ">
                    {data.map((item, k) => {
                        return (
                            <div className="row ">

                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        {item.images.map((image, i) => {
                                            return (
                                                <div className="card-body">
                                                    <div className="aligner-wrapper text-center">
                                                        <img style={{ width: '100%', borderRadius: '10%', height: '22em' }} src={image.image1} alt="" />
                                                        <div className="absolute center-content">
                                                            <h4 className="text-small text-muted text-center mb-0"></h4>
                                                            <h6 className="text-small text-muted text-center mb-0"></h6>
                                                            <h6 className="text-small text-muted text-center mb-0"></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                                <div className="col-md-8 grid-margin stretch-card ">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <h4 className="card-title mb-1">Details</h4>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 grid-margin stretch-card">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-6 ">
                                                                    <p className="card-description"> <u>Product details</u> </p>
                                                                    <Form.Group className="row pt-3">
                                                                        <div className="col-md-6">
                                                                            <h2><strong>{item.name}</strong></h2>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group className="row pt-3">
                                                                        <div className="col-md-6">
                                                                            <h5><small><strong>{item.maincategory}</strong></small></h5>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group className="row ">
                                                                        <div className="col-md-6">
                                                                            <h6><small>{item.size}</small></h6>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group className="row pt-3">
                                                                        <div className="">
                                                                            <h5>{item.subcategory}</h5>
                                                                        </div>
                                                                    </Form.Group>
                                                                </div>
                                                                {/* {address.map((item, key)=>{
                                                                    return(
                                                                        <div className="col-md-6">
                                                                <p className="card-description"> <u>Billing Address details</u> </p>
                                                                    <Form.Group className="row pt-3">
                                                                        <div className="col-md-6">
                                                                            <h2><strong>{item.firstname}</strong></h2>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group className="row pt-3">
                                                                        <div className="col-md-6">
                                                                            <h5><small><strong>{item.addressline1}</strong></small></h5>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group className="row ">
                                                                        <div className="col-md-6">
                                                                            <h6><small>{item.addressline2}</small></h6>
                                                                        </div>
                                                                    </Form.Group>
                                                                    <Form.Group className="row pt-3">
                                                                        <div className="">
                                                                            <h5>{item.statename}</h5>
                                                                        </div>
                                                                    </Form.Group>
                                                                </div>
                                                                    )
                                                                })} */}
                                                                


                                                            </div>
                                                            <div class="row px-3">
                                                                <div class="col">
                                                                    <ul id="progressbar">
                                                                        <li class="step0 active " id="step1">PLACED</li>
                                                                        <li class="step0 active text-center" id="step2">SHIPPED</li>
                                                                        <li class="step0 text-muted text-right" id="step3">DELIVERED</li>
                                                                    </ul>
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

                        )
                    })}



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
    )
}

export default History
