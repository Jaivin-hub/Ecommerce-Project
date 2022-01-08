var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config()
var userhelpers = require('../helpers/userhelpers');
var ObjectID = require('mongodb').ObjectID
var { cloudinary } = require('../Utils/cloudinary')
var FileReader = require('filereader')
var { upload, remove } = require('../Utils/cloudinary')
var serviceSID = process.env.serviceSID
var accountSID = process.env.REACT_APP_accountSID
var authToken = process.env.REACT_APP_authToken
var RAZORPAY_SECRET = process.env.RAZORPAY_SECRET
var RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
var Client = require('twilio')(accountSID, authToken)
const Razorpay = require("razorpay");


router.post('/', function (req, res, next) {
  const username = req.body.firstname
  const password = req.body.password
  userhelpers.addUser(req.body).then((respose) => {
    res.json(respose)
  })
});


router.post("/orders", async (req, res) => {

  try {
    const instance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,

      key_secret: RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.total + '00', // amount in smallest currency unit
      currency: "INR",
      receipt: Date.now(),
    };
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/getUser', (req, res, next) => {
  userhelpers.fetchUser().then((response) => {
    res.json(response)
  })
})

router.post('/success', (req, res) => {
  userhelpers.getallfromcart(req.body).then((response) => {
    res.json({ msg: response })
  })
})

router.get('/fetchreport/:type', (req, res) => {
  userhelpers.fetchReport(req.params.type).then((response) => {
    res.json(response)
  })
})

router.post('/blockUser', (req, res) => {
  console.log(req.body.id)
  userhelpers.blockUser(req.body.id).then((response) => {
  })
})

router.get('/getDataofDaily', (req, res) => {
  userhelpers.getDataOfDaily().then((response) => {
    res.json(response)
  })
})

router.get('/getWeeklySailes', (req, res) => {
  userhelpers.getWeeklySales().then((response) => {
    res.json(response)
  })
})

router.get('/getDataToDashbord', (req, res) => {
  userhelpers.getDataToDashbord().then((response) => {
    res.json(response)
  })
})

router.post('/cancelproduct', (req, res) => {
  userhelpers.cancelProduct(req.body).then((response) => {
    res.json({ msg: true })
  })
})

router.post('/towishlist', (req, res) => {
  userhelpers.toWishList(req.body).then((response) => {
    if (response == false) {
      res.json({ msg: false })
    } else {
      res.json({ msg: true })
    }
  })
})

router.get('/getWishlist/:id', (req, res) => {
  const id = req.params.id
  userhelpers.fetchWishList(id).then((response) => {
    const grantTotal = response.products.reduce((total, doc) => (total + doc.subtotal), 0)
    const data = { response, grantTotal }
    res.json(data)

  })
})

router.post('/addproducts', (req, res, next) => {
  userhelpers.addProducts(req.body).then((response) => {
  })
})

router.get('/getproducts', (req, res) => {
  userhelpers.fetchProducts().then((response) => {
    res.json(response)
  })
})

router.post('/deleteproduct', (req, res) => {
  const id = req.query.id
  userhelpers.deleteProduct(id).then((response) => {
  })
})

router.post('/editproducts', (req, res) => {
  const { id } = req.body
  userhelpers.findProducts(id).then((response) => {
    res.json(response)
  })
})

router.get('/findProduct/:id', (req, res) => {
  const productId = req.params.id
  userhelpers.findProductforEdit(productId).then((response) => {
    res.json(response)
  })
})

router.post('/updateproducts', (req, res) => {
  userhelpers.updateProduct(req.body)
})

router.get('/getdetails', (req, res) => {
  userhelpers.fetchProducts().then((response) => {
    res.json(response)
  })
})

router.get('/getProductsCategory', (req, res) => {
  userhelpers.findForCatagory().then((response) => {
    res.json(response)
  })
})

router.get('/getrelated/:productId', (req, res) => {
  const productId = req.params.productId
  userhelpers.findRelated(productId).then((response) => {
    res.json(response)
  })
})

router.get('/getSortData', (req, res) => {
  userhelpers.getSortData().then((response) => {
    res.json(response)
  })
})

router.get('/getwhisky/:name', (req, res) => {
  const name = req.params.name
  userhelpers.findwhisky(name).then((response) => {
    res.json(response)
  })
})

router.get('/getcouponoffers', (req, res) => {
  userhelpers.getalloffers().then((response) => {
    res.json(response)
  })
})

router.get('/getAllCategories', (req, res) => {
  userhelpers.getallcategories().then((response) => {
    res.json(response)
  })
})

router.post('/checkadmin', (req, res) => {
  const Admin = 'jaivin'
  const AdminPass = '1234'
  const userName = req.body.userName
  const password = req.body.password
  if (Admin == userName && AdminPass == password) {
    res.json({ msg: 'admin' })
  } else {
    res.json({ msg: false })
  }


})

router.get('/findCategories', (req, res) => {
  userhelpers.findCategories().then((response) => {
    res.json(response)
  })
})

router.post('/getexactproduct/:id', (req, res) => {
  const id = req.params.id
  userhelpers.getexactproduct(id).then((response) => {
    res.json(response)
  })
})

router.get('/gettheproduct/:id', (req, res) => {
  const id = req.params.id

  userhelpers.getexactproduct(id).then((response) => {
    const { name, quantity, category, maincategory, description, price } = response
    // const subtotal = response.price
    // const product = { name, quantity, category, maincategory, description, price,subtotal }

    // userhelpers.addNewProducts(product)
  })
})

router.post('/setdata', (req, res) => {
  userhelpers.setdata(req.body.id).then((response) => {
  })
})


router.post('/senttheproduct', (req, res) => {
  const productId = req.body.id
  const userid = req.body.Userid
  const productQuantity = 1
  userhelpers.getexactproduct(productId).then((response) => {
    const image = response.images[0].image1
    const { name, quantity, size, subcategory, maincategory, regularprice, price, description } = response
    const subtotal = response.price
    const product = { name, quantity, size, subcategory, maincategory, regularprice, price, description, subtotal, productQuantity, userid, productId, image }
    userhelpers.addNewProducts(product)
  })
})

router.get('/getcart/:id', (req, res) => {
  const id = req.params.id
  userhelpers.fetchCart(id).then((response) => {
    const grantTotal = response.products.reduce((total, doc) => (total + doc.subtotal), 0)
    const data = { response, grantTotal }
    res.json(data)
  })
})

router.post('/deleteitem', (req, res) => {
  userhelpers.deleteItem(req.body)
})

router.post('/addcatagory', (req, res) => {
  userhelpers.category(req.body)
})

router.get('/getcatagory', (req, res) => {
  userhelpers.getCategory().then((response) => {
    res.json(response)
  })
})


router.post('/addsubcatagory', (req, res) => {
  userhelpers.getSubcategory(req.body).then((response) => {
  })
})

router.get('/getsubcategorydetails/:data', (req, res) => {
  userhelpers.getSubcategoryDetails(req.params.data).then((response) => {
    res.json(response)
  })
})

router.get('/getcategorybackend', (req, res) => {
  userhelpers.getCategory().then((response) => {
    res.json(response)
  })
})

router.post('/checkusers', (req, res) => {
  const data = req.body
  userhelpers.checkUser(data).then((response) => {
    res.json(response);
  })
})

router.get('/getallcategory', (req, res) => {
  userhelpers.getCategory().then((response) => {
    res.json(response)
  })
})

router.post('/deletecatagory/:id', (req, res) => {
  const id = req.params.id
  userhelpers.deletecatagory(id)
})

router.post('/updatequantity', (req, res) => {
  const productPrice = req.body.productPrice
  const productId = req.body.productId
  const UserId = req.body.userId
  const details = { productId, UserId, productPrice }
  userhelpers.AddQuantity(details)
})

router.post('/dltprd', (req, res) => {
  const productPrice = req.body.productPrice
  const productId = req.body.productId
  const userId = req.body.userId
  const details = { productId, userId, productPrice }
  userhelpers.dltprd(details)
})

router.post('/userdetails', (req, res) => {
  userhelpers.userBillingAddress(req.body)
})

router.post('/orderplaced', (req, res) => {
  userhelpers.getallfromcart(req.body).then((response) => {
    res.json({ msg: response })
  })

})

router.get('/getorders', (req, res) => {
  userhelpers.getorders().then((response) => {
    res.json(response)
  })
})

router.post('/getaddress', (req, res) => {
  userhelpers.getaddress(req.body).then((response) => {
    res.json(response)
  })
})

router.get('/getall/:id', (req, res) => {
  userhelpers.getall(req.params.id).then((response) => {
    res.json(response)
  })
})

router.post('/getallproduct', (req, res) => {
  userhelpers.gettheproduct(req.body).then((response) => {
    res.json(response)
  })
})

router.get('/forhistory/:id', (req, res) => {
  userhelpers.forhistory(req.params.id).then((result) => {
    res.json(result)
  })
})

router.get('/findAddress/:id', (req, res) => {
  userhelpers.findAddress(req.params.id).then((result) => {
    res.json(result)
  })
})

router.post('/addcoupon', (req, res) => {
  userhelpers.addcoupon(req.body).then((result) => {

  })
})

router.get('/getcoupon', (req, res) => {
  userhelpers.getcoupon(req.body).then((result) => {
    res.json(result)
  })
})

router.get('/dltcoupon/:id', (req, res) => {
  userhelpers.dltcoupon(req.params.id).then((response) => {
  })
})

router.get('/getalloffers', (req, res) => {
  userhelpers.getalloffers(req.params.id).then((response) => {
    res.json(response)
  })
})

router.post('/coupenentered', (req, res) => {
  let totalAmount = req.body.totalAmount
  userhelpers.coupenentered(req.body).then((response) => {
    if (response == 'Coupen already used') {
      res.json(response)
    } else if (response == 'Invalid coupon') {
      res.json(response)
    } else {
      const result = totalAmount - response
      res.json(result)
    }
    // if (response) {

    // }
    //  else {
    //   res.json('Invalid coupon')
    // }

  })

})

router.get('/picImage/:id', (req, res) => {
  userhelpers.picImage(req.params.id).then((response) => {
    res.json(response)
  })

})


router.post('/getotp', (req, res) => {
  let number = req.body.otp

  userhelpers.checkNumber(number).then((response) => {

    if (response) {
      Client.verify
        .services(serviceSID)
        .verifications.create({
          to: `+91${number}`,
          channel: 'sms'
        }).then((verification) => {
          res.json({ msg: "Otp sended to number" })
        }).catch((err) => {
          console.log('twilio error:', err);
        })
    } else {
      res.json({ msg: "User not found" })
    }

  })
})

router.post('/otpadded', (req, res) => {
  const number = req.body.otpvalue.otp
  const Otp = req.body.dataOtp.otpdata
  Client.verify
    .services(serviceSID)
    .verificationChecks.create({
      to: `+91${number}`,
      code: `${Otp}`
    }).then((response) => {
      if (response) {
        userhelpers.findUserInfo(number).then((result) => {
          res.json(result)
        })
      } else {
        res.json({ msg: "error" })
      }

    })
})

router.post('/addphoto', async (req, res) => {

  const fileStr = req.body.data
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'ml_default'
  }).then((response) => {
    res.json({ msg: 'yayayayay' })
  }).catch((err) => {
    console.error({ err: 'somethng went wrong' })
  })

})

router.post('/addProfile', (req, res) => {

})

router.route('/uploads').post(upload)
//.delete(remove)
router.post('/addUserImage', (req, res) => {
  userhelpers.addUserImage(req.body).then((response) => {
    res.json(true)

  })
})

router.post('/editProductdetails', (req, res) => {
  userhelpers.editProductDetails(req.body).then((response) => {
  })
})

router.post('/fetchUserImage', (req, res) => {
  userhelpers.fetchUserImage(req.body).then((response) => {
    res.json(response)
  })
})

router.post('/setStatus', (req, res) => {
  userhelpers.addStatus(req.body).then((response) => {
  })
})

router.get('/getAllAddress/:id', (req, res) => {
  const id = req.params.id
  userhelpers.getAllAddress(id).then((response) => {
    res.json(response)
  })
})

router.post('/addoffer', (req, res) => {
  userhelpers.addOffer(req.body).then((res) => {
  })
})

router.post('/deleteAddress', (req, res) => {
  userhelpers.deleteAddress(req.body)
})

router.post('/checkpassword', (req, res) => {
  userhelpers.checkPassword(req.body).then((response) => {
    res.json({ res: response })
  })
})

router.get('/getcategoryoffers', (req, res) => {
  userhelpers.getCategoryOffers(req.body).then((response) => {
    res.json(response)
  })
})

router.post('/changePassword', (req, res) => {
  userhelpers.changePassword(req.body).then((response) => {
    res.json({ res: response })
  })
})

router.post('/dltoffer', (req, res) => {
  userhelpers.dltOffers(req.body)
})

router.post('/filterprice', (req, res) => {
  userhelpers.felterPrice(req.body).then((response) => {
    res.json(response)
  })
})

router.post('/EditUserDetails', (req, res) => {
  userhelpers.EditUserDetails(req.body).then((response) => {
    res.json(response)
  })
})

router.get('/getUserDetailsfromProfile/:id', (req, res) => {
  userhelpers.GetUserDetailsFromProfile(req.params.id).then((response) => {
    res.json(response)
  })
})


router.get('/getSalesReport', (req, res) => {
  userhelpers.GetSalesReport().then((response) => {
    res.json(response)
  })
})

module.exports = router;

