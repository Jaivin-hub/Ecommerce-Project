const cloudinary = require('cloudinary')
const assert = require('assert').strict
const dotenv = require('dotenv');
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET
dotenv.config()


// config
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
})


exports.upload = async (req, res) => {
  console.log('upload function')
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto', // jpeg, png
  })
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  })
}

exports.remove = (req, res) => {
  let image_id = req.body.public_id

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err })
    res.json({ message: 'image removed' })
  })
}