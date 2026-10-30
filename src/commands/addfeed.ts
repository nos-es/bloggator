import { readConfig } from "src/config";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUserByName } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

export async function addFeedHandler(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (cmdName !== "addfeed" || args.length !== 2) {
    throw Error("Missing add feed arguments");
  }
  const config = readConfig();
  const feedName: string = args[0];
  const url: string = args[1];

  const currentUser: User = await getUserByName(config.currentUserName);

  if (!currentUser) {
    throw Error("Current logged in user does not exist");
  }

  const feed: Feed = await createFeed(feedName, url, currentUser.id);
  if (!feed) {
    throw Error("Feed could not be added");
  }
  printFeed(feed, currentUser);
}

function printFeed(feed: Feed, user: User) {
  console.log("Added:");
  console.log(feed);
  console.log(user);
}
