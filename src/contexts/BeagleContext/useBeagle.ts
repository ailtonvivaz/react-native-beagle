import { useContext } from 'react';
import { BeagleContext } from './BeagleContext';

export const useInternalBeagle = () => {
  const context = useContext(BeagleContext);

  if (!context) {
    throw new Error('useInternalBeagle must be used within a BeagleProvider');
  }

  return context;
};

export const useBeagle = () => {
  const { showInspector } = useInternalBeagle();

  return { showInspector };
};
