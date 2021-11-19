import React, { useState, useEffect } from 'react';
import { BiRupee } from "react-icons/bi";
import { useHistory, useParams } from "react-router-dom";
import Footer from '../Footer'
import instance from '../axios-orders';



function Whisky(props) {

    const categories = useParams()
    const categoryName = categories.data
    const [data, setdata] = useState([])

    useEffect(() => {
        getdata()
    }, [categories])

    let history = useHistory();

    const [filtered, setFiltered] = useState(true)

    const getdata = () => {
        instance.get(`/getwhisky/${categoryName}`).then((res) => {
            const newdata = res.data
            console.log('oooo',res.data)
            setdata(newdata)
        })
    }

    console.log(data)

    const itemSelected = (id) => {
        history.push(`/productdetail/${id}`);
    }

    const [value, setValue] = useState()

    const textChange = (e) => {
        const newData = { ...value }
        newData[e.target.id] = e.target.value
        setValue(newData)
    }


    const filterHandler = (e) => {
        e.preventDefault()
        console.log('axios function')
        console.log(data[0].subcategory)
        const subcategory = data[0].subcategory
        const { minValue, maxValue } = value
        const mainData = { minValue, maxValue, subcategory }
        console.log(minValue)
        console.log(maxValue)

        instance.post('/filterprice', mainData).then((res) => {
            console.log('data returned')
            console.log(res.data)
            setdata(res.data)
            setFiltered(false)
            // setFilteredData(res.data)
        })
    }

    return (

        <div className="col-md-12">
            <div className="container">

                <div>
                    <div className="row text-center pt-3">
                        <h2><strong>{categoryName}</strong></h2>
                        <div className="img pt-4">
                            <img src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/fy21-catbanner8.jpg" alt="" />
                        </div>
                    </div>
                    <div className="row pt-5">
                        <h3><strong>BUY {categoryName} ONLINE IN INDIA</strong></h3>
                        <div className="message pt-3">
                            <p>Whisky is known worldwide for its unique aromas and distinctive flavors.
                                Whether you are looking for popular editions or hard-to-find collectables,
                                GoodDrop brings you an unparalleled selection of Scotch whisky brands from
                                Scotland. We have the best Scotch whisky selection available online in
                                India, and ship to any location nationwide.</p>
                        </div>
                        <div className="message2 pt-3">
                            <p>From common releases of Scotch to unique rarities,
                                you’ll be impressed with our range of Scotch whisky
                                brands that come from different regions in Scotland.
                                Shop our online store to discover a variety of Scotch
                                whisky brands that are distinctive to the Scottish regions
                                where they are distilled.</p>
                        </div>
                    </div>
                </div>


                {props.name == 'JAPANESE WHISKY' ?

                    <div>
                        <div className="row text-center pt-3">
                            <h2><strong>JAPANESE WHISKY</strong></h2>
                            <div className="img pt-4">
                                <img src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/fy21-catbanner11.jpg" alt="" />
                            </div>
                        </div>
                        <div className="row pt-5">
                            <h3><strong>BUY JAPANESE WHISKY ONLINE IN INDIA</strong></h3>
                            <div className="message pt-3">
                                <p>Japanese whisky continues to take the world by storm, with a number
                                    of new and innovative distilleries opening around the country.
                                    While most people associated whisky with more traditional locations
                                    in Scotland and Ireland, eastern nations like Japan continue to influence
                                    whisky trends and consumption patterns. Japanese whiskies share a number of
                                    similarities with traditional Scotch whisky, as production is based on a conscious
                                    attempt to recreate whisky in the Scottish style</p>
                            </div>

                        </div>
                    </div>

                    : null}

                {props.name == 'IRISH WHISKY' ?
                    <div>
                        <div className="row text-center pt-3">
                            <h2><strong>IRISH WHISKEY</strong></h2>
                            <div className="img pt-4">
                                <img src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/fy21-catbanner14.jpg" alt="" />
                            </div>
                        </div>
                        <div className="row pt-5">
                            <h3><strong>BUY IRISH WHISKEY ONLINE IN INDIA</strong></h3>
                            <div className="message pt-3">
                                <p>In Gaelic, “whiskey” means “water of life” - and the best
                                    Irish whisky brands have a storied history on the Emerald Isle and beyond.
                                    Get ready to explore both traditional Irish whiskey brands and discover some
                                    new distillers. GoodDrop brings you the best selection of premium Irish whiskey
                                    available online in India.

                                </p>
                            </div>
                            <div className="message2 pt-3">
                                <p>Explore traditional whiskies from historical game-changers
                                    such as Jameson and Bushmills, or discover some of our limited editions and
                                    hard-to-find rarities - sure to give you a little luck of the Irish.

                                </p>
                            </div>
                        </div>
                    </div>
                    : null}


                {props.name == 'AMERICAN WHISKY' ?
                    <div>
                        <div className="row text-center pt-3">
                            <h2><strong>{props.name}</strong></h2>
                            <div className="img pt-4">
                                <img src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/fy21-catbanner15.jpg" alt="" />
                            </div>
                        </div>
                        <div className="row pt-5">
                            <h3><strong>BUY AMERICAN WHISKEY ONLINE IN INDIA</strong></h3>
                            <div className="message pt-3">
                                <p>American whiskey is known worldwide for its unique aroma of
                                    aged oak and grain. YourOwn brings you a fine selection of American whiskey,
                                    available online in India. Strict distillery standards and persistence
                                    have made America’s whiskey stand the test of time. We offer a selection
                                    of the best Jack Daniel’s distillations, from widely produced editions to
                                    limited editions that are sure to impress guests at your next event. Explore
                                    our whiskey selection today.
                                </p>
                            </div>
                        </div>
                    </div>
                    : null}

                {props.name == 'AUSTRALIAN WHISKY' ?
                    <div>
                        <div className="row text-center pt-3">
                            <h2><strong>{props.name}</strong></h2>
                            <div className="img pt-4">
                                <img src="https://cdn11.bigcommerce.com/s-erpoah/product_images/uploaded_images/fy21-catbanner12.jpg" alt="" />
                            </div>
                        </div>
                        <div className="row pt-5">
                            <h3><strong>BUY AUSTRALIAN WHISKY ONLINE IN INDIA</strong></h3>
                            <div className="message pt-3">
                                <p>Australia is home to a growing number of distilleries.
                                    Although Tasmania is at the heart of whisky production
                                    in the country, other producers are taking up shop - all
                                    with something different on offer.
                                </p>
                            </div>
                        </div>
                    </div>
                    : null}

                <div className="row">
                    <div className="col-md-2">
                        <div className="row pt-5">
                            <h6><strong>REFINE BY</strong></h6>
                            {filtered ?
                                <small className="pt-2">No filters applied</small>
                                : null}

                            <h6 className="pt-3"><strong>Price</strong></h6>
                            <form onSubmit={filterHandler} autoComplete="off">
                                <div className="row pt-3">
                                    <div className="col-md-6 text-center">
                                        <input id="minValue" onChange={textChange} placeholder="Min." style={{ width: '100%' }} type="text" />
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <input id="maxValue" onChange={textChange} placeholder="Max." style={{ width: '100%' }} type="text" />
                                    </div>
                                    <div className="pt-3">
                                        <button type="submit" style={{ width: '100%' }} className="btn">UPDATE</button>
                                    </div>
                                </div>
                            </form>
                            <div className="row pt-3">
                                <h6><strong>VARIETAL</strong></h6>
                                {/* <h6 className="pt-2"><small>{data[0].subcategory}</small></h6> */}
                            </div>
                            {data.map((item, key) => {
                                return (
                                    <div className="row pt-2">
                                        <div className="col-md-2">
                                            <input type="checkbox" />
                                        </div>
                                        <div className="col-md-10">
                                            <small key={item.name}><small>{item.name}</small></small>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="row">

                            {data.map((item, key) => {
                                return (
                                    <div className="col-md-4">
                                        <hr />
                                        {item.images.map((image, index) => {
                                            return (
                                                <div onClick={() => { itemSelected(item._id) }} className="profile-card-6"><img src={image.image1} style={{ width: '80%', height: '18em' }} />
                                                    <div className="profile-name">{item.name}
                                                    </div>
                                                    <div className="profile-position">{item.subcategory}</div>
                                                    <div className="profile-overview">
                                                        <div className="profile-overview">
                                                            <div className="row text-center">
                                                                <div className="col-xs-4">
                                                                    <h3>1</h3>
                                                                    <p>{item.name}</p>
                                                                </div>
                                                                <div className="col-xs-4">
                                                                    <p>{item.description}</p>
                                                                </div>
                                                                <div className="col-xs-4">
                                                                    <h3><BiRupee />{item.price}/-</h3>
                                                                    <p></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Whisky;