import React, { useEffect, useState } from 'react';

const OngoingPage = () => {
    const [animeData, setAnimeData] = useState([]);

    const fetchAnimeData = async () => {
        try {
            const response = await fetch('https://www.sankavollerei.com/anime/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAnimeData(data);
        } catch (error) {
            console.error('Error fetching anime data:', error);
        }
    };

    useEffect(() => {
        fetchAnimeData();
    }, []);

    return (
        <div>
            <h1>Ongoing Anime</h1>
            <div>
                {animeData.map(anime => (
                    <div key={anime.id}>
                        <h2>{anime.title}</h2>
                        <img src={anime.thumbnail} alt={anime.title} />
                        <div>
                            <a href={anime.videoLink} target="_blank">Watch</a>
                            <a href={anime.streamingLink} target="_blank">Stream</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OngoingPage;