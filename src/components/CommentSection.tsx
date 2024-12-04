import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Sport, Comment } from '../types';

interface CommentSectionProps {
  sport: Sport; // L'objet complet du sport
  onAddComment: (comment: { content: string; author: string }) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ sport, onAddComment }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      setError('You must be logged in to post a comment.');
      return;
    }

    if (!content.trim() || !author.trim()) {
      setError('Both fields are required.');
      return;
    }

    if (isSubmitting) return; // Empêche un double clic
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/sports/${sport.name}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, author }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      // Réinitialiser les champs après ajout
      setContent('');
      setAuthor('');
      setError('');
    } catch (err) {
      setError('Failed to submit comment. Please try again.');
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16">
      <div className="flex items-center mb-8">
        <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900">Comments for {sport.name}</h2>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Your name
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Your comment
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add a comment
        </button>
      </form>

      <div className="space-y-6">
        {[...(sport.comments || [])].reverse().map((comment: Comment) => (
          <div key={comment.id} className="bg-white rounded-lg shadow-md p-6">
            <p className='text-gray-700'>{comment.author}</p>
            <p className="text-gray-600">{comment.content}</p>
            <span className="text-sm text-gray-500">
              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'No date'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;