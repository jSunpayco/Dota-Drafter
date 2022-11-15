import mongoose from "mongoose";
const Schema = mongoose.Schema

const heroes = new Schema({
    cName: String,
    cHex: String
}, {versionKey:false});

module.exports = mongoose.model('heroes', heroes)