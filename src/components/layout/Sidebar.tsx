import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Users, 
  MessageSquare, 
  User, 
  LogOut, 
  Package, 
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  // Close sidebar on route change in mobile view
  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  }, [location.pathname, setOpen]);

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Market Prices', icon: <BarChart2 size={20} />, path: '/market-prices' },
    { name: 'Products', icon: <Package size={20} />, path: '/products' },
    { name: 'Buyers', icon: <Users size={20} />, path: '/buyers' },
    { name: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 md:translate-x-0 md:relative md:z-0 pt-16
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col justify-between p-4">
          <div>
            <div className="md:hidden absolute right-4 top-4">
              <button 
                onClick={() => setOpen(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={signOut}
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full"
            >
              <LogOut size={20} className="mr-3" />
              Sign Out
            </button>

            <div className="mt-6 px-4 py-3 bg-primary-50 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-medium">
                    {user?.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt={user.full_name || 'User'} 
                        className="h-full w-full rounded-full object-cover" 
                      />
                    ) : (
                      user?.full_name?.charAt(0) || user?.email.charAt(0).toUpperCase()
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.full_name || user?.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.user_type === 'farmer' ? 'Farmer' : 'Buyer'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;