import React from 'react';

type LogoVariant = 'primary' | 'textWhite' | 'textBlack';

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ variant = 'primary', className = '', size = 'md' }: LogoProps) => {
  // Font size mapping
  const fontSizeMap = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem'
  };

  // Height mapping
  const heightMap = {
    sm: '32px',
    md: '40px',
    lg: '48px'
  };

  // Letter spacing for the text
  const letterSpacing = '0.05em';
  
  // For the primary variant (blue capsule with white text)
  if (variant === 'primary') {
    return (
      <div 
        className={`inline-flex items-center justify-center font-bold ${className}`}
        style={{
          backgroundColor: '#0077D8',
          color: 'white',
          borderRadius: '9999px',
          padding: size === 'sm' ? '0.3rem 0.8rem' : '0.5rem 1.2rem',
          fontSize: fontSizeMap[size],
          height: heightMap[size],
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: letterSpacing,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          fontWeight: 'bold'
        }}
      >
        MINIMIND
      </div>
    );
  }

  // For text-only variants
  const textColor = variant === 'textWhite' ? 'white' : 'black';
  
  return (
    <div 
      className={`font-bold ${className}`}
      style={{
        color: textColor,
        fontSize: fontSizeMap[size],
        letterSpacing: letterSpacing,
        fontWeight: 'bold'
      }}
    >
      MINIMIND
    </div>
  );
};

export default Logo;