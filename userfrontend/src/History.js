import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import './hystory.css'


function History() {

    const userId = localStorage.getItem('id')

    const [data, setData] = useState([])


    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = () => {
        console.log('started')
        axios.get(`http://localhost:5000/users/forhistory/${userId}`).then((res) => {
            console.log('ccccc')
            console.log(res.data)
            setData(res.data)
        }).catch((err) => {
            console.log(err)
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




                <div className="row pt-5 py-3 ">
                    {data.map((item, k) => {
                        return (
                            <div className="row mt-5">

                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="aligner-wrapper text-center">
                                                <img style={{ width: '65%', borderRadius: '10%' }} className="profileImg" src="https://www.johnniewalker.com/media/5652/c4_explore_johnnie_walker_green15_label_d.jpg" alt="" />
                                                <div className="absolute center-content">
                                                    <h4 className="text-small text-muted text-center mb-0"></h4>
                                                    <h6 className="text-small text-muted text-center mb-0"></h6>
                                                    <h6 className="text-small text-muted text-center mb-0"></h6>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 grid-margin stretch-card ">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-row justify-content-between">
                                                <h4 className="card-title mb-1">Details</h4>
                                                <button className="btn">Order dispatch</button>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 grid-margin stretch-card">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h4 className="card-title"></h4>
                                                            <p className="card-description">  </p>
                                                            <form className="forms-sample">
                                                                <Form.Group className="row pt-3">                                               
                                                                         <div className="col-md-6">
                                                                    <h4>{item.name}</h4>
                                                                </div>

                                                                </Form.Group>
                                                                <Form.Group className="row pt-3">


                                                                    <div className="col-md-6">
                                                                        <h5>{item.maincategory}</h5>
                                                                    </div>

                                                                </Form.Group>
                                                                <Form.Group className="row pt-3">

                                                                    <div className="col-md-6">
                                                                        <h4>{item.size}</h4>
                                                                    </div>

                                                                </Form.Group>
                                                                <Form.Group className="row pt-3">

                                                                    <div className="col-md-6">
                                                                        <h4>{item.subcategory}</h4>
                                                                    </div>

                                                                </Form.Group>
                                                            </form>
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
