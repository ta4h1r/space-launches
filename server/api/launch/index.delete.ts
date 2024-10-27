import { removeLaunch } from "~/server/utils/dao";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const removed = await removeLaunch(Number(query.flight_number));
  return removed;
});
