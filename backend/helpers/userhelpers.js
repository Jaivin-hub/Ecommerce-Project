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
            db.get().collection('productmanagement').insertOne(products).then((res) => {
                console.log(res.insertedId)
                console.log('product added');
                resolve(res.insertedId)
            })
        })
    },

    fetchProducts: () => {
        return new Promise((resolve, reject) => {
            db.get().collection('productmanagement').find().toArray().then((res) => {
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

    findwhisky: (name) => {
        return new Promise((resolve, reject) => {
            console.log('last')
            console.log(name)
            db.get().collection('productmanagement').find({ maincategory: name }).toArray().then((res) => {
                resolve(res)
                console.log(res)
                console.log('kkkkk')
            }).catch((err) => {
                console.log(err)
            })
        })
    },

    getexactproduct: (productId) => {
        console.log('is this....')
        console.log(productId)
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

    addNewProducts: (product) => {
        console.log('inside')
        const user = product.userid
        const productId = product.productId
        console.log(productId)
        const { name, productQuantity, category, maincategory, description, price, subtotal } = product
        const data = { name, productQuantity, category, maincategory, description, price, productId, subtotal }
        var exportValue = data.price
        db.get().collection('cart').findOne({ userid: user }).then((res) => {
            console.log('response');
            console.log(res)
            if (res) {
                console.log('userfound');
                const checkid = "products.productId"
                db.get().collection('cart').findOne({ userid: user, [checkid]: productId }).then((result) => {
                    console.log(productId)
                    console.log('kdfjjl')
                    console.log(result)
                    if (result) {
                        const dbdata = "products.$.productQuantity"
                        const dbprice = "products.$.subtotal"
                        console.log('productid found');
                        db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbdata]: 1 } }).then((res) => {
                            console.log('quantity added')
                            db.get().collection('cart').updateOne({ userid: user, products: { $elemMatch: { productId: productId } } }, { $inc: { [dbprice]: data.price } }).then((res) => {
                                console.log('price added')
                            })
                        })
                    }
                    else {
                        console.log('else case')
                        db.get().collection('cart').updateOne({ userid: user }, { $push: { products: data } }).then((res) => {
                            console.log('data added')
                        })
                    }
                })
            } else {
                console.log('userNotFound')
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
        console.log('lllllll')
        console.log(details)
        console.log('tttttt')
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
        db.get().collection('orderManagement').insertOne({ userid: userId, status: status,addressid:addressId, total: total, products: array }).then((response) => {
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

    getaddress: (userId) => {
        return new Promise((resolve, reject) => {
            db.get().collection('billingAddressManagement').find({ userid: userId }).toArray().then((res) => {
                resolve(res)
            })
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
                console.log(res[0].products)
                let productId = res[0].products.map((i) => ObjectID(i))
                db.get().collection('productmanagement').find({ _id: { $in: productId } }).toArray().then((result) => {
                    resolve(result)
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
    }

}