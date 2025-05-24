import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, MessageSquare, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, signOut } = useAuth();
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  
  // Close notifications when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, message: 'Corn prices increased by 5% today', time: '1 hour ago', read: false },
    { id: 2, message: 'New buyer interested in your wheat', time: '3 hours ago', read: false },
    { id: 3, message: 'Market report for today is available', time: 'Yesterday', read: true },
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-primary-500 hover:bg-primary-50 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <span className="ml-2 md:ml-0 text-xl font-semibold text-primary-700">
                Farm<span className="text-secondary-500">Connect</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
                  >
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 bg-secondary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      2
                    </span>
                  </button>
                  
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 animate-fade-in">
                      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-sm font-medium">Notifications</h3>
                        <button 
                          onClick={() => setNotificationsOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 hover:bg-gray-50 ${notification.read ? '' : 'bg-primary-50'} border-b border-gray-100`}
                          >
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <Link 
                        to="/notifications" 
                        className="block p-3 text-center text-sm font-medium text-primary-600 hover:bg-gray-50"
                      >
                        View all notifications
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link to="/messages" className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative">
                  <MessageSquare size={20} />
                  <span className="absolute top-1 right-1 bg-secondary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Link>
                
                <div className="relative ml-3">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-medium text-sm overflow-hidden">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.full_name || 'User'} className="h-full w-full object-cover" />
                      ) : (
                        user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700 truncate max-w-[100px]">
                      {user.full_name || user.email}
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;