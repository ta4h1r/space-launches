import { saveNewLaunch } from "~/server/utils/dao";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await saveNewLaunch(body);
  } catch (error: unknown) {
    setResponseStatus(event, 500);
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        setResponseStatus(event, 409);
      }
      if (error.name === "ValidationError") {
        setResponseStatus(event, 400);
      }
    }
    return { error };
  }
});
