const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require("mongoose");
const myRoutes = express.Router();

const port = process.env.PORT || 5000;

const app = express()

let colorSchema = require('./models/about.ts')

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/hero-data', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => {console.log("Connected to DB")})
    .catch((err:any) => {console.log(err)})

const myColors = require('./routes/about.ts');

myRoutes.get('/getColors', (req:any, res:any) => {
    colorSchema.find()
    .then((data:any) => res.json(data))
    .catch((error:any) => res.json(error))
});

app.use('/colors', myColors);

app.listen(port, function(){
    console.log("Port running at " + port);
});