// models/Crime.ts

import mongoose, { Schema} from 'mongoose';



const CrimeSchema= new Schema({
  ID: Number,
  CaseNumber: String,
  Date: String,
  Block: String,
  IUCR: Number,
  PrimaryType: String,
  Description: String,
  LocationDescription: String,
  Arrest: Boolean,
  Domestic: Boolean,
  Beat: Number,
  District: Number,
  Ward: Number,
  CommunityArea: Number,
  FBIcode: String,
  XCoordinate: Number,
  YCoordinate: Number,
  Latitude: Number,
  Longitude: Number,
  Location: String
});



const CrimeModel = mongoose.models.Crime || mongoose.model('Crime', CrimeSchema);

export default CrimeModel;
