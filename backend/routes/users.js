var express = require('express');
var router = express.Router();
var userhelpers = require('../helpers/userhelpers');
var ObjectID = require('mongodb').ObjectID
var {cloudinary} = require('../Utils/cloudinary')
var FileReader = require('filereader')
var {upload,remove} = require('../Utils/cloudinary')
var serviceSID = 'VA1285b0f4040f6828cc8ed6bf8c28124d'
var accountSID = 'ACa5634a266ec8f11b8bdc468fca20c5fb'
var authToken = '15aadfefa5318c45a52a3bc970bdd69b'
var Client = require('twilio')(accountSID, authToken)
/* GET home page. */

router.post('/', function (req, res, next) {
  const username = req.body.firstname
  const password = req.body.password
  userhelpers.addUser(req.body).then((respose) => {
    console.log('it is the response');
    // console.log(respose)
    res.json(respose)
  })
});

router.get('/getUser', (req, res, next) => {
  userhelpers.fetchUser().then((response) => {
    console.log('fetched success')
    res.json(response)
  })
})

router.post('/addproducts', (req, res, next)=> {
  console.log('it came here')
 console.log(req.body)
 userhelpers.addProducts(req.body).then((response)=> {
   console.log('helpers returned')
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
  userhelpers.findForCatagory().then((response) => {
    res.json(response)
  })
})

router.get('/getrelated/:productId',(req, res)=>{
  const productId = req.params.productId
  console.log('ivideyum ethyyy')
  userhelpers.findRelated(productId).then((response) => {
    console.log('related helpers responding')
    res.json(response)
  })
})

router.get('/getSortData',(req, res)=>{
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

router.post('/setdata', (req, res)=>{
  console.log('routers')
  console.log(req.body.id)
  userhelpers.setdata(req.body.id).then((response)=>{
    console.log('response from helpers')
  })
})


router.post('/senttheproduct', (req, res) => {
  const productId = req.body.id
  const userid = req.body.Userid
  const productQuantity = 1
  userhelpers.getexactproduct(productId).then((response) => {
    console.log('res----ponse')
    const image =  response.images[0].image1
     const { name, quantity, size, subcategory, maincategory,regularprice,price, description} = response
     const subtotal = response.price
     const product = { name, quantity, size, subcategory, maincategory,regularprice,price, description,subtotal,productQuantity,userid,productId,image}
     userhelpers.addNewProducts(product)
  })
})

router.get('/getcart/:id', (req, res) => {
  const id = req.params.id
  console.log('id printed')
  console.log(id)
  userhelpers.fetchCart(id).then((response) => {
    const grantTotal = response.products.reduce((total, doc) => (total + doc.subtotal), 0)
    console.log('yaa its that', grantTotal)
    const data = { response, grantTotal }
    res.json(data)

  })
})

router.post('/deleteitem', (req, res) => {
  console.log(req.body)
  console.log('this is '+req.params.id)
  userhelpers.deleteItem(req.body)
})

router.post('/addImg', (req, res, next) => {
  console.log('yaaa')
  console.log(req.files)
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

router.get('/getsubcategorydetails/:data', (req, res)=>{
  userhelpers.getSubcategoryDetails(req.params.data).then((response)=>{
    console.log('response from helpers..')
    console.log(response)
    res.json(response)
  })
})

router.get('/getcategorybackend', (req, res) => {
  console.log('from userside')
  userhelpers.getCategory().then((response) => {
    res.json(response)
  })
})

router.post('/checkusers', (req, res) => {
  console.log('inside hbuhbhubuh')
  const data = req.body
  userhelpers.checkUser(data).then((response) => {
    console.log('kkk');
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
  console.log('ppppp')
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
  const total = req.body.total
  const addressId = req.body.addressId
  const userId = req.body.userId
  const data = { total, userId ,addressId }
  userhelpers.getallfromcart(data)
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
    console.log('find')
    console.log(response)
    res.json(response)
  })
})

router.get('/forhistory/:id', (req, res) => {
  console.log('reached')
  console.log(req.params.id)
  console.log('ooooooo')
  userhelpers.forhistory(req.params.id).then((result) => {
    console.log('haavoo' + result + 'end')
    res.json(result)
  })
})

router.get('/findAddress/:id', (req, res)=>{
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
  userhelpers.coupenentered(req.body.name).then((response) => {
    console.log(response)
    if (response) {
      const result = totalAmount - response
      console.log(result)
      res.json(result)
    } else {
      res.json('Invalid coupon')
    }

  })

})


router.post('/getotp', (req, res) => {
  let number = req.body.otp
console.log('first router')
  console.log(number)
  // userhelpers.checkNumber(number).then((response) => {
    console.log('number find')
    // if (response) {


      // client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
      // .verifications
      // .create({to: '+15017122661', channel: 'sms'})
      // .then(verification => console.log(verification.status));



      console.log('response find')
      Client.verify
      .services(serviceSID)
      .verifications.create({
        to: `+91${number}`,
        channel: 'sms'
        }).then((verification) => {
          console.log('send otp')
          console.log(verification.status)
          // console.log('then activated')
          // res.json({msg:"Otp sended to number"})
        }).catch((err) => {
          console.log(err);
        })
    // }else{
      // console.log('else case')
      // res.json({msg:"User not found"})
    // }

  // })
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
      if(response){
        userhelpers.findUserInfo(number).then((result) => {
          res.json(result)
        })
      }else{
        res.json({msg:"error"})
      }
     
    })
})

router.post('/addphoto', async(req, res)=>{
  
    const fileStr = req.body.data
    console.log(req.data)
    console.log('fdj')
  const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
    upload_preset:'ml_default'
  }).then((response) => {
    console.log(uploadedResponse)
  res.json({msg:'yayayayay'})
  console.log("thisnjj")
  }).catch((err)=>{
    console.error({err:'somethng went wrong'})
  })
  
})

router.post('/addProfile',(req, res) => {

})

router.route('/uploads').post(upload)
//.delete(remove)

router.post('/addUserImage',(req, res) => {
  console.log('Inside router')
  console.log(req.body)
  console.log(req.body.email)
  userhelpers.addUserImage(req.body).then((response) => {
    console.log('returning from helpers')
    console.log(response)
    res.json(true)
    
  })
})

router.post('/fetchUserImage', (req, res) => {
  console.log('inside fetchUserImage')
  userhelpers.fetchUserImage(req.body).then((response)=>{
    console.log('Image returned')
    console.log(response)
    res.json(response)
  })
})

router.post('/setStatus', (req, res)=>{
  console.log('it is ')
  userhelpers.addStatus(req.body).then((response)=>{
    console.log('response from helpers')
  })
})

router.get('/getAllAddress/:id', (req, res)=>{
  const userId = req.params.id
  userhelpers.getAllAddress(userId).then((response)=>{
    console.log('helpers returns')
    res.json(response)
  })
})

router.post('/addoffer',(req, res)=>{
  userhelpers.addOffer(req.body).then((res)=>{
    console.log('response camed')
  })
})

router.post('/deleteAddress', (req, res)=>{
  console.log(req.body)
  userhelpers.deleteAddress(req.body)
})

router.post('/checkpassword',(req, res)=>{
  userhelpers.checkPassword(req.body).then((response)=>{
    console.log('returning helpers')
    res.json(response)
  })
})

router.get('/getcategoryoffers',(req, res)=>{
  userhelpers.getCategoryOffers(req.body).then((response)=>{
    res.json(response)
  })
})

router.post('/dltoffer',(req, res)=>{
console.log('oooyaaa')
  userhelpers.dltOffers(req.body)
})

router.post('/filterprice',(req, res)=>{
  console.log('routers..')
  userhelpers.felterPrice(req.body).then((response)=>{
    console.log('data returned from helpers..')
    res.json(response)
  })
})

module.exports = router;

