import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Filter, Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductListing: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Mock data for products
  const products = [
    {
      id: 1,
      name: 'Premium Corn',
      description: 'High-quality feed corn, perfect for livestock',
      category: 'Corn',
      price: 225,
      quantity: 500,
      unit: 'ton',
      location: 'Springfield, IL',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
      created_at: '2024-03-15',
      interested_buyers: 8,
    },
    {
      id: 2,
      name: 'Organic Wheat',
      description: 'Certified organic wheat, ideal for milling',
      category: 'Wheat',
      price: 285,
      quantity: 300,
      unit: 'ton',
      location: 'Cedar Rapids, IA',
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
      created_at: '2024-03-14',
      interested_buyers: 12,
    },
    {
      id: 3,
      name: 'Soybeans',
      description: 'Non-GMO soybeans, excellent protein content',
      category: 'Soybeans',
      price: 360,
      quantity: 250,
      unit: 'ton',
      location: 'Des Moines, IA',
      image: 'https://images.pexels.com/photos/1337023/pexels-photo-1337023.jpeg',
      created_at: '2024-03-13',
      interested_buyers: 5,
    },
  ];

  const categories = Array.from(
    new Set(products.map(product => product.category))
  );

  const handleDeleteProduct = (productId: number) => {
    // Handle product deletion
    console.log('Delete product:', productId);
  };

  const handleEditProduct = (productId: number) => {
    // Handle product editing
    console.log('Edit product:', productId);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Products</h1>
            <p className="text-gray-600">
              Manage your product listings and track buyer interest.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            leftIcon={<Plus size={16} />}
          >
            Add Product
          </Button>
        </div>
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
                placeholder="Search products"
              />
            </div>
            
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
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

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white"
                  leftIcon={<Edit2 size={16} />}
                  onClick={() => handleEditProduct(product.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-error-600 hover:text-error-700"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  ${product.price}/{product.unit}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-600">{product.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {product.quantity} {product.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="mt-1 text-sm text-gray-900">{product.location}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Listed on {new Date(product.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-sm font-medium text-primary-600">
                    {product.interested_buyers} interested buyers
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;