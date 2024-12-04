import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sport } from '../types';

interface SportCardProps {
  sport: Sport;
}

const SportCard: React.FC<SportCardProps> = ({ sport }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={sport.imageUrl}
          alt={sport.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{sport.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{sport.description}</p>
        <Link
          to={`/sports/${sport.name}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          En savoir plus
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default SportCard;