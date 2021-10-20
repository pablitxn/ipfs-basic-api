var express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var uploadIPFS = require('./upload-ipfs')
var app = express()

app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const PATH = 'uploads/'

app.post('/file', upload.single('doc'), async function (req, res, next) {
  try {
    console.log(req.file)
    const file = req.file
    if (!file) res.status(400).send({ status: false, data: 'No file selected' })

    const hash = await uploadIPFS(`${PATH}${req.file.filename}`)
    console.log(hash)

    res.send({
      status: true,
      message: 'File uploaded successfully',
      data: {
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    })
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
