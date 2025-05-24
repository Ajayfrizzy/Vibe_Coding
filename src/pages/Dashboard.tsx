import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Users, DollarSign, ChevronRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { supabase, MarketPrice, Product } from '../lib/supabase';
import PriceChart from '../components/dashboard/PriceChart';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import MarketSummary from '../components/dashboard/MarketSummary';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch market prices
        const { data: pricesData, error: pricesError } = await supabase
          .from('market_prices')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(10);
          
        if (pricesError) throw pricesError;
        
        // Fetch products if user is a farmer
        let productsData = [];
        if (user?.user_type === 'farmer') {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('farmer_id', user.id)
            .order('created_at', { ascending: false });
            
          if (error) throw error;
          productsData = data;
        }
        
        setMarketPrices(pricesData || []);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);
  
  // Placeholder data for dashboard stats
  const stats = [
    { 
      name: 'Total Products', 
      value: products.length || 5, 
      icon: <Package className="h-6 w-6 text-primary-500" />,
      change: '+12%',
      trend: 'up'
    },
    { 
      name: 'Active Buyers', 
      value: 24, 
      icon: <Users className="h-6 w-6 text-secondary-500" />,
      change: '+5%',
      trend: 'up'
    },
    { 
      name: 'Price Alerts', 
      value: 8, 
      icon: <Bell className="h-6 w-6 text-accent-500" />,
      change: '+3',
      trend: 'up'
    },
    { 
      name: 'Revenue Potential', 
      value: '$2,450', 
      icon: <DollarSign className="h-6 w-6 text-success-500" />,
      change: '+15%',
      trend: 'up'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Welcome section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.full_name || 'Farmer'}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your farm and local markets today.
        </p>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-2 rounded-md bg-gray-50">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className={`mr-1 ${stat.trend === 'up' ? 'text-success-500' : 'text-error-500'}`}>
                {stat.change}
              </span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price trends chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Price Trends</h2>
            <Link 
              to="/market-prices" 
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              View all
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <PriceChart />
        </div>
        
        {/* Price alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Alerts</h2>
            <Button 
              variant="outline" 
              size="sm"
            >
              Set Alert
            </Button>
          </div>
          <RecentAlerts />
        </div>
        
        {/* Market summary */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Market Summary</h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                leftIcon={<Calendar size={16} />}
              >
                This Week
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                leftIcon={<TrendingUp size={16} />}
              >
                View Report
              </Button>
            </div>
          </div>
          <MarketSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}