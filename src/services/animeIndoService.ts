/* Provider untuk anime-indo.lol (metadata only)
   Dependensi: axios, cheerio
*/
import axios from 'axios';
import cheerio from 'cheerio';
import type { Anime, AnimeDetails, PaginatedAnime, Episode, StreamData } from '../types';

const BASE = 'https://anime-indo.lol';
const UA = 'Enim-Tod/1.0 (+https://github.com/yuki010cpu/Enim-Tod)';

async function fetchHtml(url: string) {
  const res = await axios.get(url, { headers: { 'User-Agent': UA } });
  return res.data as string;
}

export const searchAnime = async (query: string, page: number = 1): Promise<PaginatedAnime> => {
  const url = `${BASE}/?s=${encodeURIComponent(query)}&paged=${page}`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const results: Anime[] = [];
  $('.post').each((_, el) => {
    const el$ = $(el);
    const a = el$.find('a').first();
    const title = a.attr('title') || a.text().trim();
    const link = a.attr('href') || '';
    const img = el$.find('img').first().attr('src') || '';
    if (link && title) {
      results.push({ id: link, title, url: link, image: img });
    }
  });

  return {
    currentPage: page,
    hasNextPage: results.length > 0,
    results,
  };
};

export const getAnimeDetails = async (idOrUrl: string): Promise<AnimeDetails> => {
  const url = idOrUrl.startsWith('http') ? idOrUrl : `${BASE}/${idOrUrl}`;
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const title = $('h1.entry-title').text().trim() || $('title').text().trim();
  const image = $('.post-thumbnail img').attr('src') || '';
  const description = $('.entry-content p').first().text().trim() || '';
  const episodes: Episode[] = [];

  $('.episode-list a, .eps a, .post .entry-content a').each((i, el) => {
    const e = $(el);
    const epUrl = e.attr('href') || '';
    const epLabel = e.text().trim() || `Episode ${i + 1}`;
    if (epUrl) {
      episodes.push({
        id: epUrl,
        number: i + 1,
        url: epUrl,
        title: epLabel,
      });
    }
  });

  return {
    id: url,
    title,
    image,
    description,
    episodes,
  };
};

export const getEpisodeStream = async (episodeUrl: string): Promise<StreamData> => {
  // Hanya kembalikan URL halaman episode (tidak mem-parsing link video)
  return {
    streamUrl: episodeUrl,
    subtitleUrl: null,
  };
};
