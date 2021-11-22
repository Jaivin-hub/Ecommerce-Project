const cloudinary = require('cloudinary')
const assert = require('assert').strict
const dotenv = require('dotenv');
dotenv.config()


// config
cloudinary.config({
  cloud_name: 'yourown',
  api_key: '111526726122269',
  api_secret: 'DfeZyproNZs5_c429VB-oKdPLBk',
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