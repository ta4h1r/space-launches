import { removeLaunch } from "~/server/utils/dao";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    return await removeLaunch(Number(query.flight_number));
  } catch (error) {
    console.error(error);
    setResponseStatus(event, 500);
    return { error };
  }
});
