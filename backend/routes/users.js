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
console.log('accountSID',accountSID,'authToken',authToken)
var Client = require('twilio')(accountSID, authToken)
const Razorpay = require("razorpay");

console.log('accountSID',accountSID,'authToken',authToken,'serviceSID',serviceSID)

router.post('/', function (req, res, next) {
  const username = req.body.firstname
  const password = req.body.password
  userhelpers.addUser(req.body).then((respose) => {
    res.json(respose)
  })
});


router.post("/orders", async (req, res) => {
  console.log(req.body)

  console.log('hereeeeeeeeeeee')
  console.log('process.env', RAZORPAY_KEY_ID)
  try {
    const instance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,

      key_secret: RAZORPAY_SECRET,
    });
    console.log('instance', instance);
    const options = {
      amount: req.body.total + '00', // amount in smallest currency unit
      currency: "INR",
      receipt: Date.now(),
    };
    console.log('options', options);
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/getUser', (req, res, next) => {
  userhelpers.fetchUser().then((response) => {
    console.log('fetched success')
    res.json(response)
  })
})

router.post('/success', (req, res) => {
  console.log('success router///')
  userhelpers.getallfromcart(req.body).then((response) => {
    console.log('payment success')
    res.json({ msg: response })
  })
  console.log(req.body)
})

router.get('/fetchreport/:type', (req, res) => {
  userhelpers.fetchReport(req.params.type).then((response) => {
    console.log('data ')
    res.json(response)
  })
})

router.post('/blockUser', (req, res) => {
  console.log('router')
  console.log(req.body.id)
  userhelpers.blockUser(req.body.id).then((response) => {
    console.log('retuning from helpers...')
  })
})

router.get('/getDataofDaily', (req, res) => {
  userhelpers.getDataOfDaily().then((response) => {
    // console.log('returning')
    res.json(response)
  })
})

router.get('/getWeeklySailes', (req, res) => {
  console.log('ivide ethyyy')
  userhelpers.getWeeklySales().then((response) => {
    console.log('returning kjsdkjksj')
    res.json(response)
  })
})

router.get('/getDataToDashbord', (req, res) => {
  userhelpers.getDataToDashbord().then((response) => {
    res.json(response)
  })
})

router.post('/cancelproduct', (req, res) => {
  console.log('ithuvare')
  userhelpers.cancelProduct(req.body).then((response) => {
    console.log('helpers all set')
    res.json({ msg: true })
  })
})

router.post('/towishlist', (req, res) => {
  userhelpers.toWishList(req.body).then((response) => {
    console.log('helpers returning')
    console.log(response)
    if (response == false) {
      res.json({ msg: false })
    } else {
      res.json({ msg: true })
    }
  })
})

router.get('/getWishlist/:id', (req, res) => {
  const id = req.params.id
  console.log('id printed')
  console.log(id)
  userhelpers.fetchWishList(id).then((response) => {
    const grantTotal = response.products.reduce((total, doc) => (total + doc.subtotal), 0)
    console.log('yaa its that', grantTotal)
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
  console.log('it is ')
  console.log(id)
  userhelpers.deleteProduct(id).then((response) => {
    console.log('success')
  })
})

router.post('/editproducts', (req, res) => {
  const { id } = req.body
  console.log('this is router')
  console.log(id)
  userhelpers.findProducts(id).then((response) => {
    console.log('it is returning')
    console.log(response)
    res.json(response)
  })
})

router.get('/findProduct/:id', (req, res) => {
  console.log('yyayyayayayayay')
  const productId = req.params.id
  console.log(productId)
  userhelpers.findProductforEdit(productId).then((response) => {
    console.log('returning from helperes')
    res.json(response)
  })
})

router.post('/updateproducts', (req, res) => {
  console.log('ooohhhhh')
  console.log(req.body)
  userhelpers.updateProduct(req.body)
})

router.get('/getdetails', (req, res) => {
  userhelpers.fetchProducts().then((response) => {
    res.json(response)
  })
})

router.get('/getProductsCategory', (req, res) => {
  console.log('good part')
  userhelpers.findForCatagory().then((response) => {
    res.json(response)
  })
})

router.get('/getrelated/:productId', (req, res) => {
  const productId = req.params.productId
  console.log('ivideyum ethyyy')
  userhelpers.findRelated(productId).then((response) => {
    console.log('related helpers responding')
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
  console.log('hereeeeee================================================================')
  userhelpers.getalloffers().then((response) => {
    res.json(response)
  })
})

router.get('/getAllCategories', (req, res) => {
  console.log('routeril ethyyy.....')
  userhelpers.getallcategories().then((response) => {
    console.log('HELPERS RETURNING')
    res.json(response)
  })
})

router.post('/checkadmin', (req, res) => {
  console.log('ividaaayiii')
  console.log(req.body)
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
    console.log(response)
    res.json(response)
  })
})

router.get('/gettheproduct/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  userhelpers.getexactproduct(id).then((response) => {
    const { name, quantity, category, maincategory, description, price } = response
    console.log('response prie ' + response.price)
    // const subtotal = response.price
    // const product = { name, quantity, category, maincategory, description, price,subtotal }

    // userhelpers.addNewProducts(product)
  })
})

router.post('/setdata', (req, res) => {
  console.log('routers')
  console.log(req.body.id)
  userhelpers.setdata(req.body.id).then((response) => {
    console.log('response from helpers')
  })
})


router.post('/senttheproduct', (req, res) => {
  const productId = req.body.id
  const userid = req.body.Userid
  const productQuantity = 1
  userhelpers.getexactproduct(productId).then((response) => {
    console.log('res----ponse')
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
  console.log(req.body)
  console.log('this is ' + req.params.id)
  userhelpers.deleteItem(req.body)
})

router.post('/addcatagory', (req, res) => {
  console.log('yaayyaa')
  userhelpers.category(req.body)
})

router.get('/getcatagory', (req, res) => {
  console.log('here')
  userhelpers.getCategory().then((response) => {
    res.json(response)
  })
})


router.post('/addsubcatagory', (req, res) => {
  console.log('subcategory')
  console.log(req.body)
  userhelpers.getSubcategory(req.body).then((response) => {
    console.log('kkkkkkk')
  })
})

router.get('/getsubcategorydetails/:data', (req, res) => {
  userhelpers.getSubcategoryDetails(req.params.data).then((response) => {
    console.log('response from helpers..')
    console.log(response)
    res.json(response)
  })
})

router.get('/getcategorybackend', (req, res) => {
  console.log('ividaaaayiiii...')
  userhelpers.getCategory().then((response) => {
    res.json(response)
  })
})

router.post('/checkusers', (req, res) => {
  console.log('router..')
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
  console.log('came')
  console.log(req.body)
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
    console.log('data fetched')
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
    console.log(response)
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
  console.log('router')
  console.log(req.params.id)
  userhelpers.dltcoupon(req.params.id).then((response) => {
    console.log('deleted')
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
    console.log('response...from helpers')
    console.log(response)
    if (response == 'Coupen already used') {
      console.log('a;ja;kjd')
      res.json(response)
    } else if (response == 'Invalid coupon') {
      console.log(78373737)
      res.json(response)
    } else {
      const result = totalAmount - response
      console.log(result)
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
  console.log('first router')
  console.log(number)
  
  userhelpers.checkNumber(number).then((response) => {
    console.log('number find')
    console.log(response)

    if (response) {


      // client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      // .verifications
      // .create({to: '+15017122661', channel: 'sms'})
      // .then(verification => console.log(verification.status));



      console.log('response find')
      console.log('serviceSID',serviceSID)
      console.log('number',number)
      Client.verify
        .services(serviceSID)
        .verifications.create({
          to: `+91${number}`,
          channel: 'sms'
        }).then((verification) => {
          console.log('send otp')
          console.log(verification.status)
          console.log('then activated')
          res.json({ msg: "Otp sended to number" })
        }).catch((err) => {
          console.log(err);
        })
    } else {
      console.log('else case')
      res.json({ msg: "User not found" })
    }

  })
})

router.post('/otpadded', (req, res) => {
  console.log('camee with otp')
  console.log(req.body.otpvalue.otp)
  console.log(req.body.dataOtp.otpdata)
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
  console.log(req.data)
  console.log('fdj')
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'ml_default'
  }).then((response) => {
    console.log(uploadedResponse)
    res.json({ msg: 'yayayayay' })
    console.log("thisnjj")
  }).catch((err) => {
    console.error({ err: 'somethng went wrong' })
  })

})

router.post('/addProfile', (req, res) => {

})

router.route('/uploads').post(upload)
//.delete(remove)
console.log('ividdddd')
router.post('/addUserImage', (req, res) => {
  console.log('Inside router')
  console.log(req.body)
  console.log(req.body.email)
  userhelpers.addUserImage(req.body).then((response) => {
    console.log('returning from helpers')
    console.log(response)
    res.json(true)

  })
})

router.post('/editProductdetails', (req, res) => {
  userhelpers.editProductDetails(req.body).then((response) => {
    console.log('helpers returning')
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
  console.log('orupaaaddd...')
  const id = req.params.id
  console.log(99)
  console.log(id)
  userhelpers.getAllAddress(id).then((response) => {
    console.log('helpers returns')
    res.json(response)
  })
})

router.post('/addoffer', (req, res) => {
  userhelpers.addOffer(req.body).then((res) => {
    console.log('response camed')
  })
})

router.post('/deleteAddress', (req, res) => {
  console.log(req.body)
  userhelpers.deleteAddress(req.body)
})

router.post('/checkpassword', (req, res) => {
  userhelpers.checkPassword(req.body).then((response) => {
    console.log('returning helpers')
    console.log(response)
    res.json({ res: response })
  })
})

router.get('/getcategoryoffers', (req, res) => {
  userhelpers.getCategoryOffers(req.body).then((response) => {
    res.json(response)
  })
})

router.post('/changePassword', (req, res) => {
  console.log('ithrayum kk')
  userhelpers.changePassword(req.body).then((response) => {
    console.log('returning from helpers')
    res.json({ res: response })
  })
})

router.post('/dltoffer', (req, res) => {
  console.log('oooyaaa')
  userhelpers.dltOffers(req.body)
})

router.post('/filterprice', (req, res) => {
  console.log('routers..')
  userhelpers.felterPrice(req.body).then((response) => {
    console.log('data returned from helpers..')
    res.json(response)
  })
})

router.post('/EditUserDetails', (req, res) => {
  console.log('came here')
  userhelpers.EditUserDetails(req.body).then((response) => {
    console.log('data returned from helpers')
    res.json(response)
  })
})

router.get('/getUserDetailsfromProfile/:id', (req, res) => {
  userhelpers.GetUserDetailsFromProfile(req.params.id).then((response) => {
    res.json(response)
  })
})


router.get('/getSalesReport', (req, res) => {
  console.log('oooooooiiii')
  userhelpers.GetSalesReport().then((response) => {
    console.log('returning from helpers')
    res.json(response)
  })
})

module.exports = router;

