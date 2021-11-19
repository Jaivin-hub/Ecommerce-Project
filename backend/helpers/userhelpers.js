var db = require('../config/connection')
const { v4: uuidv4 } = require('uuid');
var ObjectID = require('mongodb').ObjectID
const generateToken = require('../Utils/generateToken')

module.exports = {

    addUser: (user) => {
        return new Promise(async (resolve, reject) => {
            let res = await db.get().collection('usermanagement').insertOne(user)
            let id = "" + res.insertedId
            let response = await db.get().collection('usermanagement').find({ _id: ObjectID(id) }).project({ password: 0 }).toArray()
            responseWithToken = { ...response[0], token: generateToken(response[0]._id) }
            resolve(responseWithToken)
        })
    },

    fetchUser: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').find().toArray().then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log(err)
            })
        })
    },


    addProducts: (products) => {
        return new Promise((resolve, reject) => {
            const image1 = products.image1
            const image2 = products.image2
            const image3 = products.image3
            const image4 = products.image4
            const images = { image1, image2, image3, image4 }
            const name = products.value.name
            const quantity = parseInt(products.value.quantity)
            const size = products.value.size
            const subcategory = products.value.subcategory
            const maincategory = products.value.maincategory
            const price = parseInt(products.value.price)
            const description = products.value.description
            db.get().collection('productmanagement').insertOne({ name: name, quantity: quantity, size: size, subcategory: subcategory, maincategory: maincategory, price: price, description: description, images: [images], date: new Date() }).then((res) => {
                resolve(res.insertedId)
            })
        })
    },


    fetchReport: (type) => {
        console.log("+++++++++++++++++++++++");
        console.log(type);
        const numberOfDays = type === 'daily' ? 1 : type === 'weekly' ? 7 : type === 'monthly' ? 30 : type === 'yearly' ? 365 : 0
        return new Promise(async (resolve, reject) => {
            const data = await db.get().collection('orderManagement').aggregate([
                {
                    $match: {
                        orderdate: { $gte: new Date(new Date() - numberOfDays * 60 * 60 * 24 * 1000) },
                    },
                },
            ]).toArray()
            console.log(new Date(new Date() - numberOfDays * 60 * 60 * 24 * 1000))
            console.log(data);

            resolve(data)

        })
    },

    getDataOfDaily: async () => {
        console.log('helpers')
        const orderdate = 'orderdate'
        const dayOfYear = (date) =>
            Math.floor(
                (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
            )
        return new Promise(async (resolve, reject) => {
            const data = await db.get().collection('orderManagement').aggregate([
                {
                    $match: {
                        orderdate: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
                    },
                },


                { $group: { _id: { $dayOfYear: '$orderdate' }, count: { $sum: 1 } } },
            ]).toArray()

            const thisday = dayOfYear(new Date())
            let salesOfLastWeekData = []
            for (let i = 0; i < 8; i++) {
                let count = data.find((d) => d._id === thisday + i - 7)

                if (count) {
                    salesOfLastWeekData.push(count.count)
                } else {
                    salesOfLastWeekData.push(0)
                }
            }
            // console.log(salesOfLastWeekData);

            resolve(salesOfLastWeekData)

        })
    },




    fetchProducts: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find().limit(9).sort({ date: -1 }).toArray().then((res) => {
                console.log(res)
                resolve(res)
            })
        })
    },

    deleteProduct: (productId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').deleteOne({ _id: ObjectID(productId) }).then(() => {
                console.log('Document deleted')
            })
        })
    },

    findProducts: (productId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').findOne({ _id: ObjectID(productId) }).then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    findProductforEdit: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find({ _id: ObjectID(id) }).toArray().then((res) => {
                resolve(res)
            })
        })
    },

    updateProduct: (product) => {
        const { _id } = product
        const { name, quantity, category, description, price } = product
        db.get().collection('productmanagement').updateOne({ _id: ObjectID(_id) }, { $set: { name: name, quantity: quantity, category: category, description: description, price: price } }).then((done) => {
            console.log('done')
        })
    },

    findForCatagory: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find().toArray().then((res) => {
                resolve(res)
            })
        })

    },

    findRelated: (productId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').findOne({ _id: ObjectID(productId) }).then((res) => {
                db.get().collection('productmanagement').find({ maincategory: res.maincategory }).limit(3).toArray().then((response) => {
                    resolve(response)
                })
            })
        })
    },

    getSortData: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find().limit(6).toArray().then((res) => {
                resolve(res)
            })
        })
    },

    findwhisky: (name) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find({ subcategory: name }).toArray().then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    findCategories: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('categoryManagement').find().toArray().then((res) => {
                resolve(res)
            })
        })
    },

    getSubcategoryDetails: (category) => {
        return new Promise((resolve, reject) => {
            db.get().collection('categoryManagement').findOne({ Categoryname: category }).then((res) => {
                console.log('data find')
                resolve(res)
            })
        })
    },

    setdata: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').findOne({ _id: ObjectID(id) }).then((res) => {
                if (res) {
                    db.get().collection('cart').insertOne(res).then((response) => {
                        console.log('data added to cart')
                    })
                }
            })
        })
    },

    getexactproduct: (productId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').findOne({ _id: ObjectID(productId) }).then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    addNewProducts: (product) => {
        const user = product.userid
        const productId = product.productId
        const subtotal = parseInt(product.subtotal)
        const price = parseInt(product.price)
        const regularprice = parseInt(product.regularprice)
        const quantity = parseInt(product.quantity)
        const { name, size, subcategory, maincategory, description, productQuantity, image } = product
        const data = { name, quantity, size, subcategory, maincategory, regularprice, price, description, subtotal, productQuantity, productId, image }
        var exportValue = data.price
        db.get().collection('cart').findOne({ userid: user }).then((res) => {
            if (res) {
                const checkid = "products.productId"
                db.get().collection('cart').findOne({ userid: user, [checkid]: productId }).then((result) => {
                    if (result) {
                        const dbdata = "products.$.productQuantity"
                        const dbprice = "products.$.subtotal"
                        db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: 1 } }).then((res) => {
                            db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: data.price } }).then((res) => {
                            })
                        })
                    }
                    else {
                        db.get().collection('cart').updateOne({ userid: user }, { $push: { products: data } }).then((res) => {
                        })
                    }
                })
            } else {
                db.get().collection('cart').insertOne({ userid: user, products: [data] })
            }
        })
    },

    getWeeklySales: () => {
        return new Promise(async (resolve, reject) => {
            const dayOfYear = (date) =>
                Math.floor(
                    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
                )
            const salesOfLastWeek = await db.get().collection('orderManagement').aggregate([
                {
                    $match: {
                        orderStatus: 'Delivered',
                        orderdate: {
                            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $dayOfYear: '$orderdate' },
                        count: { $sum: '$total' },
                    },
                },
            ]).toArray()
            const thisday = dayOfYear(new Date())
            let salesOfLastWeekData = []
            for (let i = 0; i < 8; i++) {
                let count = salesOfLastWeek.find((d) => d._id === thisday + i - 7)

                if (count) {
                    salesOfLastWeekData.push(count.count)
                } else {
                    salesOfLastWeekData.push(0)
                }
            }
            console.log(salesOfLastWeekData)
            resolve(salesOfLastWeekData)


        })



    },

    fetchCart: (userid) => {
        return new Promise((resolve, reject) => {
            db.get().collection('cart').findOne({ userid: userid }).then((res) => {
                resolve(res)
            })
        })
    },

    getallcategories: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('categoryManagement').find().toArray().then((res) => {
                console.log('ithaanu sathanam')
                console.log(res)
                resolve(res)
            })
        })
    },

    // here is the work

    blockUser: (id) => {
        console.log('this is helpers')
        console.log(id)
        db.get().collection('usermanagement').findOne({ _id: ObjectID(id) }).then((res) => {
            console.log('data finded')
            console.log(res)
        })
    },

    cancelProduct: (data) => {
        console.log(data.UserId)
        console.log(data.id)
        console.log(data.productId)
        return new Promise((resolve, reject) => {
            const change = 'canceled'
            const statusName = "products.$.status"
            const arrayname = "products.product"
            db.get().collection('orderManagement').updateOne({ _id: ObjectID(data.id), [arrayname]: data.productId }, { $set: { [statusName]: change } }).then((res) => {
                console.log('set aaayiii')
                console.log(res)
                resolve(true)
            })
        })

    },

    getDataToDashbord: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').count({ payment: "COD" }).then((res) => {
                const COD = res
                db.get().collection('orderManagement').count({ payment: "paypal" }).then((res) => {
                    const paypal = res
                    db.get().collection('orderManagement').count({ payment: "razorpay" }).then((res) => {
                        const razorpay = res
                        const data = { COD, paypal, razorpay }
                        resolve(data)
                    })
                })
            })
        })
    },


    fetchWishList: (userid) => {
        return new Promise((resolve, reject) => {
            db.get().collection('wishListManager').findOne({ userid: userid }).then((res) => {
                resolve(res)
                console.log('user product found')
            })
        })

    },

    deleteItem: (details) => {
        const userid = details.Userid
        const productId = details.itemid
        return new Promise((resolve, reject) => {
            db.get().collection('cart').update({ userid: userid }, { $pull: { products: { productId: productId } } }, false, true).then((res) => {
            })
        })

    },

    category: (data) => {
        const category = data.Category.toUpperCase()
        db.get().collection('categoryManagement').insertOne({ Categoryname: category ,Subcategory:[]}).then((response) => {
        })
    },

    getCategory: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('categoryManagement').find().toArray().then((res) => {
                resolve(res)
            })
        })

    },

    getSubcategory: (data) => {
        return new Promise((resolve, reject) => {
            const newData = data.subcategory.toUpperCase()
            db.get().collection('categoryManagement').updateOne({ Categoryname: data.Category }, { $push: { Subcategory: { $each: [newData] } } }).then((res) => {
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    checkUser: (data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ email: data.email }).then((res) => {
                if (res) {
                    if (res.password == data.password && res.ActiveStatus == '') {
                        console.log('User')
                        responseWithToken = { ...res, token: generateToken(res._id) }
                        resolve(responseWithToken)
                    } else {
                        console.log('Password not match')
                    }
                } else {
                    resolve('user not found')
                }
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    deletecatagory: (id) => {
        db.get().collection('categoryManagement').deleteOne({ _id: ObjectID(id) }).then(() => {
        })
    },

    AddQuantity: (details) => {
        const dbdata = "products.$.productQuantity"
        const productId = details.productId
        const user = details.UserId
        const productPrice = details.productPrice
        const dbprice = "products.$.subtotal"
        db.get().collection('cart').findOne({ userid: user }).then((res) => {
            if (res.products[0].productQuantity < res.products[0].quantity) {
                db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: 1 } }).then((res) => {
                    db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: productPrice } })
                })
            } else {
            }
        })

    },

    dltprd: (details) => {
        const dbdata = "products.$.productQuantity"
        const dbprice = "products.$.subtotal"
        const productId = details.productId
        const user = details.userId
        console.log('came hereee...')
        const productPrice = details.productPrice
        db.get().collection('cart').findOne({ userid: user }).then((res) => {
            if (res.products[0].productQuantity > 1) {
                db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: -1 } })
                db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: -productPrice } })

            } else {
                console.log('cant minise')
            }
        })
        //  db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: -1 } })
        // db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: -productPrice } })
    },

    userBillingAddress: (address) => {
        const userId = address.userid
        const id = uuidv4()
        const { firstname, lastname, companyname, addressline1, addressline2, cityname, statename, postcode, phone } = address
        const data = { firstname, lastname, companyname, addressline1, addressline2, cityname, statename, postcode, phone, id }
        db.get().collection('billingAddressManagement').findOne({ userid: userId }).then((response) => {
            if (response) {
                db.get().collection('billingAddressManagement').updateOne({ userid: userId }, { $push: { address: data } }).then((res) => {
                })
            } else {
                db.get().collection('billingAddressManagement').insertOne({ userid: userId, address: [data] }).then((result) => {
                })
            }
        })
    },

    getallfromcart: async (details) => {
        const total = details.total
        const userId = details.userId
        const addressId = details.addressId
        const payment = details.payment
        let nameOfP = "products.productId"
        let nameOfJ = "products.productQuantity"

        let orderStatus = 'placed'
        console.log('innu')
        let productQuantityData = await db.get().collection('cart').aggregate([
            { $match: { userid: userId } },
            { $project: { [nameOfJ]: 1 } }
        ]).toArray()
        const productQuantity = productQuantityData[0].products
        // let arr = []
        let array = []
        const temp = []
        for (i = 0; i < productQuantity.length; i++) {
            temp[i] = productQuantity[i].productQuantity
            console.log('temp', temp)
        }
        let data = await db.get().collection('cart').aggregate([{ $match: { userid: userId } }, { $project: { [nameOfP]: 1 } }]).toArray()
        const products = data[0].products
        for (i = 0; i < products.length; i++) {
            array[i] = { product: products[i].productId, status: null, productQuantity: temp[i] }
            db.get().collection('productmanagement').updateOne({ _id: ObjectID(products[i].productId) }, { $inc: { quantity: -temp[i] } })
            console.log('angane athum setaaayiiii...')
        }

        // console.log(arr)
        // console.log(productQuantityData[0])
        console.log('theeeernnu...')
        // let data = await db.get().collection('cart').aggregate([
        //     { $match: { userid: userId } },
        //     { $project: { [nameOfP]: 1 } }
        // ]).toArray()
        // const products = data[0].productsx
        // let array = []
        // for (i = 0; i < products.length; i++) {
        //     array[i] = { product: products[i].productId, status: null }
        // }
        return new Promise((resolve, reject) => {
            console.log('here oooooo')
            // orderdate: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            db.get().collection('orderManagement').insertOne({ userid: userId, orderStatus: orderStatus, addressid: addressId, payment: payment, total: total, products: array, orderdate: new Date() }).then((response) => {
                db.get().collection('cart').deleteOne({ userid: userId }).then((result) => {
                    console.log('mongokkulilum')
                    resolve(true)
                })
            })
        })
    },

    getorders: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find().toArray().then((res) => {
                resolve(res)
            })
        })
    },

    getaddress: (details) => {
        const unwindAddress = "$address"
        const insideAddress = "address.id"
        const userId = details.id
        const addressId = details.addressId
        return new Promise(async (resolve, reject) => {
            let data = await db.get().collection('billingAddressManagement').aggregate([{ $match: { userid: userId } }, { $unwind: unwindAddress }, { $match: { [insideAddress]: addressId } }]).toArray()
            resolve(data[0].address)
        })


    },

    getall: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ _id: ObjectID(id) }).toArray().then((res) => {
                resolve(res)
            })
        })
    },

    gettheproduct: (productId) => {
        return new Promise((resolve, reject) => {
            let pdtId = productId.map((i) => ObjectID(i.product))
            db.get().collection('productmanagement').find({ _id: { $in: pdtId } }).toArray().then((res) => {
                resolve(res)
            })
        })
    },

    forhistory: (userId) => {
        const arr = []
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ userid: userId }).toArray().then((res) => {
                const orderStatus = res[0].orderStatus
                console.log('helpers..')
                console.log(res)
                // for(i=0;i<res.length;i++){
                //     const userId = res[i].userid
                //     console.log(res[i].addressid
                //     db.get().collection('billingAddressManagement').find({userid:userId}).then((response)=>{
                //         console.log('data came')
                //     })
                // }

                resolve(res)
                // let productId = res[0].products.map((i) => ObjectID(i.product))
                // db.get().collection('productmanagement').find({ _id: { $in: productId } }).toArray().then((result) => {
                //     const data = { orderStatus, result }
                //     resolve(data)
                // })
            })
        })
    },

    picImage: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').findOne({ _id: ObjectID(id) }).then((res) => {
                let productId = res.products.map((i) => ObjectID(i.product))
                db.get().collection('productmanagement').find({ _id: { $in: productId } }).toArray().then((result) => {
                    resolve(result)
                })
            })
        })
    },

    findAddress: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ userid: id }).toArray().then((res) => {
                resolve(res.addressid)
                console.log('address aaanee')
                for (i = 0; i < res.length; i++) {
                    console.log(res[i].addressid)
                    console.log('data ')
                    console.log(res[i].addressid)
                }

                // db.get().collection('billingAddressManagement').find({ userid: id, addressid: res.addressid }).toArray().then((result) => {
                //     resolve(result[0].address)
                // })
            })
        })
    },



    addcoupon: (data) => {
        return new Promise((resolve, reject) => {
            var { discount, maxpurchaseamount, maxdiscountamount } = data
            var discount = parseInt(discount)
            var maxpurchaseamount = parseInt(maxpurchaseamount)
            var maxdiscountamount = parseInt(maxdiscountamount)
            var { couponcode, couponExpiredate } = data
            const value = { maxdiscountamount, maxpurchaseamount, discount, couponcode, couponExpiredate }
            db.get().collection('couponManagement').insertOne(value).then((res) => {
            })
        })
    },

    getcoupon: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('couponManagement').find().toArray().then((response) => {
                resolve(response)
            })
        })
    },

    dltcoupon: (id) => {
        db.get().collection('couponManagement').deleteOne({ _id: ObjectID(id) })
    },

    getalloffers: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('couponManagement').find().toArray().then((response) => {
                resolve(response)
            })
        })
    },

    coupenentered: (data) => {
        return new Promise((resolve, reject) => {
            const name = data.name
            const userId = data.userId
            console.log("================================")
            db.get().collection('couponManagement').findOne({ couponcode: name }).then((res) => {
                console.log(res)
                if (res == null) {
                    console.log("Invalid coupon")
                    const msg = 'Invalid coupon'
                    resolve(msg)
                } else {
                    const maxdiscountamount = res.maxdiscountamount
                    db.get().collection('usermanagement').findOne({ _id: ObjectID(userId) }).then((response) => {
                        if (response.coupons) {
                            db.get().collection('usermanagement').findOne({ _id: ObjectID(userId), coupons: name }).then((res) => {
                                if (res) {
                                    console.log('coupon already exists')
                                    const msg = 'Coupen already used'
                                    resolve(msg)
                                } else {
                                    db.get().collection('usermanagement').updateOne({ _id: ObjectID(userId) }, { $push: { coupons: name } }).then((result) => {
                                        console.log("coupen applied")
                                        const msg = maxdiscountamount
                                        resolve(msg)
                                    })
                                }
                            })
                        } else {
                            db.get().collection('usermanagement').updateOne({ _id: ObjectID(userId) }, { $set: { coupons: [name] } }).then((result) => {
                                const msg = maxdiscountamount
                                resolve(msg)
                            })
                        }
                    })
                }
            })



        })
    },

    checkNumber: (number) => {
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ phone: number }).then((res) => {
                if (res) {
                    console.log('ivide response und number kitty')
                    resolve(res)
                } else {
                    resolve('')
                }
            })
        })
    },

    findUserInfo: (number) => {
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ phone: number }).then((res) => {
                if (res) {
                    responseWithToken = { ...res, token: generateToken(res._id) }
                    resolve(responseWithToken)
                }
            })
        })
    },


    addOffer: (data) => {
        return new Promise((resolve, reject) => {
            const offerAmount = parseInt(data.maxdiscountamount)
            const category = data.maincategory
            const discount = parseInt(data.discount)
            const expiredate = data.Expiredate
            let temp = null
            let priceData = null
            db.get().collection('productmanagement').find({ maincategory: category }).toArray().then((res) => {
                res.map((item, k) => {
                    temp = (item.price / 100) * discount;
                    if (temp < offerAmount) {
                        db.get().collection('productmanagement').updateMany({ maincategory: category, price: item.price }, { $set: { offer: temp, offerdiscount: discount, offerexpiredate: expiredate } }).then((res) => {
                        })
                    } else {
                        priceData = item.price - offerAmount
                        db.get().collection('productmanagement').updateMany({ maincategory: category, price: item.price }, { $set: { offer: priceData, offerdiscount: discount, offerexpiredate: expiredate } }).then((res) => {
                        })
                    }
                })
            })

            db.get().collection('offermanagement').insertOne({ maincategory: category, status: 'active', offer: offerAmount, offerdiscount: discount, offerexpiredate: expiredate }).then((result) => {
            })
        })
    },

    addUserImage: (details) => {
        return new Promise((resolve, reject) => {
            const email = details.email
            const url = details.urlArray
            db.get().collection('usermanagement').updateOne({ email: email }, { $set: { image: url } }).then((res) => {
                resolve(true)
            })
        })
    },

    toWishList: (data) => {
        return new Promise((resolve, reject) => {
            const productId = data.id
            const userId = data.Userid
            db.get().collection('productmanagement').find({ _id: ObjectID(productId) }).toArray().then((res) => {
                const image = res[0].images[0].image1
                const { name, quantity, size, subcategory, maincategory, price, description, date, stock } = res[0]
                const data = { name, quantity, size, subcategory, maincategory, price, description, date, stock, productId, image }
                db.get().collection('wishListManager').findOne({ userid: userId }).then((res) => {
                    if (res) {
                        const checkid = "products.productId"
                        db.get().collection('wishListManager').findOne({ userid: userId, [checkid]: productId }).then((result) => {
                            if (result) {
                                resolve(false)
                            }
                            else {
                                db.get().collection('wishListManager').updateOne({ userid: userId }, { $push: { products: data } }).then((res) => {
                                    resolve(true)
                                })
                            }
                        })
                    } else {
                        db.get().collection('wishListManager').insertOne({ userid: userId, products: [data] })
                        resolve(true)
                    }
                })
            })
        })
    },


    editProductDetails: (details) => {
        const image1 = details.image1
        const image2 = details.image2
        const image3 = details.image3
        const image4 = details.image4
        const images = { image1, image2, image3, image4 }
        const name = details.data.name
        const quantity = details.data.quantity
        const size = details.data.size
        const subcategory = details.data.subcategory
        const maincategory = details.data.main
        const stock = details.data.stock
        const productId = details.data.productId
        const price = details.data.price
        const description = details.data.description
        db.get().collection('productmanagement').updateOne({ _id: ObjectID(productId) }, { $set: { name: name, quantity: quantity, stock: stock, size: size, subcategory: subcategory, maincategory: maincategory, price: price, description: description, images: [images], date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') } }).then((res) => {
        })
    },

    fetchUserImage: (email) => {
        return new Promise((resolve, reject) => {
            const UserEmail = toString(email)
            db.get().collection('usermanagement').findOne({ email: email.email }).then((res) => {
                resolve(res)
            })
        })
    },

    addStatus: (status) => {
        const id = status.id
        const value = status.value
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').updateOne({ _id: ObjectID(id) }, { $set: { orderStatus: value, date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') } }).then((res) => {
            })
        })
    },

    getAllAddress: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('billingAddressManagement').find({ userid: userId }).toArray().then((res) => {
                resolve(res[0].address)
            })
        })
    },

    deleteAddress: (details) => {
        const userId = details.userId
        const id = details.id
        db.get().collection('billingAddressManagement').updateOne({ userid: userId }, { $pull: { address: { id: id } } }, false, true).then((response) => {
        })
    },


    checkPassword: (details) => {
        const email = details.email
        const password = details.userPassword
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ email: email, password: password.password }).then((response) => {
                if (response == null) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    },

    changePassword: (data) => {
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').updateMany({ email: data.email }, { $set: { password: data.data } }).then((res) => {
                resolve(true)
            })
        })
    },

    getCategoryOffers: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('offermanagement').find().toArray().then((response) => {
                resolve(response)
            })
        })
    },

    dltOffers: (data) => {
        const id = data.id
        const category = data.category
        db.get().collection('offermanagement').deleteOne({ _id: ObjectID(id) }).then((response) => {
            db.get().collection('productmanagement').updateMany({ maincategory: category }, { $unset: { offer: 1, offerdiscount: 1, offerexpiredate: 1 } }, false, true).then((result) => {
            })
        })
    },

    felterPrice: (data) => {
        const minValue = parseInt(data.minValue)
        const maxValue = parseInt(data.maxValue)
        const subcategory = data.subcategory
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find({ subcategory: subcategory, price: { $gte: minValue, $lte: maxValue } }).toArray().then((result) => {
                resolve(result)
            })
        })

    },

    EditUserDetails: (data) => {
        const UserName = data.userName
        const username = data.Uname
        const lastname = data.lstName
        const email = data.Umail
        const phone = data.Uphone
        const userId = data.UserId
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').updateOne({ firstname: UserName }, { $set: { firstname: username, lastname: lastname, email: email, phone: phone } }).then((res) => {
                if (res) {
                    db.get().collection('usermanagement').findOne({ _id: ObjectID(userId) }).then((response) => {
                        resolve(response)
                    })
                }
            })
        })
    },

    GetUserDetailsFromProfile: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection('billingAddressManagement').find({ userid: id }).toArray().then((res) => {
                resolve(res)
            })
        })
    },

    GetSalesReport: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ orderStatus: 'Delivered' }).toArray().then((res) => {
                resolve(res)
            })
        })
    }

}