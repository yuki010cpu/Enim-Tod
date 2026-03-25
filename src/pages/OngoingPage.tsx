// OngoingPage.tsx

import React, { useEffect, useState } from 'react';

const OngoingPage = () => {
    const [anime, setAnime] = useState([]);

    useEffect(() => {
        fetch("https://www.sankavollerei.com/anime/")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAnime(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Anime Ongoing</h1>

            {anime.length === 0 ? (
                <p>Loading...</p>
            ) : (
                anime.map((item, index) => (
                    <div key={index}>
                        <p>{item.title || "No Title"}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OngoingPage;
