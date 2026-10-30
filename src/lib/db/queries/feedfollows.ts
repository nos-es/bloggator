import { eq } from "drizzle-orm";
import { db } from "..";
import { feedfollows, feeds, users } from "../schema";

export async function createFeedFollow(feedId: string, userId: string) {
  const [newFeedFollow] = await db
    .insert(feedfollows)
    .values({ feedId: feedId, userId: userId });

  const detailedFeedFollower = db
    .select({
      feedfollow_id: feedfollows.id,
      feedfollow_createdAt: feedfollows.createdAt,
      feedfollow_updatedAt: feedfollows.updatedAt,
      username: users.name,
      feedname: feeds.name,
    })
    .from(feedfollows)
    .innerJoin(users, eq(feedfollows.userId, users.id))
    .innerJoin(feeds, eq(feedfollows.feedId, feeds.id));

  return detailedFeedFollower;
}
