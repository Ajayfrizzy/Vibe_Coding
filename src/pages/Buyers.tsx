import React, { useState } from 'react';
import { Search, Filter, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

const Buyers: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  
  // Mock data for buyers
  const buyers = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Smith Grain Co.',
      location: 'Springfield, IL',
      distance: '15 miles',
      interests: ['Corn', 'Wheat', 'Soybeans'],
      avatar: null,
      rating: 4.8,
      reviews: 24,
      verified: true,
      email: 'john@smithgrain.com',
      phone: '+1 (555) 123-4567',
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Midwest Produce LLC',
      location: 'Cedar Rapids, IA',
      distance: '28 miles',
      interests: ['Corn', 'Potatoes'],
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      rating: 4.9,
      reviews: 36,
      verified: true,
      email: 'sarah@midwestproduce.com',
      phone: '+1 (555) 234-5678',
      lastActive: 'Active now',
    },
    {
      id: 3,
      name: 'Mike Wilson',
      company: 'Wilson Trading Co.',
      location: 'Des Moines, IA',
      distance: '42 miles',
      interests: ['Wheat', 'Soybeans'],
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 4.7,
      reviews: 18,
      verified: true,
      email: 'mike@wilsontrading.com',
      phone: '+1 (555) 345-6789',
      lastActive: '1 day ago',
    },
  ];

  const products = Array.from(
    new Set(buyers.flatMap(buyer => buyer.interests))
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Buyers Directory</h1>
        <p className="text-gray-600">
          Connect with verified buyers interested in your products.
        </p>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search buyers or companies"
              />
            </div>
            
            <div className="relative">
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
          
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
            rightIcon={<ChevronDown size={16} />}
          >
            More Filters
          </Button>
        </div>
      </div>

      {/* Buyers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buyers.map((buyer) => (
          <div key={buyer.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                    {buyer.avatar ? (
                      <img
                        src={buyer.avatar}
                        alt={buyer.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-medium text-primary-700">
                        {buyer.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {buyer.name}
                      {buyer.verified && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
                          Verified
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{buyer.company}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={16} className="mr-2" />
                  {buyer.location} • {buyer.distance}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Mail size={16} className="mr-2" />
                  {buyer.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone size={16} className="mr-2" />
                  {buyer.phone}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Interested in:</h4>
                <div className="flex flex-wrap gap-2">
                  {buyer.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(buyer.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-6.327 3.323 1.209-7.037L.172 7.282l7.053-1.027L10 0l2.775 6.255 7.053 1.027-4.71 4.589 1.209 7.037z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({buyer.reviews} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{buyer.lastActive}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="primary" fullWidth>
                  Contact Buyer
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buyers;