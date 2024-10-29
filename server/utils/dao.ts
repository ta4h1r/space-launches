import LaunchModel from "../models/Launch";
import { type Launch } from "~/types";
import dbConnect from "./dbconnect";

export async function saveNewLaunch(body: Launch) {
  await dbconnect();
  const launch = await LaunchModel.create(body);
  return launch;
}

export async function removeLaunch(flightNumber: number) {
  await dbConnect();
  const removed = await LaunchModel.findOneAndDelete({
    flight_number: flightNumber,
  });
  return removed;
}

export async function getSavedLaunches() {
  await dbConnect();
  return await LaunchModel.find();
}
