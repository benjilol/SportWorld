import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SportGrid from '../components/SportGrid';
import SearchBar from '../components/SearchBar';
import { Sport } from '../types';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sports');
        if (!response.ok) {

          throw new Error('Failed to fetch sports');
        }
        const data = await response.json();
        console.log('Fetched sports:', data);
        setSports(data);
      } catch (err) {
        console.error('Error fetching sports:', err);
        setError(err instanceof Error ? err.message : 'Error fetching sports');
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  const filteredSports = sports.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading sports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8" id="sports">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Explore our sports
          </h2>
        </div>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <SportGrid sports={filteredSports} />
      </section>
    </div>
  );
};

export default Home;