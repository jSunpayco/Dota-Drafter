const {Router} = require('express')
import express from "express";
const router = express.Router();
const anItem = require('../models/about.ts');

router.get('/', (req:any, res:any) => {
    anItem.find()
        .then((items:any) => res.json(items))
});

module.exports = router;