const {Router} = require('express')
import express from "express";
const router = express.Router();
// const anItem = require('../models/hero_status.ts');
const dbo = require('../dbConn');

// router.get('/', (req:any, res:any) => {
//     anItem.find()
//         .then((items:any) => res.json(items))
// });

router.route('/heroStatus').get(async function (_req:any, res:any) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection('heroes')
      .find({})
      .limit(50)
      .toArray(function (err:any, result:any) {
        if (err) {
          res.status(400).send('Error fetching listings!');
        } else {
          res.json(result);
        }
      });
  });

module.exports = router;