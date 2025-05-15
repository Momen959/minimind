import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'interestTopic' | 'socialLogin' | 'iconButton';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  selected?: boolean;
  fullWidth?: boolean;
}

const Button = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  selected = false,
  fullWidth = false,
}: ButtonProps) => {
  const getButtonStyles = (): React.CSSProperties => {
    // Base styles
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      transition: 'all 0.2s',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : 'auto',
      outline: 'none',
    };

    // Variant-specific styles
    const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
      primary: {
        backgroundColor: '#0077D8',
        color: 'white',
        border: 'none',
        borderRadius: '9999px',
        padding: '0.75rem 1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      secondary: {
        backgroundColor: 'white',
        color: '#0077D8',
        border: '2px solid #0077D8',
        borderRadius: '9999px',
        padding: '0.75rem 1.5rem',
      },
      interestTopic: selected 
        ? {
            backgroundColor: '#0077D8',
            color: 'white',
            border: '2px solid #0077D8',
            borderRadius: '9999px',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
          }
        : {
            backgroundColor: 'white',
            color: '#0077D8',
            border: '2px solid #0077D8',
            borderRadius: '9999px',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
          },
      socialLogin: {
        backgroundColor: 'white',
        color: '#333333',
        border: '1px solid #CCCCCC',
        borderRadius: '0.75rem',
        padding: '0.5rem 1rem',
      },
      iconButton: {
        backgroundColor: 'white',
        color: '#0077D8',
        border: '1px solid #0077D8',
        borderRadius: '9999px',
        padding: '0.5rem',
        minWidth: '2.5rem',
        minHeight: '2.5rem',
      },
    };

    return { ...baseStyles, ...variantStyles[variant] };
  };

  return (
    <motion.button
      type={type}
      className={className}
      style={getButtonStyles()}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
    >
      {icon && iconPosition === 'left' && <span style={{ marginRight: '0.5rem' }}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span style={{ marginLeft: '0.5rem' }}>{icon}</span>}
    </motion.button>
  );
};

export default Button;