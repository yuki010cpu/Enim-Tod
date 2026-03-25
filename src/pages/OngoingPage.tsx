import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OngoingPage = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await axios.get('YOUR_API_ENDPOINT'); // Replace with your API endpoint
                setAnimeData(response.data);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Ongoing Anime</h1>
            <ul>
                {animeData.map(anime => (
                    <li key={anime.id}>
                        <h2>{anime.title}</h2>
                        <img src={anime.thumbnail} alt={anime.title} />
                        <div>
                            <a href={anime.videoLink} target="_blank" rel="noopener noreferrer">Watch Video</a>
                            <a href={anime.streamingLink} target="_blank" rel="noopener noreferrer">Watch Streaming</a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OngoingPage;