import mongoose from "mongoose";
const Schema = mongoose.Schema

// const heroes = new Schema({
//     id: String,
//     name: String,
//     localized_name: String,
//     primary_attr: String,
//     attack_type: String,
//     roles: Array,
//     img: String,
//     icon: String,
//     base_health: Number,
//     base_health_regen: Number,
//     base_mana: Number,
//     base_mana_regen: Number,
//     base_armor: Number,
//     base_mr: Number,
//     base_attack_min: Number,
//     base_attack_max: Number,
//     base_str: Number,
//     base_agi: Number,
//     base_int: Number,
//     str_gain: Number,
//     agi_gain: Number,
//     int_gain: Number,
//     attack_range: Number,
//     projectile_speed: Number,
//     attack_rate: Number,
//     move_speed: Number,
//     turn_rate: Number,
//     cm_enabled: Boolean,
//     legs: Number,
//     hero_id: Number,
//     turbo_picks: Number,
//     turbo_wins: Number,
//     pro_ban: Number,
//     pro_win: Number,
//     pro_pick: Number,
// }, {versionKey:false});

const heroes = new Schema({
    localized_name: String,
    hero_id: Number
}, {versionKey:false});

module.exports = mongoose.model('status', heroes)