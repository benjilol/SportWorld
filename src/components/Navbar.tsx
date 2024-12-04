import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Football', href: '/sports/football' },
    { name: 'Handball', href: '/sports/handball' },
    { name: 'Rugby', href: '/sports/rugby' },
    { name: 'Basketball', href: '/sports/basketball' },
    { name: 'Judo', href: '/sports/judo' },
    { name: 'Tennis', href: '/sports/tennis' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white tracking-tight hover:text-blue-200 transition-colors duration-200"
            >
              SportWorld
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-700 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="ml-6 inline-flex items-center px-6 py-2 border-2 border-blue-400 text-sm font-medium rounded-md text-white hover:bg-blue-700/50 transition-all duration-200"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 focus:outline-none transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full mt-2 flex items-center px-3 py-2 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-all duration-200"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="block mt-2 px-3 py-2 rounded-md text-base font-medium text-blue-100 border-2 border-blue-400 hover:bg-blue-700/50 transition-all duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;