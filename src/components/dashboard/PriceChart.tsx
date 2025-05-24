import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest' as const,
      intersect: true,
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Corn',
        data: [180, 190, 200, 210, 190, 180, 195, 210, 230, 220, 215, 225],
        borderColor: 'rgb(45, 106, 79)',
        backgroundColor: 'rgba(45, 106, 79, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Wheat',
        data: [250, 245, 255, 265, 260, 250, 245, 250, 270, 275, 280, 285],
        borderColor: 'rgb(217, 119, 6)',
        backgroundColor: 'rgba(217, 119, 6, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Soybeans',
        data: [320, 325, 330, 340, 350, 345, 350, 360, 370, 365, 360, 380],
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <div className="flex items-center justify-end mb-4 text-sm text-gray-500 space-x-3">
        <span className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-primary-500 mr-1"></span>
          Corn ($/ton)
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-secondary-500 mr-1"></span>
          Wheat ($/ton)
        </span>
        <span className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-accent-500 mr-1"></span>
          Soybeans ($/ton)
        </span>
      </div>
      <div className="h-80">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default PriceChart;