import { readConfig } from "src/config";
import { createFeedFollow } from "src/lib/db/queries/feedfollows";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

export async function followHandler(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (cmdName !== "follow" || args.length !== 1) {
    throw Error("Missing follow arguments");
  }
  const config = readConfig();
  const url: string = args[0];

  const currentUser: User = await getUserByName(config.currentUserName);

  if (!currentUser) {
    throw Error("Current logged in user does not exist");
  }

  const feed: Feed = await getFeedByUrl(url);

  if (!feed) {
    throw Error("Feed with this url does not exist");
  }

  const result = await createFeedFollow(feed.id, currentUser.id);

  console.log(result);
}
