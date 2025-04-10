import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

interface TransitionWrapperProps {
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={400}
        classNames="page-transition"
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TransitionWrapper;
