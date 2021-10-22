const cloudinary = require('cloudinary')

// config
cloudinary.config({
  cloud_name: 'yourown'
  //process.env.CLOUDINARY_NAME
  ,
  api_key: 111526726122269
  //process.env.CLOUDINARY_API_KEY
  ,
  api_secret: 'DfeZyproNZs5_c429VB-oKdPLBk'
  //process.env.CLOUDINARY_SECRET
  ,
})

// req.files.file.path
exports.upload = async (req, res) => {
    //console.log(process.env.CLOUDINARY_API_KEY);
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