import { saveNewLaunch } from "~/server/utils/dao";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await saveNewLaunch(body.launch);
  } catch (e) {
    setResponseStatus(event, 400);
    return { error: e };
  }
});
