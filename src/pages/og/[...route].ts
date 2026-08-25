import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPathsResult } from 'astro';

const entries = await getCollection('posts');

const pages = Object.fromEntries(
  entries.map(({ slug, data }) => [slug, data])
);

const ogRoute: { getStaticPaths: (...args: any[]) => GetStaticPathsResult | Promise<GetStaticPathsResult>; GET: APIRoute } = OGImageRoute({
  param: 'route',
  pages: pages,
  getImageOptions: (path: string, page: (typeof entries)[number]['data']) => ({
    title: page.title,
    description: (page.description || '生命不息，折腾不止。') + '\n\n' + `gr114.com/posts/${path}`,
    bgGradient: [[245, 244, 237]],
    border: { color: [245, 244, 237], width: 20 },
    padding: 80,
    logo: {
      path: './src/assets/avatar.jpg',
      size: [80],
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif-sc@latest/chinese-simplified-700-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif-sc@latest/chinese-simplified-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.ttf'
    ],
    font: {
      title: {
        color: [20, 20, 20],
        families: ['Noto Serif SC ExtraLight', 'JetBrains Mono'],
        weight: 'Bold',
      },
      description: {
        color: [80, 80, 80],
        families: ['Noto Serif SC ExtraLight', 'JetBrains Mono'],
      },
    },
  }),
});

export const getStaticPaths: (...args: any[]) => GetStaticPathsResult | Promise<GetStaticPathsResult> = ogRoute.getStaticPaths;
export const GET: APIRoute = ogRoute.GET;
