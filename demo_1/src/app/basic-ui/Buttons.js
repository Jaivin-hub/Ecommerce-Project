import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap'
import Slider from "react-slick";
import axios from 'axios'
import './style.css'


function Buttons() {

  const [data, setData] = useState([])
  const [fordelete, setFordelete] = useState(false)

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  useEffect(() => {
    getData()
  }, [fordelete])

  const getData = () => {
    axios.get('http://localhost:3000/users/getproducts').then((res) => {
      const newData = res.data
      setData(newData)
    })
  }

  console.log(data)

  const deleteProduct = (productId) => {
    setFordelete(!fordelete)
    console.log(productId)
    axios.post(`http://localhost:3000/users/deleteproduct/?id=${productId}`).then((response) => {
      console.log('all finish')
    })
  }

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">
          Products
        </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>UI Elements</a></li>
            <li className="breadcrumb-item active" aria-current="page">Buttons</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">All Products</h4>
              <p className="card-description">You can edit this products by clicking them.</p>
              <div className="template-demo">
                <div className="row text-center">

                  {data.map((item, key) => {
                    return (
                      <div className="col-md-6 col-xl-4 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title">{item.name}</h4>
                            <Slider className="portfolio-slider" {...sliderSettings}>
                              {item.images.map((itm, k) => {
                                return (
                                  <div>
                                    <div className="item">
                                      <img src={itm.image1} alt="carousel-item" />
                                    </div>
                                    <div className="item">
                                      <img src={itm.image2} alt="carousel-item" />
                                    </div>
                                    <div className="item">
                                      <img src={itm.image3} alt="carousel-item" />
                                    </div>
                                    <div className="item">
                                      <img src={itm.image4} alt="carousel-item" />
                                    </div>
                                  </div>
                                )
                              })}
                            </Slider>
                            <div className="d-flex py-4">
                              <div className="preview-list w-100">
                                <div className="preview-item p-0">
                                  {/* <div className="preview-thumbnail">
                        <img src={require('../../assets/images/faces/face12.jpg')} className="rounded-circle" alt="face" />
                      </div> */}
                                  <div className="preview-item-content d-flex flex-grow">
                                    <div className="flex-grow">
                                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                        <h6 className="preview-subject">{item.category}</h6>
                                        <p className="text-muted text-small">{item.description}.</p>
                                      </div>
                                      <p className="text-muted">{item.price}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" progress-md portfolio-progress">
                              <button onClick={() => { deleteProduct(item._id) }} type="button" className="btn btn-outline-danger btn-fw">Delete</button>
                            </div>
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
  );

}

export default Buttons;