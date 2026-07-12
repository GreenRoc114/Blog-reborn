import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const entries = await getCollection('posts');

const pages = Object.fromEntries(
  entries.map(({ slug, data }) => [slug, data])
);

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: pages,
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description || '',
    bgGradient: [[30, 30, 30], [20, 20, 20]],
    border: { color: [100, 100, 100], width: 20 },
    padding: 80,
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-700-normal.ttf'
    ],
    font: {
      title: {
        size: 70,
        weight: 'bold',
        families: ['Noto Sans SC'],
      },
      description: {
        size: 40,
        weight: 'normal',
        families: ['Noto Sans SC'],
      },
    }
  }),
});
