import React from 'react';
import './style.css';

function Header() {
    return (
        <div>
            <div className="footer col-md-12 mt-5">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    <h6><strong>NAVIGATE</strong></h6>
                                    <div>
                                        <small>Blog</small><br />
                                        <small>Contact Us</small><br />
                                        <small>About Us</small><br />
                                        <small>Corporate / Bulk Orders</small><br />
                                        <small>Delivery</small><br />
                                        <small>FAQ's</small><br />
                                        <small>Legal</small><br />
                                        <small>Privacy Policy</small><br />
                                        <small>Returns & Refunds</small><br />
                                        <small>Terms & Conditions</small><br />
                                        <small>Sitemap</small>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h6><strong>CATEGORIES</strong></h6>
                                    <div>
                                        <small>Whisky</small><br />
                                        <small>Spirits</small><br />
                                        <small>Liqueur</small><br />
                                        <small>Wine</small><br />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <h6><strong>POPULAR BRANDS</strong></h6>
                                    <div>
                                        <small>wild oats</small><br />
                                        <small>absolut</small><br />
                                        <small>jack daniels</small><br />
                                        <small>vodka cruiser</small><br />
                                        <small>beach hut</small><br />
                                        <small>johnnie walker</small><br />
                                        <small>patron</small><br />
                                        <small>smirnoff</small><br />
                                        <small>chain of fire</small><br />
                                        <small>chivas regal</small><br />
                                        <small>View All</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">

                                </div>
                                <div className="col-md-6">
                                    <div className="">
                                        <h6><strong>SUBSCRIBE TO OUR NEWSLETTER</strong></h6>
                                    </div>
                                    <div>
                                        <small>Get the latest updates on new products and upcoming sales</small>
                                    </div>
                                    <div className="subscribe pt-3">
                                        <input placeholder=" Your email address" className="subinp" type="text" />
                                        <button className="subbtn">SUB</button>
                                    </div>
                                    <div className="pt-3">
                                        <small>Sign up to yourown; a weekly dose of our best deals, first dibs on new arrivals and exclusive event access .</small>
                                    </div>
                                    <div className="pt-4">
                                        <img className="paymentImgs" src="https://www.kindpng.com/picc/m/96-966452_visa-mastercard-logo-black-and-white-hd-png.png" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pt-5">
                    <small>
                        YourOwn supports the Responsible Service of Alcohol. New South Wales: Liquor Act 2007 - It is against the law to sell or supply alcohol to, or to obtain alcohol on behalf of, a person under the age of 18 years. Victoria: Warning - Under the Liquor Control Reform Act 1998 it is an offence to supply alcohol to a person under the age of 18 years (penalty exceeds $17,000), for a person under the age of 18 years to purchase or receive liquor (penalty exceeds $700). Western Australia: WARNING. Under the Liquor Control Act 1988, it is an offence: to sell or supply liquor to a person under the age of 18 years on licensed or regulated premises; or for a person under the age of 18 years to purchase, or attempt to purchase, liquor on licensed or regulated premises. South Australia: Under Liquor Licensing Act 1997, Liquor must NOT be supplied to persons under 18. Queensland: Under the Liquor Act 1992, it is an offence to supply liquor to a person under the age of 18 years. Tasmania: Under the Liquor Licensing Act 1990 it is an offence: for liquor to be delivered to a person under the age of 18 years. Penalty: Fine not exceeding 20 penalty units. For a person under the age of 18 years to purchase liquor. Penalty, Fine not exceeding 10 penalty units. For more information visit our Legal page. *1 Day Dispatch Monday-Friday.
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Header;