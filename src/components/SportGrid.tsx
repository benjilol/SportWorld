import React from 'react';
import SportCard from './SportCard';
import { Sport } from '../types';

interface SportGridProps {
  sports: Sport[];
}

const SportGrid: React.FC<SportGridProps> = ({ sports }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sports.map((sport) => (
        <SportCard key={sport.id} sport={sport} />
      ))}
    </div>
  );
};

export default SportGrid;