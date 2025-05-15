import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
  className?: string;
}

// Direct styles for card
const styles = {
  card: {
    backgroundColor: '#BFDDF5', // primary-light
    border: '1px solid #0077D8', // primary-blue
    borderRadius: '0.75rem',
    padding: '1rem',
    cursor: 'pointer'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    color: '#333333' // text-dark
  },
  favoriteButton: {
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    marginTop: '0.5rem',
    color: '#555555', // text-light
    fontSize: '0.875rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis'
  },
  progressContainer: {
    marginTop: '1rem'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.75rem',
    marginBottom: '0.25rem',
    color: '#333333' // text-dark
  },
  progressCount: {
    fontWeight: '600'
  },
  progressBarTrack: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '9999px',
    height: '0.5rem',
    overflow: 'hidden'
  },
  progressBarFill: {
    backgroundColor: '#0077D8', // primary-blue
    height: '100%',
    borderRadius: '9999px',
  }
};

const Card = ({
  title,
  description,
  progress,
  totalLessons,
  isFavorite,
  onToggleFavorite,
  onClick,
  className = '',
}: CardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  const progressPercentage = (progress / totalLessons) * 100;

  return (
    <motion.div
      style={styles.card}
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,119,216,0.15)' }}
      transition={{ duration: 0.2 }}
    >
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <motion.button
          onClick={handleFavoriteClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          style={styles.favoriteButton}
        >
          <Heart
            size={20}
            color={isFavorite ? '#FF8651' : '#A0A0A0'} 
            fill={isFavorite ? '#FF8651' : 'none'}
          />
        </motion.button>
      </div>
      
      <p style={styles.description}>{description}</p>
      
      <div style={styles.progressContainer}>
        <div style={styles.progressHeader}>
          <span>Progress</span>
          <span style={styles.progressCount}>{progress}/{totalLessons}</span>
        </div>
        <div style={styles.progressBarTrack}>
          <div 
            style={{
              ...styles.progressBarFill,
              width: `${progressPercentage}%`
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;