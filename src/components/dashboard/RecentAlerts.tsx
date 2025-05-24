import React from 'react';
import { ArrowUp, ArrowDown, Bell } from 'lucide-react';

const RecentAlerts: React.FC = () => {
  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      product: 'Corn',
      price: 225,
      change: 15,
      trend: 'up',
      time: '2 hours ago',
      market: 'Central Market'
    },
    {
      id: 2,
      product: 'Wheat',
      price: 285,
      change: 10,
      trend: 'up',
      time: '4 hours ago',
      market: 'Eastern Exchange'
    },
    {
      id: 3,
      product: 'Soybeans',
      price: 360,
      change: -5,
      trend: 'down',
      time: 'Yesterday',
      market: 'Western Market'
    },
    {
      id: 4,
      product: 'Rice',
      price: 410,
      change: 8,
      trend: 'up',
      time: 'Yesterday',
      market: 'Southern Trade'
    },
  ];

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <div className={`p-2 rounded-full ${alert.trend === 'up' ? 'bg-success-50 text-success-500' : 'bg-error-50 text-error-500'} mr-3`}>
            {alert.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">{alert.product}</h3>
              <span className={`text-sm font-semibold ${alert.trend === 'up' ? 'text-success-600' : 'text-error-600'}`}>
                {alert.trend === 'up' ? '+' : ''}{alert.change}%
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-500">{alert.market}</span>
              <span className="text-sm font-medium">${alert.price}/ton</span>
            </div>
            <div className="mt-1 text-xs text-gray-400">{alert.time}</div>
          </div>
        </div>
      ))}
      
      <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 py-2 border-t border-gray-100">
        View all alerts
      </button>
    </div>
  );
};

export default RecentAlerts;