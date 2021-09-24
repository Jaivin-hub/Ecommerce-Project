var express = require('express');
var router = express.Router();
var userhelpers = require('../helpers/userhelpers');

/* GET home page. */

router.post('/', function (req, res, next) {
  console.log('reached function')
  userhelpers.addUser(req.body)
});

router.get('/getUser',(req,res,next) => {
    userhelpers.fetchUser().then((response)=>{
      console.log('fetched success')
      res.json(response)
  })
})


module.exports = router;

