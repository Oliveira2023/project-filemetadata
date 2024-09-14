var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const fileUpload = require('express-fileupload');

const storage = multer.memoryStorage();
const upload = multer({ dest: 'fileanalyse/' }, { storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload());

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.post('/api/fileanalyse', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }
  console.log(req.files.upfile);
  
  res.json({name: req.files.upfile.name, type: req.files.upfile.mimetype, size: req.files.upfile.size})
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
