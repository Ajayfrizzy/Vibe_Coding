import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Map, List } from 'lucide-react';
import Button from '../components/ui/Button';

const MarketPrices: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  
  // Mock market price data
  const marketPrices = [
    {
      id: 1,
      product: 'Corn',
      price: 225,
      change: 7.1,
      market: 'Central Market',
      location: 'Springfield, IL',
      distance: '5 miles',
      trend: 'up',
      updated: '2 hours ago'
    },
    {
      id: 2,
      product: 'Wheat',
      price: 285,
      change: 3.6,
      market: 'Eastern Exchange',
      location: 'Oakville, OH',
      distance: '12 miles',
      trend: 'up',
      updated: '4 hours ago'
    },
    {
      id: 3,
      product: 'Soybeans',
      price: 360,
      change: -1.4,
      market: 'Western Market',
      location: 'Cedar Rapids, IA',
      distance: '18 miles',
      trend: 'down',
      updated: 'Yesterday'
    },
    {
      id: 4,
      product: 'Rice',
      price: 410,
      change: 2.0,
      market: 'Southern Trade',
      location: 'Memphis, TN',
      distance: '25 miles',
      trend: 'up',
      updated: 'Yesterday'
    },
    {
      id: 5,
      product: 'Potatoes',
      price: 180,
      change: 2.9,
      market: 'Northern Market',
      location: 'Green Bay, WI',
      distance: '30 miles',
      trend: 'up',
      updated: '2 days ago'
    },
    {
      id: 6,
      product: 'Corn',
      price: 220,
      change: 5.8,
      market: 'River Valley Exchange',
      location: 'Davenport, IA',
      distance: '35 miles',
      trend: 'up',
      updated: '3 days ago'
    },
    {
      id: 7,
      product: 'Wheat',
      price: 280,
      change: 1.8,
      market: 'Midwest Grain Co-op',
      location: 'Lincoln, NE',
      distance: '42 miles',
      trend: 'up',
      updated: '3 days ago'
    },
    {
      id: 8,
      product: 'Soybeans',
      price: 355,
      change: -2.7,
      market: 'Heartland Trading Post',
      location: 'Indianapolis, IN',
      distance: '50 miles',
      trend: 'down',
      updated: '4 days ago'
    }
  ];
  
  const filteredPrices = selectedProduct === 'all'
    ? marketPrices
    : marketPrices.filter(price => price.product.toLowerCase() === selectedProduct.toLowerCase());

  const products = Array.from(new Set(marketPrices.map(price => price.product)));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Market Prices</h1>
        <p className="text-gray-600">
          View current prices at markets near you and set alerts for price changes.
        </p>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search markets or products"
              />
            </div>
            
            <div className="relative inline-block text-left">
              <div>
                <Button
                  variant="outline"
                  className="inline-flex justify-center w-full"
                  rightIcon={<ChevronDown size={16} />}
                  leftIcon={<Filter size={16} />}
                >
                  Filter
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Products</option>
                {products.map((product) => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              leftIcon={<List size={16} />}
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'primary' : 'outline'}
              leftIcon={<Map size={16} />}
              onClick={() => setViewMode('map')}
            >
              Map
            </Button>
          </div>
        </div>
        
        <div className="mt-4 md:hidden">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="all">All Products</option>
            {products.map((product) => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Market prices list view */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrices.map((price) => (
                  <tr key={price.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{price.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">${price.price}/ton</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        price.trend === 'up' 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-error-100 text-error-800'
                      }`}>
                        {price.trend === 'up' ? '+' : ''}{price.change}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{price.market}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {price.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {price.distance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {price.updated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm">
                        Set Alert
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Map view */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-lg shadow-sm p-4 h-[600px] flex items-center justify-center">
          <div className="text-center">
            <Map size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Map view is coming soon!</p>
            <p className="text-gray-400 text-sm mt-2">This feature will display nearby markets on an interactive map.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;