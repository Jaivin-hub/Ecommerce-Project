var db = require('../config/connection')
const { v4: uuidv4 } = require('uuid');
var ObjectID = require('mongodb').ObjectID
const generateToken = require('../Utils/generateToken')

module.exports = {

    addUser: (user) => {
        console.log(user)
        return new Promise(async (resolve, reject) => {
            let res = await db.get().collection('usermanagement').insertOne(user)
            let id = "" + res.insertedId
            let response = await db.get().collection('usermanagement').find({ _id: ObjectID(id) }).project({ password: 0 }).toArray()
            console.log("inside helper response");
            // console.log(response[0])
            responseWithToken = { ...response[0], token: generateToken(response[0]._id) }

            resolve(responseWithToken)

        })
        //user = {...user, token: generateToken(user._id)}
    },

    fetchUser: () => {
        console.log('i am going to fetch data');
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
            console.log(products)
            const image1 = products.image1
            const image2 = products.image2
            const image3 = products.image3
            const image4 = products.image4
            const images = { image1, image2, image3, image4 }
            console.log(products.value)
            const name = products.value.name
            const quantity = products.value.quantity
            const size = products.value.size
            const subcategory = products.value.subcategory
            const maincategory = products.value.maincategory
            const regularprice = products.value.regularprice
            const price = products.value.price
            const description = products.value.description




            db.get().collection('productmanagement').insertOne({ name: name, quantity: quantity, size: size, subcategory: subcategory, maincategory: maincategory, regularprice: regularprice, price: price, description: description, images: [images], date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') }).then((res) => {
                console.log(res.insertedId)
                console.log('product added');
                resolve(res.insertedId)
            })
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
        console.log(productId)
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').deleteOne({ _id: ObjectID(productId) }).then(() => {
                console.log('Document deleted')
            })
        })
    },

    findProducts: (productId) => {
        console.log('is this....')
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').findOne({ _id: ObjectID(productId) }).then((res) => {
                console.log('this is the response')
                console.log(res)
                resolve(res)
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    updateProduct: (product) => {
        const { _id } = product
        console.log('iam')
        console.log(_id)
        const { name, quantity, category, description, price } = product
        console.log(name + quantity + category + description)
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
        console.log('here tooo')
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').findOne({ _id: ObjectID(productId) }).then((res) => {
                console.log('returning')
                console.log(res.maincategory)
                db.get().collection('productmanagement').find({ maincategory: res.maincategory }).limit(3).toArray().then((response) => {
                    console.log('category data')
                    console.log(response)
                    resolve(response)
                })
            })
        })
    },

    getSortData: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find().limit(6).toArray().then((res) => {
                console.log('kkkkkkkk')
                resolve(res)
            })
        })
    },

    findwhisky: (name) => {
        return new Promise((resolve, reject) => {
            console.log('last')
            console.log(name)
            db.get().collection('productmanagement').find({ subcategory: name }).toArray().then((res) => {
                resolve(res)
                console.log(res)
                console.log('kkkkk')
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
                console.log('res')
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
        console.log(000000000000000000000)
        console.log(product)
        console.log('inside')
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

    fetchCart: (userid) => {
        return new Promise((resolve, reject) => {
            db.get().collection('cart').findOne({ userid: userid }).then((res) => {
                resolve(res)
                console.log('user product found')
            })
        })

    },

    deleteItem: (details) => {
        console.log('yssss')
        console.log(details)
        const userid = details.Userid
        const productId = details.itemid
        return new Promise((resolve, reject) => {
            // > db.cart.update({_id:ObjectId("6170ce9b019a672d4cf3e7da")},{$pull:{products:{productId:"616f819ea514adc91bee18cd"}}},false,true)

            db.get().collection('cart').update({ userid: userid }, { $pull: { products: { productId: productId } } }, false, true).then((res) => {
                console.log('Document deleted')
                console.log(res)
            })
        })

    },

    category: (data) => {
        console.log(data.Category)
        db.get().collection('categoryManagement').insertOne({ Categoryname: data.Category }).then((response) => {
            console.log(response)
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
            db.get().collection('categoryManagement').updateOne({ Categoryname: data.Category }, { $push: { Subcategory: { $each: [data.subcategory] } } }).then((res) => {
                console.log('subCategory added')
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    checkUser: (data) => {
        console.log('heyyy')
        console.log(data)
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ email: data.email }).then((res) => {
                if (res) {
                    if (res.password == data.password) {
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
            console.log('category deleted')
        })
    },

    AddQuantity: (details) => {
        const dbdata = "products.$.productQuantity"
        const productId = details.productId
        const user = details.UserId
        const productPrice = details.productPrice
        const dbprice = "products.$.subtotal"
        db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: 1 } }).then((res) => {
            db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: productPrice } })
        })
    },

    dltprd: (details) => {
        const dbdata = "products.$.productQuantity"
        const dbprice = "products.$.subtotal"
        const productId = details.productId
        const user = details.userId
        const productPrice = details.productPrice
        db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: -1 } })
        db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: -productPrice } })
    },

    userBillingAddress: (address) => {
        console.log('yaaa')
        const userId = address.userid
        const id = uuidv4()
        console.log("custom id" + id)
        const { firstname, lastname, companyname, addressline1, addressline2, cityname, statename, postcode, phone } = address
        const data = { firstname, lastname, companyname, addressline1, addressline2, cityname, statename, postcode, phone, id }
        db.get().collection('billingAddressManagement').findOne({ userid: userId }).then((response) => {
            if (response) {
                db.get().collection('billingAddressManagement').updateOne({ userid: userId }, { $push: { address: data } }).then((res) => {
                    console.log('Address data  added')
                })
            } else {
                db.get().collection('billingAddressManagement').insertOne({ userid: userId, address: [data] }).then((result) => {
                    console.log('New Address Added')
                })
            }
        })
    },

    getallfromcart: async (details) => {
        const total = details.total
        const userId = details.userId
        const addressId = details.addressId
        console.log('came here')
        let nameOfP = "products.productId"
        let data = await db.get().collection('cart').aggregate([
            { $match: { userid: userId } },
            { $project: { [nameOfP]: 1 } }
        ]).toArray()
        const products = data[0].products
        console.log(products)
        let array = []
        for (i = 0; i < products.length; i++) {
            array[i] = products[i].productId
        }
        const status = ''
        db.get().collection('orderManagement').insertOne({ userid: userId, status: status, addressid: addressId, total: total, products: array }).then((response) => {
            console.log('data added to collection')
        })
    },

    getorders: () => {
        console.log('hooooiii')
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find().toArray().then((res) => {
                console.log('shajanka')
                console.log(res)
                resolve(res)
            })
        })
    },

    getaddress: (details) => {
        console.log()
        const unwindAddress = "$address"
        const insideAddress = "address.id"
        const userId = details.id
        const addressId = details.addressId
        return new Promise(async (resolve, reject) => {
            // db.billingAddressManagement.aggregate({$match:{userid:"617064c5ea31fb7ce74ea000"}},{$unwind:"$address"},{$match:{"address.id":"ab45d8fd-7aef-45cf-a236-96fa4d1e2270"}}).pretty()
            let data = await db.get().collection('billingAddressManagement').aggregate([{ $match: { userid: userId } }, { $unwind: unwindAddress }, { $match: { [insideAddress]: addressId } }]).toArray()
            resolve(data[0].address)
        })


    },

    getall: (userId) => {
        console.log('hooooiii')
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ userid: userId }).toArray().then((res) => {
                console.log(res)
                resolve(res)
            })
        })
    },

    gettheproduct: (productId) => {
        return new Promise((resolve, reject) => {
            let pdtId = productId.map((i) => ObjectID(i))
            db.get().collection('productmanagement').find({ _id: { $in: pdtId } }).toArray().then((res) => {
                resolve(res)
            })
        })
    },

    forhistory: (userId) => {
        console.log('came here')
        console.log(userId)
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ userid: userId }).toArray().then((res) => {
                console.log(res)
                console.log('jjjjj')
                console.log(res[0])
                console.log('pppp')
                console.log(res[0].addressid)
                const address = res[0].addressid
                console.log(res[0].products)
                let productId = res[0].products.map((i) => ObjectID(i))
                db.get().collection('productmanagement').find({ _id: { $in: productId } }).toArray().then((result) => {

                    console.log(result)
                    resolve(result)
                })
            })
        })
    },

    findAddress: (id) => {
        console.log('dont worry...')
        return new Promise((resolve, reject) => {
            db.get().collection('orderManagement').find({ userid: id }).toArray().then((res) => {
                resolve(res.addressid)
                db.get().collection('billingAddressManagement').find({ userid: id, addressid: res.addressid }).toArray().then((result) => {
                    console.log('result')
                    console.log(result[0].address)
                    resolve(result[0].address)
                })
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
        console.log('database')
        console.log(id)
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
            db.get().collection('couponManagement').findOne({ couponcode: data }).then((res) => {
                const maxdiscountamount = res.maxdiscountamount
                resolve(maxdiscountamount)
            })
        })
    },

    checkNumber: (number) => {
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ phone: number }).then((res) => {
                console.log('usernumber')
                if (res) {
                    console.log('usernumber is in database')
                    console.log(res)
                    resolve(res)
                } else {
                    console.log('userNumber not found')
                    resolve('')
                }
            })
        })
    },

    findUserInfo: (number) => {
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ phone: number }).then((res) => {
                console.log('userFound')
                console.log(res)
                if (res) {

                    responseWithToken = { ...res, token: generateToken(res._id) }
                    resolve(responseWithToken)
                }
            })
        })
    },

    addOffer: (data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            const offerAmount = data.maxdiscountamount
            const category = data.maincategory
            const discount = data.discount
            const expiredate = data.Expiredate
            db.get().collection('productmanagement').updateOne({ maincategory: category }, { $set: { offer: offerAmount, offerdiscount: discount, offerexpiredate: expiredate } }).then((res) => {
                db.get().collection('offermanagement').insertOne({ maincategory: category, offer: offerAmount, offerdiscount: discount, offerexpiredate: expiredate }).then((result) => {
                    console.log('success')
                })
            })
        })
    },

    addUserImage: (details) => {
        return new Promise((resolve, reject) => {
            const email = details.email
            const url = details.urlArray
            console.log(url + email)
            db.get().collection('usermanagement').updateOne({ email: email }, { $set: { image: url } }).then((res) => {
                console.log('Inside helpers')
                console.log(res)
                resolve(true)
            })
        })
    },

    fetchUserImage: (email) => {
        return new Promise((resolve, reject) => {
            console.log('inside')
            const UserEmail = toString(email)
            console.log(UserEmail)
            console.log('email from fetchUserImage', email)
            //console.log()
            db.get().collection('usermanagement').findOne({ email: email.email }).then((res) => {
                console.log('image returning user')
                console.log(res)
                resolve(res)
            })
        })
    },

    addStatus: (status) => {
        return new Promise((resolve, reject) => {
            console.log(status)
            db.get().collection('orderManagement').updateOne({})
        })
    },

    getAllAddress: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('billingAddressManagement').find({ userid: userId }).toArray().then((res) => {
                console.log(res[0].address)
                resolve(res[0].address)
            })
        })
    },

    deleteAddress: (details) => {
        const userId = details.userId
        const id = details.id
        db.get().collection('billingAddressManagement').update({ userid: userId }, { $pull: { address: { id: id } } }, false, true).then((response) => {
            console.log('item deleted')
        })
    },

    checkPassword: (details) => {
        const email = details.email
        const password = details.password
        return new Promise((resolve, reject) => {
            db.get().collection('usermanagement').findOne({ email: email, password: password }).then((response) => {
                console.log('data found')
                resolve(response)
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
        console.log('kkk')
        db.get().collection('offermanagement').deleteOne({ _id: ObjectID(id) }).then((response) => {
            console.log('item dlt from offers')
            db.get().collection('productmanagement').updateMany({ maincategory: category }, { $unset: { offer: 1, offerdiscount: 1, offerexpiredate: 1 } }, false, true).then((result) => {
                console.log('item dlt from products')
            })
        })
    },

    felterPrice: (data) => {
        const minValue = parseInt(data.minValue)
        const maxValue = parseInt(data.maxValue)
        const subcategory = data.subcategory
        console.log(subcategory)
        console.log(minValue + maxValue)
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find({ subcategory: subcategory, price: { $gte: minValue, $lte: maxValue}}).toArray().then((result) => {
                console.log(result)
                resolve(result)
            })
        })

    }

}