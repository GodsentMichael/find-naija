"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var stateSchema = new mongoose_1.Schema({
    state: { type: String, required: true },
    capital: { type: String },
    slogan: { type: String },
    senatorial_districts: { type: [String] },
    lgas: { type: [String], },
    landmass: { type: String, },
    population: { type: String, },
    dialect: { type: String, },
    map: { type: String, },
    latitude: { type: String, },
    longitude: { type: String, },
    website: { type: String, },
    geo_politcal_zone: { type: String, },
    created_date: { type: String, },
    created_by: { type: String, },
    past_governors: { type: [String], },
    borders: { type: [String], },
    known_for: { type: [String], },
});
var State = mongoose_1.default.model('State', stateSchema);
exports.default = State;
