import React, { useState } from "react";
import { Mock } from "../mockdata";
import "./ResharedPost.css";

const ResharedPost = ({ post }: { post: typeof Mock.resharedPost }) => {
  const [showVideo, setShowVideo] = useState(false);
  const hasVideo = post.video && post.video.length > 0;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(true);
  };

  const handleCloseVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideo(false);
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 1000 / 60);
    const seconds = Math.floor((duration / 1000) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="reshared-post">
      <div className="reshared-post-header">
        <div className="reshared-author-info">
          <h4 className="reshared-author-name">{post.company.name}</h4>
          <a 
            href={post.company.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="reshared-company-link"
            onClick={(e) => e.stopPropagation()}
          >
            View company page
          </a>
        </div>
      </div>
      <div className="reshared-post-content">
        <p className="reshared-post-text">{post.text}</p>
        {hasVideo && (
          <>
            <div className="reshared-post-video" onClick={handlePlayClick}>
              <img
                src={post.video[0].poster}
                alt="Video thumbnail"
                className="reshared-video-thumbnail"
              />
              <div className="video-duration">
                {formatDuration(post.video[0].duration)}
              </div>
              <div className="video-play-button">▶</div>
            </div>
            {showVideo && (
              <div className="video-modal" onClick={handleCloseVideo}>
                <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                  <button className="video-modal-close" onClick={handleCloseVideo}>×</button>
                  <video
                    controls
                    autoPlay
                    className="video-player"
                    poster={post.video[0].poster}
                  >
                    <source src={post.video[0].url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResharedPost;
