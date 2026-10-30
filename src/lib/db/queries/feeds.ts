import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createFeed(name: string, url: string, userId: string) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, userId: userId })
    .returning();

  return result;
}

export async function getFeedsWithUsernames() {
  const allFeeds = await db
    .select({
      feedname: feeds.name,
      url: feeds.url,
      username: users.name,
    })
    .from(feeds)
    .innerJoin(users, eq(feeds.userId, users.id));

  return allFeeds;
}
