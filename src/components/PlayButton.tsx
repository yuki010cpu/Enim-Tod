 import React from 'react';

type Props = { streamUrl: string | null };

const PlayButton: React.FC<Props> = ({ streamUrl }) => {
  const handlePlay = () => {
    if (!streamUrl) return;
    try {
      const u = new URL(streamUrl);
      if (u.hostname.includes('anime-indo.lol')) {
        window.open(streamUrl, '_blank', 'noopener');
        return;
      }
    } catch (e) {
      window.open(streamUrl, '_blank', 'noopener');
      return;
    }
    // Jika direct video (mp4/m3u8) — integrasikan ke player di aplikasi Anda.
  };

  return <button onClick={handlePlay} className="btn-play">Play</button>;
};

export default PlayButton;
