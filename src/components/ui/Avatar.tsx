import React from 'react';
import { AvatarExpression } from '../../types';

interface AvatarProps {
  expression?: AvatarExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar = ({ expression = 'neutral', size = 'md', className = '' }: AvatarProps) => {
  // Map sizes to dimensions
  const sizePx = {
    sm: '32px',
    md: '48px',
    lg: '64px',
    xl: '96px'
  };

  // Map expressions to image files in the public directory
  const expressionToImage: Record<AvatarExpression, string> = {
    neutral: '/asset/faces/default.png',
    happy: '/asset/faces/joyful.png',
    angry: '/asset/faces/angry.png',
    thinking: '/asset/faces/confused.png',
    cool: '/asset/faces/proud.png',
    excited: '/asset/faces/smile.png',
    starEyes: '/asset/faces/joyful.png', // Using joyful for star eyes
    confused: '/asset/faces/confused2.png',
    sleeping: '/asset/faces/sleep.png'
  };

  return (
    <div 
      className={className}
      style={{
        width: sizePx[size],
        height: sizePx[size],
        borderRadius: '50%',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative',
        border: 'none'
      }}
    >
      <img 
        src={expressionToImage[expression]} 
        alt={`Avatar with ${expression} expression`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          border: 'none'
        }}
      />
    </div>
  );
};

export default Avatar;