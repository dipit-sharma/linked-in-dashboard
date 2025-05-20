import React, { useState } from "react";
import "./PostCard.css";
import { Mock } from "../mockdata";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThumbsUp, 
  faHandSparkles, 
  faHeart, 
  faLightbulb, 
  faStar, 
  faFaceSmile, 
  faQuestion 
} from '@fortawesome/free-solid-svg-icons';
import ResharedPost from './ResharedPost';

const PostCard = ({ post }: { post: typeof Mock }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const profilePicture = post.author.profilePictures[0]?.url || "";
  const hasImages = post.image && post.image.length > 0;
  const { 
    likeCount, 
    appreciationCount, 
    empathyCount, 
    InterestCount, 
    praiseCount, 
    funnyCount, 
    maybeCount 
  } = post.socialActivityCountsInsight;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.carousel-controls, .social-activity')) {
      e.stopPropagation();
      return;
    }
    window.open(post.url, "_blank");
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? post.image.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === post.image.length - 1 ? 0 : prev + 1
    );
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const renderSocialActivity = () => {
    const activities = [
      { icon: faThumbsUp, count: likeCount, label: 'Like' },
      { icon: faHandSparkles, count: appreciationCount, label: 'Appreciation' },
      { icon: faHeart, count: empathyCount, label: 'Empathy' },
      { icon: faLightbulb, count: InterestCount, label: 'Interest' },
      { icon: faStar, count: praiseCount, label: 'Praise' },
      { icon: faFaceSmile, count: funnyCount, label: 'Funny' },
      { icon: faQuestion, count: maybeCount, label: 'Maybe' },
    ].filter(activity => activity.count > 0);

    if (activities.length === 0) return null;

    return (
      <div className="social-activity" onClick={(e) => e.stopPropagation()}>
        {activities.map((activity, index) => (
          <div key={activity.label} className="activity-item" title={activity.label}>
            <FontAwesomeIcon 
              icon={activity.icon} 
              className={`activity-icon ${activity.label.toLowerCase()}`}
            />
            <span className="activity-count">{formatCount(activity.count)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="post-card" onClick={handleCardClick}>
      <div className="post-card-header">
        <img
          src={profilePicture}
          alt={post.author.fullName}
          className="author-avatar"
        />
        <div className="author-info">
          <h3 className="author-name">{post.author.fullName}</h3>
          <p className="author-headline">{post.author.headline}</p>
        </div>
      </div>
      <div className="post-content">
        <p className="post-text">{post.text}</p>
        {post?.resharedPost && (
          <ResharedPost post={post?.resharedPost} />
        )}
        {hasImages && (
          <div className="image-carousel">
            <img
              src={post.image[currentImageIndex].url}
              alt={`Post image ${currentImageIndex + 1}`}
              className="carousel-image"
            />
            {post.image.length > 1 && (
              <div className="carousel-controls">
                <button 
                  className="carousel-button prev"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <span className="carousel-indicator">
                  {currentImageIndex + 1} / {post.image.length}
                </span>
                <button 
                  className="carousel-button next"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        )}
        {renderSocialActivity()}
        <span className="post-time">{post.postedAt}</span>
      </div>
    </div>
  );
};

export default PostCard;
