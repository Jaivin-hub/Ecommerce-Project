import React from "react";
import { Carousel } from 'react-bootstrap'

function Home() {
    return (
        <div className="col-md-12">
            <div className="row">
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1417/cognac-hpb2.jpg?c=2"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1417/cognac-hpb2.jpg?c=2"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1417/cognac-hpb2.jpg?c=2"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="row pt-5">
                <div className="col-md-4 text-center">
                    <img src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/500x500/q/fy21-fcatbanner63__20309.original.jpg" alt="" />
                </div>
                <div className="col-md-4 text-center">
                    <img src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/500x500/m/fy21-fcatbanner47__77926.original.jpg" alt="" />
                </div>
                <div className="col-md-4 text-center">
                    <img src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/500x500/n/fy21-fcatbanner42__54676.original.jpg" alt="" />
                </div>
            </div>
            <div className="row text-center pt-4">
                <h3><strong>NEW PRODUCTS</strong></h3>
            </div>
        </div>
    )
}

export default Home;