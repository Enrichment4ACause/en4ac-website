import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);
  return posts.sort((a, b) => {
    const byDate = b.data.date.getTime() - a.data.date.getTime();
    if (byDate !== 0) return byDate;
    return a.data.title.localeCompare(b.data.title);
  });
}

export function formatPostDate(date: Date, month: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function postDateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}
