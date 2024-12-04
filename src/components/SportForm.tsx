import React, { useState } from 'react';
import { Sport } from '../types';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SportFormProps {
  sport?: Sport | null;
  onCancel: () => void;
}

const SportForm: React.FC<SportFormProps> = ({ sport, onCancel }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(true);
  const [currentSport, setCurrentSport] = useState(sport || null);
  const [description, setDescription] = useState(sport?.description || '');
  const [history, setHistory] = useState(sport?.history || '');
  const [imageUrl, setImageUrl] = useState(sport?.imageUrl || '');
  const [rules, setRules] = useState<string[]>(sport?.rules || ['']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filteredRules = rules.filter((rule) => rule.trim() !== '');

    const payload = {
      name: sport?.name,
      description,
      history,
      imageUrl,
      rules: filteredRules,
      topTeams: sport?.topTeams,
      topPlayers: sport?.topPlayers
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in to perform this action.');
        return;
      }

      const url = sport?.name
        ? `/api/sports/${sport.name.toLowerCase()}`
        : '/api/sports';
      const method = sport?.name ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit sport data');
      }

      const updatedSport = await response.json();
      console.log('Sport successfully updated or created:', updatedSport);
      alert('Sport successfully saved!');
      
      // Navigate to the same page to trigger a refresh
      const sportName = sport?.name || updatedSport.name;
      navigate(`/sports/${sportName.toLowerCase()}`, { replace: true });
      navigate(0); // This forces a full page refresh
    } catch (error) {
      console.error('Error submitting sport data:', error);
      alert('Failed to submit sport data');
    }
  };

  const addRule = () => setRules([...rules, '']);
  const removeRule = (index: number) => setRules(rules.filter((_, i) => i !== index));

  if (!isEditing && currentSport) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">{currentSport.name}</h2>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p>{currentSport.description}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">History</h3>
          <p>{currentSport.history}</p>
        </div>

        {currentSport.imageUrl && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Image</h3>
            <img src={currentSport.imageUrl} alt={currentSport.name} className="max-w-md" />
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Rules</h3>
          <ul className="list-disc pl-5">
            {currentSport.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Top Teams</h3>
          <ul className="list-disc pl-5">
            {currentSport.topTeams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Top Players</h3>
          <ul className="list-disc pl-5">
            {currentSport.topPlayers.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Edit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Sport Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={sport?.name || ''}
            disabled
            className="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">History</label>
          <textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Rules Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rules</h3>
        {rules.map((rule, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={rule}
              onChange={(e) => {
                const newRules = [...rules];
                newRules[index] = e.target.value;
                setRules(newRules);
              }}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`Rule ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeRule(index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRule}
          className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Add Rule
        </button>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default SportForm;
