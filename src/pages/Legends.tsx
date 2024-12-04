import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { sportsData } from '../data/sports';

const Legends = () => {
  const allLegends = sportsData.flatMap(sport => 
    sport.topPlayers.map(player => ({
      ...player,
      sport: sport.name
    }))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Legends</h1>
          <p className="text-xl text-gray-600">
          Discover the greatest athletes who have marked the history of sport
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allLegends.map((legend, index) => (
            <div 
              key={`${legend.id}-${index}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64">
                <img
                  src={legend.imageUrl}
                  alt={legend.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {legend.active ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      Retirement
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{legend.name}</h3>
                    <p className="text-gray-600">{legend.nationality}</p>
                  </div>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-blue-600 mb-2">
                    {legend.sport}
                  </p>
                  <div className="space-y-2">
                    {legend.achievements.map((achievement, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legends;