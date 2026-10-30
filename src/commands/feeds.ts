import { getFeedsWithUsernames } from "src/lib/db/queries/feeds";

export async function feedsHandler(cmdName: string): Promise<void> {
  if (cmdName !== "feeds") {
    throw Error("Wrong command for this handler.");
  }

  const allFeeds = await getFeedsWithUsernames();

  console.log(allFeeds);
}
