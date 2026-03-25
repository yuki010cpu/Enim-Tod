import React, { useEffect, useState } from 'react';
import jikanService from '../services/jikanService';

const OngoingPage = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await jikanService.getTopAiringAnime();
        setAnimeList(response);
      } catch (error) {
        console.error('Error fetching anime:', error);
      }
    };

    fetchAnime();
  }, []);

  return (
    <div>
      <h1>Ongoing Anime</h1>
      <ul>
        {animeList.map(anime => (
          <li key={anime.mal_id}>{anime.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default OngoingPage;