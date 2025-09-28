export default async function sitemap() {
  const base = 'https://archonium.com';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];
}