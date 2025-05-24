import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const MarketSummary: React.FC = () => {
  // Mock data for market summary
  const marketData = [
    {
      product: 'Corn',
      currentPrice: 225,
      previousPrice: 210,
      volume: '1,245 tons',
      markets: ['Central Market', 'Northern Market', 'Eastern Exchange'],
      buyers: 24,
    },
    {
      product: 'Wheat',
      currentPrice: 285,
      previousPrice: 275,
      volume: '987 tons',
      markets: ['Central Market', 'Eastern Exchange', 'Western Market'],
      buyers: 18,
    },
    {
      product: 'Soybeans',
      currentPrice: 360,
      previousPrice: 365,
      volume: '756 tons',
      markets: ['Western Market', 'Southern Trade', 'Central Market'],
      buyers: 12,
    },
    {
      product: 'Rice',
      currentPrice: 410,
      previousPrice: 402,
      volume: '532 tons',
      markets: ['Southern Trade', 'Eastern Exchange'],
      buyers: 9,
    },
    {
      product: 'Potatoes',
      currentPrice: 180,
      previousPrice: 175,
      volume: '875 tons',
      markets: ['Northern Market', 'Central Market'],
      buyers: 15,
    },
  ];

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Top Markets
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Active Buyers
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {marketData.map((item) => {
            const changeValue = calculateChange(item.currentPrice, item.previousPrice);
            const isPositive = parseFloat(changeValue) >= 0;
            
            return (
              <tr key={item.product} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.product}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">${item.currentPrice}/ton</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center ${isPositive ? 'text-success-600' : 'text-error-600'}`}>
                    {isPositive ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                    {changeValue}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {item.volume}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {item.markets.map((market, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {market}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {item.buyers}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketSummary;