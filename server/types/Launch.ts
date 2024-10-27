interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

interface Patch {
  small: string;
  large: string;
}

interface RedditLinks {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

interface FlickrLinks {
  small: string[];
  original: string[];
}

interface Links {
  patch: Patch;
  reddit: RedditLinks;
  flickr: FlickrLinks;
  presskit: string | null;
  webcast: string;
  youtube_id: string;
  article: string;
  wikipedia: string;
}

interface Failure {
  time: number;
  altitude: number | null;
  reason: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

interface Launch {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  net: boolean;
  window: number;
  rocket: string;
  success: boolean;
  failures: Failure[];
  details: string;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}
