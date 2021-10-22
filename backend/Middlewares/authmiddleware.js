const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const JWT_SECRET = '1234asd'
var userhelpers = require('../helpers/userhelpers');



const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      //userhelpers.
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not Authorized, Token Failed.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, No Token.')
  }
})

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized as admin')
  }
})

module.exports = {protect, admin }