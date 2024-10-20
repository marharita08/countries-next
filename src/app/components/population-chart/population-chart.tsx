import dynamic from 'next/dynamic';
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

import { type PopulationCounts } from '@/app/types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), {
  ssr: false, 
});

interface PopulationChartProps {
  populationCounts: PopulationCounts[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({ populationCounts }) => {
  const data = {
    labels: populationCounts.map(item => item.year),
    datasets: [
      {
        label: 'Population',
        data: populationCounts.map(item => item.value),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Population Growth by Year',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export { PopulationChart };
