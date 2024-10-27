import LaunchModel from "../models/Launch";

export async function saveNewLaunch(body: Launch) {
  await dbconnect();
  const launch = await LaunchModel.create(body);
  return launch;
  // console.log({ launch });
}
