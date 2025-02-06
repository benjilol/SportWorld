import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sport } from '../types';
import { Trophy, Users, History, Book, Edit, Medal } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import SportForm from '../components/SportForm';

interface SportDetailProps {
  isNew?: boolean;
}

const SportDetail: React.FC<SportDetailProps> = ({ isNew }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(isNew || false);
  const [sport, setSport] = useState<Sport | null>(null);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const fetchSport = async () => {
      if (isNew) {
        if (!user) {
          navigate('/login');
          return;
        }
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/sports/${id}`);
        if (!response.ok) {
          throw new Error('Sport not found');
        }
        const data = await response.json();
        setSport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSport();
  }, [id, isNew, user, navigate]);

  const handleCreate = async (sportData: Partial<Sport>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      console.log('Creating sport with data:', sportData);

      const response = await fetch('http://localhost:5000/api/sports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...sportData,
          rules: sportData.rules || [],
          topTeams: sportData.topTeams || [],
          topPlayers: sportData.topPlayers || []
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error creating sport');
      }
      
      const newSport = await response.json();
      navigate(`/sports/${newSport.id}`);
    } catch (err) {
      console.error('Creation error:', err);
      alert(err instanceof Error ? err.message : 'Error creating sport');
    }
  };

  const handleUpdate = async (sportData: Partial<Sport>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      if (!id) {
        throw new Error('Sport ID is missing');
      }

      console.log('Updating sport with ID:', id);
      console.log('Update data:', sportData);

      const response = await fetch(`http://localhost:5000/api/sports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...sportData,
          topTeams: sportData.topTeams || sport?.topTeams || [],
          topPlayers: sportData.topPlayers || sport?.topPlayers || []
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.error || 'Error updating sport');
      }
      
      const updatedSport = await response.json();
      console.log('Updated sport:', updatedSport);
      setIsEditing(false);
      setSport(updatedSport);
    } catch (err) {
      console.error('Update error:', err);
      setError(err instanceof Error ? err.message : 'Error updating sport');
      alert(err instanceof Error ? err.message : 'Error updating sport');
    }
  };

  const handleAddComment = async (comment: { content: string; author: string }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sports/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      
      if (!response.ok) {
        throw new Error('Error adding comment');
      }
      
      const newComment = await response.json();
      setSport(prev => prev ? {
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      } : null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error adding comment');
    }
  };

  const handleEditClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">No sport found</p>
      </div>
    );
  }

  if (isEditing) {
    if (!user) {
      navigate('/login');
      return null;
    }
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isNew ? 'Create New Sport' : `Edit ${sport?.name}`}
        </h1>
        <SportForm
          sport={isNew ? undefined : sport}
          onSubmit={isNew ? handleCreate : handleUpdate}
          onCancel={() => isNew ? navigate('/') : setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <img
            src={sport.imageUrl}
            alt={sport.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-8"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={handleEditClick}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 group relative"
            >
              <Edit className="h-5 w-5 text-gray-600" />
              {!user && (
                <span className="absolute right-0 top-10 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  Login to edit this sport
                </span>
              )}
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">{sport.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Description</h2>
            </div>
            <p className="text-gray-600">{sport.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <History className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">History</h2>
            </div>
            <p className="text-gray-600">{sport.history}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <div className="flex items-center mb-6">
            <Book className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Main Rules</h2>
          </div>
          <ul className="list-disc list-inside space-y-2">
            {sport.rules.map((rule, index) => (
              <li key={index} className="text-gray-600">{rule}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Best Team</h2>
            </div>
            {sport && sport.topTeams && sport.topTeams[0] ? (
              <div>
                <div className="flex items-center mb-4">
                  {sport.topTeams[0].imageUrl && (
                    <img
                      src={sport.topTeams[0].imageUrl}
                      alt={sport.topTeams[0].name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{sport.topTeams[0].name}</p>
                    <p className="text-sm text-gray-600">{sport.topTeams[0].country}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {sport.topTeams[0].achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-600">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No top team available</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Medal className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Best Player</h2>
            </div>
            {sport && sport.topPlayers && sport.topPlayers[0] ? (
              <div>
                <div className="flex items-center mb-4">
                  {sport.topPlayers[0].imageUrl && (
                    <img
                      src={sport.topPlayers[0].imageUrl}
                      alt={sport.topPlayers[0].name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{sport.topPlayers[0].name}</h3>
                    <p className="text-gray-600">{sport.topPlayers[0].nationality}</p>
                    <p className="text-gray-600">{sport.topPlayers[0].active ? 'Active' : 'Retired'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {sport.topPlayers[0].achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-600">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No player information available</p>
            )}
          </div>
        </div>

        <CommentSection
          sport={sport} // Passer tout l'objet sport
          onAddComment={handleAddComment}
        />

      </div>
    </div>
  );
};

export default SportDetail;
