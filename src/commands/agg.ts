import { fetchFeed } from "src/lib/rss";

export async function fetchRSSHandler(cmdName: string): Promise<void> {
  if (cmdName !== "agg") {
    throw Error("Wrong command for this handler.");
  }
  const rssFeed = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(rssFeed);
  console.log(rssFeed.channel.item);
}
