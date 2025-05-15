import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '../components/ui/Logo';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

// Direct styles
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '1.5rem',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: '0.5rem',
  },
  subtext: {
    color: '#555555',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  },
  inputContainer: {
    width: '100%',
    maxWidth: '20rem',
    marginBottom: '2rem',
  },
  interestGrid: {
    width: '100%',
    maxWidth: '28rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    marginBottom: '2rem',
  },
  itemMargin: {
    marginBottom: '2rem',
  },
};

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user, updateUserInterests } = useAuth();

  const interests = [
    'CYBERSECURITY',
    'CODING',
    'NETWORKS',
    'ARTS',
    'AI',
    'ENGINEERING',
    'SPACE',
    'ROBOTICS',
    'GAMES'
  ];

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNameContinue = () => {
    if (name.trim()) {
      setStep(2);
    }
  };

  const handleInterestsContinue = () => {
    if (selectedInterests.length > 0) {
      updateUserInterests(selectedInterests);
      navigate('/explore');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Name Input Step
  const renderNameInput = () => (
    <motion.div 
      style={styles.flexColumn}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="name-step"
    >
      <motion.div variants={itemVariants} style={styles.itemMargin}>
        <Logo variant="primary" />
      </motion.div>
      
      <motion.div variants={itemVariants} style={styles.itemMargin}>
        <Avatar expression="thinking" size="lg" />
      </motion.div>
      
      <motion.div variants={itemVariants} style={{...styles.itemMargin, textAlign: 'center'}}>
        <h2 style={styles.heading}>What's your name?</h2>
        <p style={styles.subtext}>We'll use this to personalize your experience</p>
      </motion.div>
      
      <motion.div variants={itemVariants} style={styles.inputContainer}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="text-center"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          variant="primary"
          onClick={handleNameContinue}
          disabled={!name.trim()}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );

  // Interest Selection Step
  const renderInterestSelection = () => (
    <motion.div 
      style={styles.flexColumn}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key="interest-step"
    >
      <motion.div variants={itemVariants} style={styles.itemMargin}>
        <Logo variant="primary" />
      </motion.div>
      
      <motion.div variants={itemVariants} style={styles.itemMargin}>
        <Avatar expression="curious" size="lg" />
      </motion.div>
      
      <motion.div variants={itemVariants} style={{...styles.itemMargin, textAlign: 'center'}}>
        <h2 style={styles.heading}>What interests you, {name}?</h2>
        <p style={styles.subtext}>Select topics you'd like to learn about</p>
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        style={styles.interestGrid}
      >
        {interests.map((interest) => (
          <Button
            key={interest}
            variant="interestTopic"
            selected={selectedInterests.includes(interest)}
            onClick={() => handleInterestToggle(interest)}
          >
            {interest}
          </Button>
        ))}
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          variant="primary"
          onClick={handleInterestsContinue}
          disabled={selectedInterests.length === 0}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <div style={styles.container}>
      {step === 1 ? renderNameInput() : renderInterestSelection()}
    </div>
  );
};

export default Onboarding;