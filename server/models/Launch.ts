import mongoose, { Schema } from "mongoose";
import { type Launch } from "~/types";

const FairingsSchema = new mongoose.Schema({
  reused: { type: Boolean, default: null },
  recovery_attempt: { type: Boolean, default: null },
  recovered: { type: Boolean, default: null },
  ships: { type: [String], default: [] },
});

const PatchSchema = new mongoose.Schema({
  small: { type: String, default: null },
  large: { type: String, default: null },
});

const RedditLinksSchema = new mongoose.Schema({
  campaign: { type: String, default: null },
  launch: { type: String, default: null },
  media: { type: String, default: null },
  recovery: { type: String, default: null },
});

const FlickrLinksSchema = new mongoose.Schema({
  small: { type: [String], default: [] },
  original: { type: [String], default: [] },
});
const LinksSchema = new mongoose.Schema({
  patch: { type: PatchSchema, default: null },
  reddit: { type: RedditLinksSchema, default: null },
  flickr: { type: FlickrLinksSchema, default: null },
  presskit: { type: String, default: null },
  webcast: { type: String, default: null },
  youtube_id: { type: String, default: null },
  article: { type: String, default: null },
  wikipedia: { type: String, default: null },
});

const FailureSchema = new mongoose.Schema({
  time: { type: Number, required: true },
  altitude: { type: Number, default: null },
  reason: { type: String, required: true },
});

const CoreSchema = new mongoose.Schema({
  core: { type: String, default: null },
  flight: { type: Number, default: null },
  gridfins: { type: Boolean, default: null },
  legs: { type: Boolean, default: null },
  reused: { type: Boolean, default: null },
  landing_attempt: { type: Boolean, default: null },
  landing_success: { type: Boolean, default: null },
  landing_type: { type: String, default: null },
  landpad: { type: String, default: null },
});

const LaunchSchema = new Schema({
  fairings: { type: FairingsSchema, default: null },
  links: { type: LinksSchema, required: true },
  static_fire_date_utc: { type: Date, default: null },
  static_fire_date_unix: { type: Number, default: null },
  net: { type: Boolean, required: true },
  window: { type: Number, default: null },
  rocket: { type: String, required: true },
  success: { type: Boolean, default: null },
  failures: { type: [FailureSchema], default: [] },
  details: { type: String, default: null },
  crew: { type: [String], default: [] },
  ships: { type: [String], default: [] },
  capsules: { type: [String], default: [] },
  payloads: { type: [String], default: [] },
  launchpad: { type: String, required: true },
  flight_number: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  date_utc: { type: Date, required: true },
  date_unix: { type: Number, required: true },
  date_local: { type: String, required: true },
  date_precision: { type: String, required: true },
  upcoming: { type: Boolean, required: true },
  cores: { type: [CoreSchema], default: [] },
  auto_update: { type: Boolean, required: true },
  tbd: { type: Boolean, required: true },
  launch_library_id: { type: String, default: null },
  id: { type: String, required: true, unique: true },
});

export default mongoose.models.Launch ||
  mongoose.model<Launch>("Launch", LaunchSchema);
