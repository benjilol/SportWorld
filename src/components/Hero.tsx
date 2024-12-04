import React from 'react';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-[500px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Sports"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Discover the World of Sports
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
            Explore the history, rules, and legends of the greatest sports in the world.
            From the passion of football to the elegance of tennis, dive into a world
            of sporting excellence.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#sports"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Discover Sports
            </a>
            <Link
              to="/legends"
              className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Our Legends
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
