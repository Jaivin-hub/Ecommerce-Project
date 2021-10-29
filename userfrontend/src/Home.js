import React,{useEffect} from "react";
import { Carousel } from 'react-bootstrap'
import Products from './products'
import Ads from './Ads'
import Products2 from "./products2";
import Adstwo from './Adstwo'
import Details from "./details"
import Mostpopular from "./Mostpopular";
import Footer from './Footer'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import Header from '../src/Header'
function Home(props) {

    console.log('this is home')
    const location = useLocation();
    // const userDetails =  location.state.details
    // console.log(userDetails.firstname)
    
        

    useEffect(()=>{
        getProducts()
    },[])



    const getProducts=()=>{
        console.log('its here...')
        axios.get('/users/getProductsCategory').then((res)=>{
            const newData = res.data
            console.log(newData[0])
        })
    }

    
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
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1419/hpb3__69857.jpg?c=2"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1423/glenlivet21-hpb.jpg?c=2"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1420/hpb2__16186.jpg?c=2"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/original/carousel/1429/hpb5__29197.jpg?c=2"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="row d-flex justify-content-around p-4"> 
             
               
                    <img  src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/500x500/q/fy21-fcatbanner63__20309.original.jpg" style={{height:"400px",width:"500px"}} alt="" />
              
                    <img src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/500x500/m/fy21-fcatbanner47__77926.original.jpg" style={{height:"400px",width:"500px"}} alt="" />
              
                    <img src="https://cdn11.bigcommerce.com/s-erpoah/images/stencil/500x500/n/fy21-fcatbanner42__54676.original.jpg" style={{height:"400px",width:"500px"}} alt="" />
              
           
            </div>
            <div className="row text-center pt-4">
                <h3><strong>NEW PRODUCTS</strong></h3>
            </div>
            <Products />
            <Ads />
            <Products2 />
            <Adstwo />
            <Details />
            <Mostpopular />
            <Footer />
        </div>
    )
}

export default Home;