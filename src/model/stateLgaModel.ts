import mongoose, { Schema, Document } from 'mongoose';

export interface StateDocument extends Document {
  state: string;
  capital: string;
  slogan: string;
  senatorial_districts: string[];
  lgas: string[];
  landmass: string;
  population: string;
  dialect: string;
  map: string;
  latitude: string;
  longitude: string;
  website: string;
  geo_politcal_zone: string;
  created_date: string;
  created_by: string;
  past_governors: string[];
  borders: string[];
  known_for: string[];
}

const stateSchema = new Schema<StateDocument>({
  state: { type: String, required: true },
  capital: { type: String },
  slogan: { type: String },
  senatorial_districts: { type: [String] },
  lgas: { type: [String] },
  landmass: { type: String },
  population: { type: String },
  dialect: { type: String },
  map: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  website: { type: String },
  geo_politcal_zone: { type: String },
  created_date: { type: String },
  created_by: { type: String },
  past_governors: { type: [String] },
  borders: { type: [String] },
  known_for: { type: [String] },
});

const State = mongoose.model<StateDocument>('State', stateSchema);

export default State;
