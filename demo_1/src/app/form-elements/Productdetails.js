import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

function Productdetails() {

    const id = useParams()
    
    // console.log(id.id)
    const userId = id.id
    
    

    const [data, setData] = useState([])


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        console.log('first')
        axios.get(`http://localhost:3000/users/getall/${userId}`).then((res) => {
            // console.log(res.data[0].products)
            
            axios.post(`http://localhost:3000/users/getallproduct`, res.data[0].products).then((res) => {
                const value = res.data
                setData(value)
                // console.log(res.data)
            })
        })
        
    }

    console.log(data);
    
    // console.log(data)

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div>
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        Products
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>OrderManagement</a></li>
                            <li className="breadcrumb-item active" aria-current="page">ProductDetails</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Ordered Products</h4>
                                <div className="template-demo">
                                    <div className="row text-center">

                                        {data.map((itm, k) => {
                                            return (


                                                <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h4 className="card-title"></h4>
                                                            <Slider className="portfolio-slider" {...sliderSettings}>
                                                                <div className="item">
                                                                    <img src={require('../../assets/images/dashboard/Rectangle.jpg')} alt="carousel-item" />
                                                                </div>
                                                                <div className="item">
                                                                    <img src={require('../../assets/images/dashboard/Img_5.jpg')} alt="carousel-item" />
                                                                </div>
                                                                <div className="item">
                                                                    <img src={require('../../assets/images/dashboard/img_6.jpg')} alt="carousel-item" />
                                                                </div>
                                                            </Slider>
                                                            <div className="d-flex py-4">
                                                                <div className="preview-list w-100">
                                                                    <div className="preview-item p-0">
                                                                        <div className="preview-item-content d-flex flex-grow">
                                                                            <div className="flex-grow">
                                                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                                                    <h6 className="preview-subject">{itm.name}</h6>
                                                                                    <p className="text-muted text-small">{itm.maincategory}</p>
                                                                                </div>
                                                                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                                                    <h6 className="preview-subject">{itm.subcategory}</h6>
                                                                                    <p className="text-muted text-small">{itm.price}</p>
                                                                                </div>
                                                                                <p className="text-muted"></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <p className="text-muted">Sailes</p> */}



                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}



                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Productdetails
