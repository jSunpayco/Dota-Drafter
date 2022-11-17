// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const mongoose = require("mongoose");
// const myRoutes = express.Router();
// const dbo = require('./dbConn');

// const port = process.env.PORT || 5000;

// const app = express()

// let heroStatusSchema = require('./models/hero_status.ts')

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/hero-data', {useNewUrlParser:true, useUnifiedTopology: true})
//     .then(() => {console.log("Connected to DB")})
//     .catch((err:any) => {console.log(err)})

// const myHeroes = require('./routes/hero_status.ts');

// myRoutes.get('/getHeroStatus', (req:any, res:any) => {
//     heroStatusSchema.find()
//     .then((data:any) => console.log(data))
//     .catch((error:any) => console.log(error))
// });

// app.use('/heroStatus', myHeroes);

// app.listen(port, function(){
//     console.log("Port running at " + port);
// });

const { MongoClient } = require("mongodb");
const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000;

const dbo = require('./dbConn');

const connectionString = "***REMOVED***";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express()
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(require('./routes/hero_status.ts'));

app.use(function (err:any, _req:any, res:any) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  dbo.connectToServer(function (err:any) {
    if (err) {
      console.error(err);
      process.exit();
    }
  
    // start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });

// https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial