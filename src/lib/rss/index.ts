import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./types";

export async function fetchFeed(feedUrl: string) {
  const response = await fetch(feedUrl, {
    method: "GET",
    mode: "cors",
    headers: {
      "User-Agent": "gator",
    },
  });

  if (!response.ok) {
    throw Error("Feed could not be fetched");
  }
  const responseText = await response.text();
  const xmlParser = new XMLParser({ processEntities: false });
  const rssObject = xmlParser.parse(responseText);

  if (!rssObject.rss || !rssObject.rss.channel) {
    throw Error("Channel field does not exist");
  }
  const rssFeed: RSSFeed = rssObject.rss;

  if (
    !rssFeed.channel.title ||
    !rssFeed.channel.link ||
    !rssFeed.channel.description
  ) {
    throw Error("Channel metadata is missing");
  }
  const items = Array.isArray(rssFeed.channel.item)
    ? rssFeed.channel.item
    : [rssFeed.channel.item];

  const rssEntries: RSSItem[] = [];

  for (const item of items) {
    if (!item.title || !item.link || !item.description || !item.pubDate) {
      continue;
    }
    rssEntries.push(item);
  }

  rssFeed.channel.item = items;

  return rssFeed;
}
