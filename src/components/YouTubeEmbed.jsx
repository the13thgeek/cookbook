import React from 'react';
import './YouTubeEmbed.scss';

const YouTubeEmbed = ({ url }) => {

  const getVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className='video-player'>
      <iframe src={`https://www.youtube.com/embed/${getVideoId(url)}`} allow='accelerometer; autoplay' allowFullScreen title='YouTube Player'>
      </iframe>
      
    </div>
  )
}

export default YouTubeEmbed