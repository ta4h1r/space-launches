import { getSavedLaunches } from "~/server/utils/dao";

export default defineEventHandler(async () => {
  const launches = await getSavedLaunches();
  return { launches };
});
