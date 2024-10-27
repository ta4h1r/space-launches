import { getSavedLaunches } from "~/server/utils/dao";

export default defineEventHandler(async (event) => {
  try {
    return await getSavedLaunches();
  } catch (error) {
    console.error(error);
    setResponseStatus(event, 400);
    return { error };
  }
});
