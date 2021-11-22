import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import instance from '../axios-orders'
import './style.css'
import { useHistory } from "react-router-dom"


function Buttons() {

  const [data, setData] = useState([])
  const [fordelete, setFordelete] = useState(false)
  let history = useHistory();

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
    instance.get('/getproducts').then((res) => {
      const newData = res.data
      setData(newData)
    })
  }

  console.log(data)

  const deleteProduct = (productId) => {
    setFordelete(!fordelete)
    console.log(productId)
    instance.post(`/deleteproduct/?id=${productId}`).then((response) => {
      console.log('all finish')
    })
  }

  const EditProduct = (id) => {
    history.push(`/editproducts/${id}`);
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
      <div className="row" >
        <div className="col-12 grid-margin stretch-card" >
          <div className="card" >
            <div className="card-body" >
              <h4 className="card-title">All Products</h4>
              <p className="card-description">You can edit this products by clicking them.</p>
              <div className="template-demo">
                <div className="row text-center" style={{ overflowY: 'scroll',height:'70vh'}}>

                  {data.map((item, key) => {
                    return (
                      <div className="col-md-3 col-xl-2 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title">{item.name}</h4>
                            <p className="text-muted text-small text-center justify-content-center">{item.description}.</p>
                            <Slider className="portfolio-slider" {...sliderSettings}>
                              {item.images.map((itm, k) => {
                                return (
                                  <div className="parent mt-3">
                                    <img style={{ height: "10em" }} className="image1" src={itm.image1} alt="carousel-item" />
                                  </div>
                                )
                              })}
                            </Slider>
                            <div className="d-flex py-4">
                              <div className="preview-list w-100">
                                <div className="preview-item p-0">
                                  <div className="preview-item-content d-flex flex-grow">
                                    <div className="flex-grow">
                                      <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                        <h6 className="preview-subject">{item.category}</h6>
                                      </div>
                                      {item.quantity == 0 ?
                                        <small className="text-danger">Out of stock</small>
                                        :
                                        item.quantity <= 3 ?
                                          <small className="text-warning">Only {item.quantity} stock!</small>
                                          :
                                          <small>{item.quantity}</small>
                                      }
                                      <p className="text-muted pt-1">{item.price}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className=" progress-md portfolio-progress">
                              <button onClick={() => { EditProduct(item._id) }} type="button" className="btn btn-outline-primary btn-fw">Edit</button>
                              <button onClick={() => { deleteProduct(item._id) }} type="button" className="btn btn-outline-danger btn-fw ">Delete</button>
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