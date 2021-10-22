import React from 'react';
import { GrDeliver } from "react-icons/gr";

function Details(){
    return(
        <div className="col-md-12 pt-3">
            <div style={{backgroundColor: '#4e6446'}} className="row">
                <div className="details">
                    <div className="row">
                        <div className="col-md-2 text-center">
                        <img style={{width: '60%'}} src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-fast-delivery.png" alt="" />
                        <p className="text-light">Fast AU Delivery | 1 Day Dispatch*</p>
                        </div>
                        <div className="col-md-2 text-center">
                            <img style={{width: '60%'}} src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-100-items.png" alt="" />
                            <p className="text-light">500+ Drinks</p>
                        </div>
                        <div className="col-md-2 text-center">
                            <img style={{width: '60%'}} src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-great-gifting.png" alt="" />
                            <p className="text-light">Great Gift Ideas</p>
                        </div>
                        <div className="col-md-2 text-center">
                           <img style={{width: '60%'}} src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-handled-with-care.png" alt="" />
                           <p className="text-light">Handled With Care</p>
                        </div>
                        <div className="col-md-2 text-center">
                            <img style={{width: '60%'}} src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-secure-checkout.png" alt="" />
                            <p className="text-light">Secure Site</p>
                        </div>
                        <div className="col-md-2 text-center">
                            <img style={{width: '60%'}} src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/icons-recyclable-packaging.png" alt="" />
                            <p className="text-light">Plastic Free Packaging</p>
                        </div>
                    </div>
                    <div className="delevarydetails m-5">
                    <div className="row text-center pt-5">
                        <h4><strong>YOUR SOURCE FOR FINE ALCOHOL DELIVERY</strong></h4>
                        <p className="text-light pt-4">YourOwn is a supplier of fine alcohol online, including whisky, spirits, liqueurs and wine. We source from the best distilleries and wineries in the world, bringing you a handpicked beverage selection from collectors rare editions to popular drinks. We are your premier option for alcohol online and wine and liquor delivery in Australia.</p>
                    </div>
                    <div className="row text-center pt-5">
                        <h4><strong>PREMIUM WHISKY COLLECTION</strong></h4>
                        <p className="text-light pt-4">We are a great liquor delivery option for rare and collectable drinks, especially whisky, offering an expansive selection of award winning global brands, from Scotland, Japan, North America, Australia and Ireland. Discover hundreds of options in all price ranges.</p>
                    </div>
                    <div className="row text-center pt-5">
                        <h4><strong>THE PERFECT MATCH FOR YOUR PALATE</strong></h4>
                        <p className="text-light pt-4">We are a great liquor delivery option for rare and collectable drinks, especially whisky, offering an expansive selection of award winning global brands, from Scotland, Japan, North America, Australia and Ireland. Discover hundreds of options in all price ranges.Whether you stick with your favourite drinks, or an aficionado dedicated to expanding your palate, you’re sure to find the perfect match at YourOwn. Add to your collection piece by piece, or we can provide bespoke solutions when you need to buy in bulk for corporate events and the celebrations in your life.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;