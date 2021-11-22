require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Basic Configuration
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

//Creating Schema and Model
const {Schema} = mongoose;
const urlSchema = new Schema({
  longUrl: {type: String, required: true},
  shortUrl: Number
});
const ShortenerUrl = mongoose.model('ShortenerUrl', urlSchema);

//Express Requests
app.get('/api/shorturl/:shorturl', (req, res) => {
  let inputShortUrl = req.params.shorturl;
  ShortenerUrl.findOne({shortUrl: inputShortUrl}, (err, data) => {
    if(!err && data != undefined) {
      res.redirect(data.longUrl)
    } else {
      res.json({error: "No short URL found for the given input"})
    };
  });
});

let resObj = {};
app.post('/api/shorturl', (req, res) => {
  const inputUrl = req.body.url;
  //Check if is a valid URL
  if(!inputUrl.includes("http")) {
    res.json({error: "invalid url"});
    return;
  };

  resObj['original_url'] = inputUrl;
  ShortenerUrl.findOne({longUrl: inputUrl}, (err, longUrlFound) => {
    //Check if the URL isn't already registered
    if(!err && longUrlFound != undefined) {
      resObj['short_url'] = longUrlFound.shortUrl;
      res.json(resObj);
      return;
    //Register the new URL
    } else {
      let newShort = 1;
      ShortenerUrl.findOne({})
              .sort({shortUrl: 'desc'})
              .exec((err, data) => {
                if(!err && data != undefined){
                  newShort = data.shortUrl + 1
                }
                if(!err){
                  ShortenerUrl.findOneAndUpdate(
                    {longUrl: inputUrl},
                    {longUrl: inputUrl, shortUrl: newShort},
                    {new: true, upsert: true},
                    (err, updatedUrl) => {
                      if(!err){
                        resObj['short_url'] = updatedUrl.shortUrl;
                        res.json(resObj);
                      }
                    }
                  )
                }
              });
    };
  });
});