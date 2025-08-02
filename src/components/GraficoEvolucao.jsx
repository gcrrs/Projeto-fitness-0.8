import React from 'react';
import { Line } from 'react-chartjs-2';
// Adicionado 'Filler' na importação
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Adicionado 'Filler' no registro
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const GraficoEvolucao = ({ historico, label, unidade }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Evolução de ${label}`,
        font: { size: 18, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
    },
    scales: {
        y: {
            beginAtZero: false,
            ticks: {
                callback: function(value) {
                    return `${value} ${unidade}`;
                }
            }
        }
    }
  };

  const data = {
    labels: historico.map(item => new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })),
    datasets: [
      {
        label: label,
        data: historico.map(item => item.value),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        tension: 0.1,
        fill: true, // Agora isso funciona sem avisos
      },
    ],
  };

  return (
    <div className="relative h-80 w-full bg-white p-4 rounded-lg shadow-inner">
      {historico.length > 1 ? (
        <Line options={options} data={data} />
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">Registre seus dados regularmente para ver a evolução no gráfico!</p>
        </div>
      )}
    </div>
  );
};

export default GraficoEvolucao;